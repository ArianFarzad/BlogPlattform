import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/Post';
import { BlogService } from '../../core/services/blog.service';
import { Comment } from '../../models/Comment';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, CommentCardComponent, CommentSectionComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  @Input({ required: true }) post!: Post;
  comments: Comment[] = [];
  showComments: boolean = false;
  showTextField: boolean = false;

  constructor(private blogService: BlogService) {}

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
}
