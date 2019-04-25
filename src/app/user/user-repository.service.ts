import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError } from 'rxjs';
import {catchError, tap, delay, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  currentUser: any;
  private sigunupUrl = 'https://infinite-journey-65817.herokuapp.com/user/signup/';
  private logInUrl = 'https://infinite-journey-65817.herokuapp.com/user/login/';
  constructor(private http: HttpClient) {}

  Loguser(user): Observable<any> {
    return this.http.post(this.logInUrl, user)
    .pipe(
      // tap(data => this.token = JSON.stringify(data)),
      tap(data => localStorage.setItem ('token', JSON.stringify(data))),
      catchError(this.handleError)
      );
    // this.currentUser = Object.assign({}, user, {classes: user.classes || []});

    // return EMPTY;
  }
  enroll(classId): Observable<any> {
    if (!this.currentUser) {
      return Observable.throw('User not signed in');
    }

    if (this.currentUser.classes.includes[classId]) {
      return Observable.throw('Already enrolled');
    }

    this.currentUser = Object.assign({}, this.currentUser, {classes: this.currentUser.classes.concat([classId])});

     return EMPTY;
  }

  drop(classId): Observable<any> {
    if (!this.currentUser) {
      return Observable.throw('User not signed in');
    }
    if (!this.currentUser.classes.includes(classId)) {
      return Observable.throw('Not enrolled');
    }

    this.currentUser = Object.assign({}, this.currentUser, {classes: this.currentUser.classes.filter(c => c.classId !== classId)});

     return EMPTY;
  }

  Createuser(credentials): Observable<any> {

  return this.http.post(this.sigunupUrl, credentials)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );




    // Never, ever check credentials in client-side code.
    // This code is only here to supply a fake endpoint for signing in.
    // if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret') {
    //   return Observable.throw('Invalid login');
    // }

    // this.currentUser = {
    //   userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
    //   firstName: 'Jim',
    //   lastName: 'Cooper',
    //   email: 'me@whitebeards.edu',
    //   classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a']
    // };

    // return EMPTY;
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  getToken(): string {
    const token = JSON.parse(localStorage.getItem('token'));
    return  token;
  //  return localStorage.getItem('token');
  }
}

// const USERS = [{
//   userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
//   firstName: 'Jim',
//   lastName: 'Cooper',
//   email: 'someones-email@gmail.com',
//   password: 'supersecret',
//   classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a']
// }];
