import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { CountComponent } from './shared/count.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ItemListComponent } from './item-list/item-list.component';
import { BoxComponent } from './box/box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemEditGuard } from './item-edit.guard';
import { ItemDetailComponent } from './item-list/item-detail.component';
import { ItemResolver } from './item-list/item-resolver.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component/loading-spinner.component';
import { LogInComponent } from './user/LogIn.component';




@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
  //  InMemoryWebApiModule.forRoot(ItemData),
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'register', component: LogInComponent},
      {path: 'items',
      children: [
        {path: '', component: ItemListComponent},
        {
        path: ':id/Edit',
        canDeactivate: [ ItemEditGuard ],
        component: ItemEditComponent,
        resolve: {item: ItemResolver}
      },
      {path: ':id', component: ItemDetailComponent,
      resolve: {item: ItemResolver}},
      {path: 'box/:boxid', component: BoxComponent}
    ]},
    ]),


    SharedModule
  ],
  declarations: [    ItemsComponent,
      ItemListComponent,
      CountComponent,
      BoxComponent,
      ItemEditComponent,
      ItemDetailComponent,
      LogInComponent,
      LoadingSpinnerComponent
    ]
})
export class ItemModule { }
