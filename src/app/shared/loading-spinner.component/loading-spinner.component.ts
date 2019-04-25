import {Component, Input} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'wb-loading-spinner',
  styleUrls: ['./loading-spinner.component.css'],
  template: '<span class="fa fa-spinner spinner" *ngIf="loading"></span>'
})
export class LoadingSpinnerComponent {
  @Input() loading: boolean;
}
