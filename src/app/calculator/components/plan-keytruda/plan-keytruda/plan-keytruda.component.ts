import { Component, Input, OnInit } from '@angular/core';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
import { KeytrudaService } from '../../../services/keytruda.service';
import { TKeytrudaCalculatorData } from '../../../types/keytrudaCalculatorData.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plan-keytruda',
  templateUrl: './plan-keytruda.component.html',
  styleUrl: './plan-keytruda.component.css',
})
export class PlanKeytrudaComponent implements OnInit {
  keytrudaCalculatorData$!: Observable<TKeytrudaCalculatorData>;
  @Input() title!: string | undefined;
  show: boolean = false;
  options: { title: string, selected: boolean}[] = [
    {title: 'HOSPITALES', selected: true},
    {title: 'CENTROS ONCOLÓGICOS TOP PREMIUM', selected: false},
    {title: 'CENTROS ONCOLÓGICOS TIER 1', selected: false},
    {title: 'CENTROS ONCOLÓGICOS TIER 2', selected: false},
    {title: 'CENTROS ONCOLÓGICOS TIER 3', selected: false},
  ]
  buttonTitles!: string[];
  constructor(
    private _bef: NgxBootstrapExpandedFeaturesService,
    private _keytrudaService: KeytrudaService
  ) {}

  ngOnInit(): void {
    this.cssCreate();
    this.keytrudaCalculatorData$ =
      this._keytrudaService.keytrudaCalculatorData$;
    this.title = this.options.find((option) => option.selected)?.title;
  }

  cssCreate() {
    this._bef.cssCreate();
  }

  showOptions(){
    this.show = !this.show;
  }

  select(title: string){
    this.title = title;
    this.show = false;
    this._keytrudaService.selectionClick(title);
  }


}
