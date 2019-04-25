import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { IItem } from './item';
import { Observable } from 'rxjs';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})

export class ItemResolver implements Resolve<IItem> {
  constructor(private itemService: ItemService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItem> {
    const id = route .paramMap.get('id');
    return this.itemService.getItem(id);
  }
}
