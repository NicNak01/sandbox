import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemEditComponent } from '../item-edit/item-edit.component';

@Injectable({
	providedIn: 'root'
})
export class ItemEditGuard implements CanDeactivate<ItemEditComponent> {
	canDeactivate(component: ItemEditComponent): Observable<boolean> | Promise<boolean> | boolean {
		if (component.itemForm.dirty) {
			const ItemName = component.itemForm.get('ItemName').value || 'New Item';
			return confirm(`Navigate away and lose all changes to ${ItemName}?`);
		}
		return true;
	}
}
