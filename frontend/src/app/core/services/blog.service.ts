import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }
}
