import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetPopularTagsInterface } from '../types/getPopularTags.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';

    return this.http.get(url).pipe(
      map((response: GetPopularTagsInterface) => {
        return response.tags;
      })
    );
  }
}
