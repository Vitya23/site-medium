import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetArticleResponseInterface } from '../types/getArticleRespone.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullApi = `${environment.apiUrl}/articles/${slug}`;

    return this.http.get<GetArticleResponseInterface>(fullApi).pipe(
      map((response: GetArticleResponseInterface) => {
        return response.article;
      })
    );
  }
}
