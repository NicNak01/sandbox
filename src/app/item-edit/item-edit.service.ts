import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IItem } from '../item-list/item';
import { GenericValidator } from '../shared/generic-validator';

@Injectable({
	providedIn: 'root'
})
export class ItemEditService {
	validationMessages: any = {
		ItemName: {
			required: 'Item name is required.',
			minlength: 'Item name must be at least three characters.',
			maxlength: 'Item name cannot exceed 50 characters.'
		},
		id: {
			range: 'Id number between 1 (lowest) and 5 (highest).'
		},
		BOX: {
			range: 'Box number between 1 (lowest) and 5 (highest).'
		}
	};
	genericValidator: GenericValidator = new GenericValidator(this.validationMessages);

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

	createitem(item: IItem) {
		const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
		const postValue = Object.assign({}, item);
		const form = new FormData();
		Object.keys(postValue).forEach((key) => {
			form.append(key, postValue[key]);
		});
		return this.http
			.post(this.itemtUrl, form)
			.pipe(tap((data) => console.log(JSON.stringify(data))), catchError(this.handleError));
	}

	deleteitem(id: string): Observable<{}> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const url = `${this.itemtUrl}/${id}`;
		return this.http
			.delete<IItem>(url, { headers: headers })
			.pipe(tap((data) => console.log('deleteitem: ' + id)), catchError(this.handleError));
	}
	updateitem(item: IItem): Observable<IItem> {
		const pachValue = Object.assign({}, item);
		const form = new FormData();

		Object.keys(pachValue).forEach((key) => {
			form.append(key, pachValue[key]);
		});
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const url = `${this.itemtUrl}${pachValue._id}`;
		return this.http
			.patch<IItem>(url, form)
			.pipe(
				tap(() => console.log('updateitem: ' + pachValue._id)),
				map(() => item),
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
