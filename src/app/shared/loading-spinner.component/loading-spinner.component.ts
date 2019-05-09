import { Component, Input } from '@angular/core';

@Component({
	selector: 'wb-loading-spinner',
	styleUrls: [ './loading-spinner.component.css' ],
	template: '<span class="fa fa-spinner spinner" *ngIf="loading"></span>'
})
export class LoadingSpinnerComponent {
	@Input() loading: boolean;
}
