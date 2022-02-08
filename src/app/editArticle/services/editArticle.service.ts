import { map } from 'rxjs/operators';
import { SaveArticleResponseInterface } from './../../shared/types/saveArticleResponse.interface';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from './../../shared/types/articleInput.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    article: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    console.log({ article });

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, { article })
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          console.log(response.article);
          return response.article;
        })
      );
  }
}
