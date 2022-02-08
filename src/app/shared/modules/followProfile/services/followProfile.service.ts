import { GetProfileResponseInterface } from './../../../types/getProfileResponse.interface';
import { select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from './../../../types/profile.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class FollowProfileService {
  constructor(private http: HttpClient) {}

  followProfile(username: string): Observable<ProfileInterface> {
    const url = this.getUrl(username);

    return this.http.post(url, {}).pipe(select(this.getProfile));
  }

  unFollowProfile(username: string): Observable<ProfileInterface> {
    const url = this.getUrl(username);

    return this.http.delete(url).pipe(select(this.getProfile));
  }

  getUrl(username: string): string {
    return `${environment.apiUrl}/profiles/${username}/follow`;
  }

  getProfile(response: GetProfileResponseInterface): ProfileInterface {
    return response.profile;
  }
}
