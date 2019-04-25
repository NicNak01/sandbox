import { Component, OnInit } from '@angular/core';
import { IItem } from '../item-list/item';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item-list/item.service';
import { Subscription } from 'rxjs';

@Component({

  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  boxItem: IItem | undefined;
  boximageURL: String;
  errorMessage = '';
  private sub: Subscription;
  boxFilteredItems: IItem[];
  items: IItem[] = [];
  boxID: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private itemService: ItemService) { }


onBack(): void {
  this.router.navigate(['/items']);
}

ngOnInit(): void {
  this.sub = this.route.params.subscribe(
    params => {
      this.boxID = parseInt(params['boxid'], 10);
    });
  this.itemService.getItems().subscribe(
    items => {
    this.items = items;
    this.boxFilteredItems = this.items.filter((item: IItem ) => item.BOX === this.boxID );
  });
  this.checkBoxUrl(this.boxID);
}


checkBoxUrl(id) {
    this.boximageURL = `../../assets/Box/${id}.gif`;
}
}
