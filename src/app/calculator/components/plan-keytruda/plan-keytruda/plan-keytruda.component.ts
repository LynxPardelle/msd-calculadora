import { Component, OnInit } from '@angular/core';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
import { KeytrudaService } from '../../../services/keytruda.service';
import { TKeytrudaCalculatorData } from '../../../types/keytrudaCalculatorData.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plan-keytruda',
  templateUrl: './plan-keytruda.component.html',
  styleUrl: './plan-keytruda.component.css'
})
export class PlanKeytrudaComponent implements OnInit {
  keytrudaCalculatorData$!: Observable<TKeytrudaCalculatorData>;
  buttonTitles!: string[]
  constructor(private _bef: NgxBootstrapExpandedFeaturesService, private _keytrudaService: KeytrudaService) {

  }

  ngOnInit(): void {
    this.cssCreate();
    this.keytrudaCalculatorData$ = this._keytrudaService.keytrudaCalculatorData$;
  }

  cssCreate(){
    this._bef.cssCreate();
  }
}
