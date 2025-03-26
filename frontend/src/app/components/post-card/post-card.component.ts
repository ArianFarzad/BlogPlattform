import { Component, Input } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input({required: true }) post!: Post;
}
