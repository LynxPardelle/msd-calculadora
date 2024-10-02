import { Injectable } from '@angular/core';
import { keytrudaCalculatorData } from '../data/keytrudaCalculatorData';
import { TKeytrudaCalculatorData } from '../types/keytrudaCalculatorData.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeytrudaService {
  private keytrudaCalculatorDataSubject = new BehaviorSubject<TKeytrudaCalculatorData>(keytrudaCalculatorData);
  keytrudaCalculatorData$ = this.keytrudaCalculatorDataSubject.asObservable();
  constructor() { }
}
