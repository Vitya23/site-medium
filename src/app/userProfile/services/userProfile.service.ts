import { GetUserProfileResponseInterface } from './../types/getUserProfileResponse.interface';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { ProfileInterface } from './../../shared/types/profile.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http
      .get(url)
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      );
  }
}
