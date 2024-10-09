import { Injectable } from '@angular/core';
import { keytrudaCalculatorData } from '../data/keytrudaCalculatorData';
import { TKeytrudaCalculatorData } from '../types/keytrudaCalculatorData.type';
import { BehaviorSubject } from 'rxjs';
import { KeytrudaConfig } from '../data/keytrudaConfig';

@Injectable({
  providedIn: 'root'
})
export class KeytrudaService {
  private keytrudaConfig = KeytrudaConfig;
  private keytrudaCalculatorDataSubject = new BehaviorSubject<TKeytrudaCalculatorData>(keytrudaCalculatorData);
  keytrudaCalculatorData$ = this.keytrudaCalculatorDataSubject.asObservable();
  constructor() { }

  selectionClick(title: string){
    let data = this.keytrudaConfig.segmento.find((segmento) => segmento.title === title);
    console.log(data);
    this.keytrudaCalculatorDataSubject.next({
      page: data!.title,
      unitsPerProduct: '',
      pmp: data?.pmp || 0,
      comertialOfferDiscount: data?.comertialOffer() || 0,
      priceWithInitialOffer: data?.initialOfferPrice() || 0,
      units: 0,
      stepOne: 0,
      stepTwo: 0,
      benefitPerStepOne: 0,
      benefitPerStepTwo: 0,
      comertialOfferPercentage: data?.comertialOfferPercentage || 0,
      comertialPlan: data?.comertialPlan || 0,
      sugestedPriceWithComertialPlan: data?.comertialPlanFinalPrice() || 0,
      rentabilityPerPiece: data?.rentabilityPerPiece() || 0,
      rentabilityPerCycle: data?.rentabilityPerCycle() || 0,
      benefitOnfourteenCycles: data?.fourteenCyclesBenefit() || 0,
  });
}
}
