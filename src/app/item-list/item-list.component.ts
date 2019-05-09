import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'lodash';
import { IItem } from './item';
import { ItemService } from '../core/data.service';

declare var _: any;
@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: [ './item-list.component.css' ]
})
export class ItemListComponent implements OnInit {
	constructor(private itemService: ItemService, private route: ActivatedRoute) {}
	scale = false;
	processing: boolean;
	errorMesage = false;
	showImage = false;
	image = {
		url: '',
		name: ''
	};
	pageTitle = 'Item Name';
	batch = 15;
	_listFilter: string;
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredItems = this.listFilter ? this.performFilter(this.listFilter) : this.Items;
	}

	filteredItems: IItem[];
	Items: IItem[] = [];

	performFilter(filterBy: string): IItem[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.Items.filter((item: IItem) => item.ItemName.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void {
		this.listFilter = this.route.snapshot.queryParamMap.get('filteredBy') || '';
		this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
		this.itemService.getItems().subscribe((Items) => {
			this.errorMesage = false;
			this.Items = Items;
			this.filteredItems = this.listFilter
				? this.performFilter(this.listFilter)
				: _.slice(this.Items, 0, this.batch);
			this.displayitems();
		}, () => (this.errorMesage = true));
	}
	onScrollDown() {
		this.processing = true;
		this.batch++;
		this.filteredItems = _.slice(this.Items, 0, this.batch);
		this.processing = false;
	}
	displayitems() {
		if (this.filteredItems.length > 3) {
			const newFiltered = _.slice(this.filteredItems, 0, this.batch);
		}
	}
	change_scale(item) {
		this.scale = !this.scale;
		if (this.scale === true) {
			this.image.url = item.imageURL;
			this.image.name = item.ItemName;
		} else {
			this.image.url = '';
			this.image.name = '';
		}
	}
}
