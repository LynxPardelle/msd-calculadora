import { Injectable, signal, computed } from '@angular/core';
import {
  Offer,
  Products,
  ProductsQuotation,
  TopClients,
} from '../interfaces/simulator';

import * as productsJson from '../data/products.json';
import * as offersJson from '../data/offers.json';

@Injectable({
  providedIn: 'root',
})
export class SimulatorService {
  // _payRelease EN TRUE SOLO PARA PRUEBAS, REGRESAR A FALSE HASTA PAGO DEL CLIENTE
  private _payRelease: boolean = true;
  private _textPayRelease: string =
    'Sitio de demostración, prohibido comercializar.';

  products: Products[] = (productsJson as any).default;
  offers: Offer[] = (offersJson as any).default;
  enableDiscount: boolean = false;
  topClientsGardasilPrice: number = 2506.6;

  simulatorDiscountValue = signal<number>(0);
  simulatorObjectiveValue = signal<number>(0);
  simulatorItemValues = signal<Products[]>(
    this.products.map((product) => ({
      ...product,
      unit: 0,
      pmpTotalAmount: 0,
      suggestedPrice: 0,
      suggestedPriceTotalAmount: 0,
      transferPriceTotalAmount: 0,
    }))
  );

  simulatorItemValues2 = signal<Products[]>(
    this.products.map((product) => ({
      ...product,
      unit: 0,
      pmpTotalAmount: 0,
      suggestedPrice: 0,
      suggestedPriceTotalAmount: 0,
      transferPriceTotalAmount: 0,
      itemDiscount: 0,
      itemPrice: 0,
    }))
  );

  topClientsValues = signal<TopClients>({
    unit: 0,
    objective: 0,
    comercialPlan: 4,
    totalNC: 0,
    ncPeerPiece: 0,
  });

  computedQuotation = computed<ProductsQuotation>((): ProductsQuotation => {
    const montoTotalHospitalPmp = this.simulatorItemValues().reduce(
      (acc, product) => acc + product.pmpTotalAmount,
      0
    );
    const montoTotalPrecioSugerido = this.simulatorItemValues().reduce(
      (acc, product) => acc + product.suggestedPriceTotalAmount,
      0
    );
    const montoTotalPrecioTransfer = this.simulatorItemValues().reduce(
      (acc, product) => acc + (product.transferPriceTotalAmount || 0),
      0
    );
    return {
      montoTotalHospitalPmp,
      montoTotalPrecioSugerido,
      variacionDescuento: montoTotalHospitalPmp / montoTotalPrecioSugerido - 1,
      variacionDescuentoSugerido:
        1 - montoTotalPrecioTransfer / montoTotalPrecioSugerido,
      montoTotalNotaDeCredito:
        montoTotalHospitalPmp * (this.simulatorDiscountValue() / 100),
      montoTotalPrecioTransfer,
      cobertura: !!this.simulatorObjectiveValue()
        ? (montoTotalHospitalPmp * 100) / this.simulatorObjectiveValue()
        : 100,
      objetivoTrimestral: this.simulatorObjectiveValue(),
    } as ProductsQuotation;
  });

  computedQuotation2 = computed<ProductsQuotation>((): ProductsQuotation => {
    const montoTotalHospitalPmp = this.simulatorItemValues2().reduce(
      (acc, product) => acc + product.pmpTotalAmount,
      0
    );
    const montoTotalPrecioSugerido = this.simulatorItemValues2().reduce(
      (acc, product) => acc + product.suggestedPriceTotalAmount,
      0
    );

    const montoTotalNotaDeCredito = 0;

    const montoTotalPrecioTransfer = this.simulatorItemValues2().reduce(
      (acc, product) => acc + (product.transferPriceTotalAmount || 0),
      0
    );
    return {
      montoTotalHospitalPmp,
      montoTotalPrecioSugerido,
      variacionDescuento: 1 - montoTotalPrecioTransfer / montoTotalHospitalPmp,
      variacionDescuentoSugerido:
        1 - montoTotalPrecioTransfer / montoTotalPrecioSugerido,
      montoTotalNotaDeCredito,
      montoTotalPrecioTransfer,
      cobertura: !!this.simulatorObjectiveValue()
        ? (montoTotalHospitalPmp * 100) / this.simulatorObjectiveValue()
        : 100,
      objetivoTrimestral: this.simulatorObjectiveValue(),
    } as ProductsQuotation;
  });

  computedTopClients = computed<TopClients>(() => {
    const { unit, objective, comercialPlan } = this.topClientsValues();

    return {
      unit,
      objective,
      comercialPlan,
      totalNC: unit * (this.topClientsGardasilPrice * (comercialPlan / 100)),
      ncPeerPiece: this.topClientsGardasilPrice * (comercialPlan / 100),
    } as TopClients;
  });

  get payRelease() {
    return this._payRelease;
  }

  get textPayRelease() {
    return this._textPayRelease;
  }
}
