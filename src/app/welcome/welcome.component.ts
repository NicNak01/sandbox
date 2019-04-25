import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-list/item.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor( private itemService: ItemService) {}

  Items: string;

  ngOnInit() {
    this.itemService.getItems().subscribe(
      Items => {
      this.Items = JSON.stringify(Items);
  });
}


}
