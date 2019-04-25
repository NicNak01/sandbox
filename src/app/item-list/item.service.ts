import { Injectable } from '@angular/core';
import { IItem } from './item';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class ItemService {
   itemtUrl = 'https://infinite-journey-65817.herokuapp.com/items/';
  //  itemtUrl = 'http://localhost:8080/items/';
  constructor(private http: HttpClient) {}

  private initializeItem(): IItem {
     return {
     ItemName: null,
     id: null,
     BOX : null,
     Avalible: null,
     imageURL: null,
     _id: 'none',
     };
   }

  // Provide items for item list in item list component
  getItems(): Observable <IItem[]> {
    return this.http.get<IItem[]>(this.itemtUrl).pipe(
      map(data => {
        data.forEach(item => {
          item['imageURL'] = 'https://infinite-journey-65817.herokuapp.com/' + item['imageURL'];
          // item['imageURL'] = 'http://localhost:8080/' + item['imageURL'];
      });
      return data;
      }),
      catchError(this.handleError)
    );
  }

// old for Box component in progress
  getBox(id: number): Observable<IItem | undefined> {
  return this.getItems().pipe(
    map((items: IItem[]) => items.find(p => p.BOX === id))
  );
}
// Provide items for Edit item Components


getItem(id: string): Observable<IItem> {
  if (id === 'none' ) {
    return of(this.initializeItem());
  }
  const url = `${this.itemtUrl}/${id}`;
  return this.http.get<IItem>(url)
    .pipe(
      tap(data => console.log('getItem: ' + JSON.stringify(data))),
      map(
        data => {
          data['imageURL'] = 'https://infinite-journey-65817.herokuapp.com/' + data['imageURL'];
          return data;
      }),
      catchError(this.handleError)
    );
}
// createitem(item: IItem) {
//   const headers = new HttpHeaders({ 'Content-Type':  'multipart/form-data' });
//   const postValue = Object.assign({}, item);
//   const p = new FormData();
//   Object.keys(postValue).forEach(key => {
//     p.append(key, postValue[key]);
//   });
//   return this.http.post(this.itemtUrl, p)
//     .pipe(
//       tap(data => console.log(JSON.stringify(data))),
//       catchError(this.handleError)
//     );
// }

// deleteitem(id: string): Observable<{}> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   const url = `${this.itemtUrl}/${id}`;
//   return this.http.delete<IItem>(url, { headers: headers })
//     .pipe(
//       tap(data => console.log('deleteitem: ' + id)),
//       catchError(this.handleError)
//     );
// }

// updateitem(item: IItem): Observable<IItem> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   const url = `${this.itemtUrl}/${item._id}`;
//   return this.http.patch<IItem>(url, item )
//     .pipe(
//       tap(() => console.log('updateitem: ' + item._id)),
//       map(() => item),
//       catchError(this.handleError)
//     );
// }

private handleError(err) {
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
  }
  console.error(err);
  return throwError(errorMessage);
}
}
