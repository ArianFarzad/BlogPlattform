import { Component } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: Post[] = [];
  isLoading = true; 

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.isLoading = false;
      }
    });
  }
}