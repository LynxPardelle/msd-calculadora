import { Component, Input, OnInit } from '@angular/core';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
import { KeytrudaService } from '../../../services/keytruda.service';
import { TKeytrudaCalculatorData } from '../../../types/keytrudaCalculatorData.type';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-plan-keytruda',
    templateUrl: './plan-keytruda.component.html',
    styleUrl: './plan-keytruda.component.css',
    standalone: false
})
export class PlanKeytrudaComponent implements OnInit {
  keytrudaCalculatorData$!: Observable<TKeytrudaCalculatorData>;
  @Input() title: string = 'HOSPITALES';
  showFaqModal: boolean = false;

  show: boolean = false;
  options: { title: string; selected: boolean }[] = [
    { title: 'HOSPITALES', selected: true },
    { title: 'CENTROS ONCOLÓGICOS TOP PREMIUM', selected: false },
    { title: 'CENTROS ONCOLÓGICOS TIER 1', selected: false },
    { title: 'CENTROS ONCOLÓGICOS TIER 2', selected: false },
    { title: 'CENTROS ONCOLÓGICOS TIER 3', selected: false },
  ];
  buttonTitles!: string[];
  constructor(
    private _bef: NgxBootstrapExpandedFeaturesService,
    private _keytrudaService: KeytrudaService
  ) {}

  ngOnInit(): void {
    this._bef.cssCreate([
      'bef-bg-HASHe2e3e4',
      'bef-position-absolute',
      'bef-top-40px',
      'bef-end-50px',
      'bef-w-40px',
      'bef-h-40px',
      'bef-border-0',
      'bef-bg-transparent',
      'bef-color-transparent',
    ]);
    this.cssCreate();
    this.keytrudaCalculatorData$ =
      this._keytrudaService.keytrudaCalculatorData$;
    this.title =
      this.options.find((option) => option.selected)?.title || 'HOSPITALES';
    this._keytrudaService.selectionClick(this.title);
  }

  cssCreate() {
    this._bef.cssCreate();
  }

  showOptions() {
    this.show = !this.show;
  }

  select(title: string) {
    this.title = title;
    this.show = false;
    this._keytrudaService.selectionClick(title);
  }

  onInputChange(data: any, key: 'units' | 'stepOne' | 'stepTwo', event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const newValue = parseFloat(
      value.replace(/\$/, '').replace(/,/g, '').trim()
    );
    this._keytrudaService.valueChange(data, key, newValue);
  }

  openFaqModal(open: boolean = true) {
    console.log('openFaqModal', open);
    this.showFaqModal = open;
  }
}
