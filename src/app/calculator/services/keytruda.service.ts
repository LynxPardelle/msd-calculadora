import { Injectable } from '@angular/core';
import { keytrudaCalculatorData } from '../data/keytrudaCalculatorData';
import { TKeytrudaCalculatorData } from '../types/keytrudaCalculatorData.type';
import { BehaviorSubject } from 'rxjs';
import { KeytrudaConfig } from '../data/keytrudaConfig';

@Injectable({
  providedIn: 'root',
})
export class KeytrudaService {
  private keytrudaConfig = KeytrudaConfig;
  private keytrudaCalculatorDataSubject =
    new BehaviorSubject<TKeytrudaCalculatorData>(keytrudaCalculatorData);
  keytrudaCalculatorData$ = this.keytrudaCalculatorDataSubject.asObservable();
  constructor() {}

  selectionClick(title: string) {
    let data = this.keytrudaConfig.segmento.find(
      (segmento) => segmento.title === title
    );
    this.keytrudaCalculatorDataSubject.next({
      page: data!.title,
      unitsPerProduct: '',
      pmp: data?.pmp || 0,
      comertialOfferDiscount: data?.comertialOffer() || 0,
      priceWithInitialOffer: data?.initialOfferPrice() || 0,
      units: data?.units || 0,
      stepOne: data?.stepOne || 0,
      stepOnePersentage: data?.stepOnePersentage || 0,
      stepTwoPersentage: data?.stepTwoPersentage || 0,
      stepTwo: data?.stepTwo || 0,
      benefitPerStepOne: data?.benefitPerStepOne?.() ?? 0,
      benefitPerStepTwo: data?.benefitPerStepTwo?.() ?? 0,
      comertialOfferPercentage: data?.comertialOfferPercentage || 0,
      comertialPlan: data?.comertialPlan || 0,
      sugestedPriceWithComertialPlan: data?.comertialPlanFinalPrice() || 0,
      rentabilityPerPiece: data?.rentabilityPerPiece() || 0,
      rentabilityPerCycle: data?.rentabilityPerCycle() || 0,
      benefitOnfourteenCycles: data?.fourteenCyclesBenefit() || 0,
    });
  }

  valueChange(
    data: TKeytrudaCalculatorData,
    key: 'units' | 'stepOne' | 'stepTwo',
    value: number
  ) {
    let newData = { ...data, [key]: value };
    switch (key) {
      case 'stepOne':
        newData.benefitPerStepOne = newData.stepOne * newData.pmp * 0.02;
        break;
      case 'stepTwo':
        newData.benefitPerStepTwo = newData.stepTwo * newData.pmp * 0.04;
        break;
      default:
        // Do nothing
        break;
    }
    this.keytrudaCalculatorDataSubject.next(newData);
  }
}
