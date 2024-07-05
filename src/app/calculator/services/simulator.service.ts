import { Injectable, signal, computed } from '@angular/core';
import {
  Offer,
  Products,
  ProductsQuotation,
  TopClients,
} from '../interfaces/simulator';

import * as productsJson from '../data/products.json';
import * as offersJson from '../data/offers.json';
import { Location } from '@angular/common';
import { logo } from '../../../../../novo-calculator/src/app/shared/services/svgs/logo.svg';

@Injectable({
  providedIn: 'root',
})
export class SimulatorService {
  // _payRelease EN TRUE SOLO PARA PRUEBAS, REGRESAR A FALSE HASTA PAGO DEL CLIENTE
  private _payRelease: boolean = true;
  private _textPayRelease: string =
    'Sitio de demostración, prohibido comercializar.';

  public products: Products[] = (productsJson as any).default;
  public offers: Offer[] = (offersJson as any).default;
  public enableDiscount: boolean = false;
  public enableInventarioYCaducidades: boolean = false;
  public inventariosCaducidadesUrl: string = '';
  public logoUrl: string = './assets/images/slide2/B01_LogoTitulo.png';
  topClientsGardasilPrice: number = 2506.6;

  simulatorDiscountValue = signal<number>(0);
  simulatorObjectiveValue = signal<number>(0);
  simulatorItemValues = signal<Products[]>(
    this.products.map((product) => ({
      ...product,
      unit: 0,
      pmpTotalAmount: 0,
      suggestedPrice: product.pmp,
      suggestedPriceTotalAmount: 0,
      transferPriceTotalAmount: 0,
    }))
  );

  simulatorItemValues2 = signal<Products[]>(
    this.products.map((product) => ({
      ...product,
      unit: 0,
      pmpTotalAmount: 0,
      suggestedPrice: product.pmp,
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

  constructor(private _location: Location) {
    this._location.onUrlChange((url) => {
      this.enableInventarioYCaducidades = false;
      this.logoUrl = './assets/images/slide2/B01_LogoTitulo.png';
      if (url.includes('simulator')) {
        this.inventariosCaducidadesUrl =
          'https://www.google.com/url?q=https://app.powerbi.com/groups/me/reports/83b3455d-acc1-4eaf-8660-6fdf027ae4aa/ReportSectionf86d32d8d0dc1c674701?experience%3Dpower-bi&sa=D&source=editors&ust=1720212778800411&usg=AOvVaw2W4FoCnuDepv7LXpa18NEk';
        this.enableInventarioYCaducidades = true;
      } else if (url.includes('transfers')) {
        this.inventariosCaducidadesUrl =
          'https://www.google.com/url?q=https://app.powerbi.com/groups/me/reports/83b3455d-acc1-4eaf-8660-6fdf027ae4aa/ReportSectionf86d32d8d0dc1c674701?experience%3Dpower-bi&sa=D&source=editors&ust=1720212778799132&usg=AOvVaw0fgkABUEslHsWIwsCKqT61';
        this.enableInventarioYCaducidades = true;
      } else if (url.includes('top-costumers')) {
        this.logoUrl = './assets/images/slide4/D01_LogoTitulo.png';
      }
    });
  }
}
