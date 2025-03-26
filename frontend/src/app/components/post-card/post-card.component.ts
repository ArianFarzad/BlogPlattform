import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/Post';
import { BlogService } from '../../core/services/blog.service';
import { Comment } from '../../models/Comment';
import { CommentCardComponent } from '../comment-card/comment-card.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, CommentCardComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input({ required: true }) post!: Post;
  comments: Comment[] = [];
  showComments = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}

  toggleComments(): void {
    this.showComments = !this.showComments;
    if (this.showComments && this.comments.length === 0) {
      this.blogService.getComments(this.post.id).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }
}