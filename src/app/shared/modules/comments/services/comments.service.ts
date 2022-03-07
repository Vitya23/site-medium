import { CommentsInterface } from './../../../types/comments.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GetCommentsResponseInterface } from '../types/getCommentsResponse.interface';
@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<GetCommentsResponseInterface> {
    const url = this.getUrl(slug);

    return this.http.get<GetCommentsResponseInterface>(url).pipe(
      map((response: GetCommentsResponseInterface) => {
        console.log(response);
        return response;
      })
    );
  }

  createComments(slug: string, body: string): Observable<CommentsInterface> {
    const url = this.getUrl(slug);

    return this.http
      .post<CommentsInterface>(url, {
        comment: { body },
      })
      .pipe(
        map((response: CommentsInterface) => {
          return response;
        })
      );
  }

  deleteComments(slug: string, id: number) {
    const url = this.getUrl(slug) + `/${id}`;

    return this.http.delete<{}>(url);
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/comments`;
  }
}
