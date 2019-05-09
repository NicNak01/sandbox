import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ItemListModule } from '../item-list/item-list.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
	imports: [ CommonModule, FormsModule, LayoutModule, ItemListModule ],
	declarations: [ WelcomeComponent, UserComponent ],
	exports: [ WelcomeComponent, UserComponent ]
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
