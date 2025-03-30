import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/Post';
import { BlogService } from '../../core/services/blog.service';
import { Comment } from '../../models/Comment';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    CommentCardComponent,
    MatIconModule,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  @Input({ required: true }) post!: Post;
  comments: Comment[] = [];
  showComments: boolean = false;
  showTextField: boolean = false;
  commentText: string = '';

  constructor(private blogService: BlogService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  toggleComments(): void {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.blogService.getComments(this.post.id).subscribe((comments) => {
        comments.forEach((comment) => {
          const exists = this.comments.some((c) => c.id === comment.id);
          if (!exists) {
            this.comments.push(comment);
          }
        });
      });
    }
  }

  toggleTextField(): void {
    this.showTextField = !this.showTextField;
  }

  addComment(comment: Comment, post: Post): void {
    if (comment.postId === post.id) {
      const exists = this.comments.some((c) => c.id === comment.id);
      if (!exists) {
        this.comments.push(comment);
      }
    }
  }

  submitComment(): void {
    const textField = document.getElementById(
      'comment-text-area-' + this.post.id,
    ) as HTMLTextAreaElement;
    if (textField) {
      this.commentText = textField.value;
    }

    if (this.commentText.trim()) {
      const newComment: Comment = {
        name: 'Anonymous',
        email: 'anonymous@example.com',
        postId: this.post.id,
        body: this.commentText,
        id: Math.floor(Math.random() * 1000),
      };

      this.blogService.createComment(newComment).subscribe({
        next: (comment) => {
          console.log('Comment created:', comment);
          this.commentText = '';
          this.addComment(comment, this.post);
          this.toggleTextField();
          textField.value = '';
          this.toastr.success('Comment added successfully!', 'Success');
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        },
      });
    } else {
      this.toastr.error('Comment cannot be empty', 'Error');
    }
  }
}
