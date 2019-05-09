import { Injectable } from '@angular/core';
import { IItem } from '../item-list/item';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	itemtUrl = 'https://infinite-journey-65817.herokuapp.com/items/';
	constructor(private http: HttpClient) {}

	private initializeItem(): IItem {
		return {
			ItemName: null,
			id: null,
			BOX: null,
			Avalible: null,
			imageURL: null,
			_id: 'none'
		};
	}

	getItems(): Observable<IItem[]> {
		return this.http.get<IItem[]>(this.itemtUrl).pipe(
			map((data) => {
				data.forEach((item) => {
					item['imageURL'] = 'https://infinite-journey-65817.herokuapp.com/' + item['imageURL'];
				});
				return data;
			}),
			catchError(this.handleError)
		);
	}

	getBox(id: number): Observable<IItem | undefined> {
		return this.getItems().pipe(map((items: IItem[]) => items.find((p) => p.BOX === id)));
	}

	getItem(id: string): Observable<IItem> {
		if (id === 'none') {
			return of(this.initializeItem());
		}
		const url = `${this.itemtUrl}/${id}`;
		return this.http.get<IItem>(url).pipe(
			tap((data) => console.log('getItem: ' + JSON.stringify(data))),
			map((data) => {
				data['imageURL'] = 'https://infinite-journey-65817.herokuapp.com/' + data['imageURL'];
				return data;
			}),
			catchError(this.handleError)
		);
	}

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
