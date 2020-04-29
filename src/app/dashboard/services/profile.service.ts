import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserProfile} from '../../shared/interfaces';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient
  ) {
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get(`${environment.databaseURL}/profile.json`)
      .pipe(
        take(1),
        map((response: { [key: string]: any }) => {
          return Object.keys(response)
            .map((key) => ({
              ...response[key],
              id: key
            }))[0];
        })
      );
  }

  saveProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${environment.databaseURL}/profile/${userProfile.id}.json`, userProfile);
  }


}
