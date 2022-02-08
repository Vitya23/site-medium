import { GetArticleResponseInterface } from './../../../types/getArticleRespone.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    console.log(slug);
    return this.http.delete(url).pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
