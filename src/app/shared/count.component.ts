import { Component, OnChanges, Input } from '@angular/core';

@Component({
	selector: 'pm-count',
	templateUrl: './count.component.html'
})
export class CountComponent implements OnChanges {
	@Input() raiting: number;

	ngOnChanges(): void {
		this.raiting++;
	}
}
