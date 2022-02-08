import { SaveArticleResponseInterface } from './../../shared/types/saveArticleResponse.interface';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(article: ArticleInputInterface): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    console.log(article);

    return this.http
      .post<SaveArticleResponseInterface>(fullUrl, {
        article,
      })
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          console.log(response);
          return response.article;
        })
      );
  }
}
