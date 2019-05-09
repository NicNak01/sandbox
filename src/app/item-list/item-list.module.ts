import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogInComponent } from '../user/LogIn.component';
import { ItemListComponent } from './item-list.component';

import { ItemEditComponent } from '../item-edit/item-edit.component';
import { ItemResolver } from './item-resolver.service';
import { ItemDetailComponent } from './item-detail.component';
import { BoxComponent } from '../box/box.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsComponent } from '../items/items.component';
import { CountComponent } from '../shared/count.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component/loading-spinner.component';
import { ItemEditGuard } from '../core/item-edit.guard';

@NgModule({
	imports: [
		CommonModule,
		InfiniteScrollModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{ path: 'register', component: LogInComponent },
			{
				path: 'items',
				children: [
					{ path: '', component: ItemListComponent },
					{
						path: ':id/Edit',
						canDeactivate: [ ItemEditGuard ],
						component: ItemEditComponent,
						resolve: { item: ItemResolver }
					},
					{
						path: ':id',
						component: ItemDetailComponent,
						resolve: { item: ItemResolver }
					},
					{ path: 'box/:boxid', component: BoxComponent }
				]
			}
		]),

		SharedModule
	],
	declarations: [
		ItemsComponent,
		ItemListComponent,
		CountComponent,
		BoxComponent,
		ItemEditComponent,
		ItemDetailComponent,
		LogInComponent,
		LoadingSpinnerComponent
	],
	exports: [
		ItemsComponent,
		ItemListComponent,
		CountComponent,
		BoxComponent,
		ItemEditComponent,
		ItemDetailComponent,
		LogInComponent,
		LoadingSpinnerComponent
	]
})
export class ItemListModule {}
