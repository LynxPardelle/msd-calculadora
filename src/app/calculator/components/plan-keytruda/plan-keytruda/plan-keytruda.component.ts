import { Component, OnInit } from '@angular/core';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';

@Component({
  selector: 'app-plan-keytruda',
  templateUrl: './plan-keytruda.component.html',
  styleUrl: './plan-keytruda.component.css'
})
export class PlanKeytrudaComponent implements OnInit {

  constructor(private _bef: NgxBootstrapExpandedFeaturesService) {}

  ngOnInit(): void {
    this.cssCreate();
  }

  cssCreate(){
    this._bef.cssCreate();
  }
}
