import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { IItem } from './item';
@Component({
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  pageTitle = 'Item Detail';
  errorMessage = '';
  item: IItem | undefined;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.item = this.route.snapshot.data['item'];
  }
  onBack(): void {
    this.router.navigate(['/items']);
  }
}
