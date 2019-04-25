// tslint:disable-next-line:import-spacing
import { Component, OnChanges, Input  }  from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pm-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnChanges {
  @Input() raiting: number;


  ngOnChanges(): void {
    this.raiting ++ ;
  }

}
