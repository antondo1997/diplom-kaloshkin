import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserProfile, UserSignIn} from '../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, take, tap} from 'rxjs/operators';

@Injectable()
export class ProfileService {

  public error$: Subject<string> = new Subject<string>();

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

  checkPassword(user: UserSignIn): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.error$.next('Неправильный старый пароль!');
          return throwError(error.error.error.message);
        })
      );
  }

  changePassword(newPass: string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`,
      {
        idToken: localStorage.getItem('fb-token'),
        password: newPass,
        returnSecureToken: true
      }
    );
  }

}
