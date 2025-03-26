import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { HomeComponent } from '../../pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './post-section.component.html',
  styleUrl: './post-section.component.css',
})
export class PostSectionComponent {
  title: string = '';
  body: string = '';
  showPostSection: boolean = false;

  constructor(
    private blogService: BlogService,
    private homeComponent: HomeComponent,
  ) {}

  submitPost(): void {
    const titleInput = document.getElementById(
      'post-input',
    ) as HTMLInputElement;
    const bodyTextArea = document.getElementById(
      'post-text-area',
    ) as HTMLTextAreaElement;

    if (titleInput && bodyTextArea) {
      this.title = titleInput.value;
      this.body = bodyTextArea.value;
    }

    if (this.title.trim() && this.body.trim()) {
      const newPost = {
        title: this.title,
        body: this.body,
        userId: 1,
        id: Math.floor(Math.random() * 1000),
      };

      this.blogService.createPost(newPost).subscribe({
        next: (post) => {
          console.log('Post created:', post);
          this.closePostSection();
        },
        error: (err) => {
          console.error('Error creating post:', err);
        },
      });

      this.homeComponent.addPost(newPost);
    } else {
      console.error('Title and body cannot be empty');
    }
  }

  togglePostSection(): void {
    this.showPostSection = !this.showPostSection;
  }

  closePostSection(): void {
    this.showPostSection = false;
  }
}
