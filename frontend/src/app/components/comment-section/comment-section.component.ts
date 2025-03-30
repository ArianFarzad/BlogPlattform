import { Component, Input } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import { PostCardComponent } from '../post-card/post-card.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css',
})
export class CommentSectionComponent {
  commentText: string = '';
  @Input({ required: true }) post!: Post;

  constructor(
    private blogService: BlogService,
    private postCardComponent: PostCardComponent,
    private toastr: ToastrService,
  ) {}

  submitComment(): void {
    const textField = document.getElementById(
      'comment-text-area',
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
          this.postCardComponent.addComment(comment, this.post);
          this.toastr.success('Comment added successfully!', 'Success');
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        },
      });
    } else {
      console.error('Comment text cannot be empty');
    }
  }
}
