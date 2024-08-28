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
    console.log('montoTotalHospitalPmp', montoTotalHospitalPmp);
    const montoTotalPrecioSugerido = this.simulatorItemValues().reduce(
      (acc, product) => acc + product.suggestedPriceTotalAmount,
      0
    );
    console.log('montoTotalPrecioSugerido', montoTotalPrecioSugerido);
    const montoTotalPrecioTransfer = this.simulatorItemValues().reduce(
      (acc, product) => acc + (product.transferPriceTotalAmount || 0),
      0
    );
    console.log('montoTotalPrecioTransfer', montoTotalPrecioTransfer);
    const objetivoTrimestral = this.simulatorObjectiveValue();
    console.log('objetivoTrimestral', objetivoTrimestral);
    const variacionDescuento =
      montoTotalHospitalPmp / montoTotalPrecioSugerido - 1;
    console.log('variacionDescuento', variacionDescuento);
    const variacionDescuentoSugerido =
      1 - montoTotalPrecioTransfer / montoTotalPrecioSugerido;
    console.log('variacionDescuentoSugerido', variacionDescuentoSugerido);
    return {
      montoTotalHospitalPmp,
      montoTotalPrecioSugerido,
      variacionDescuento,
      variacionDescuentoSugerido,
      montoTotalNotaDeCredito:
        montoTotalHospitalPmp * (this.simulatorDiscountValue() / 100),
      montoTotalPrecioTransfer,
      cobertura: !!this.simulatorObjectiveValue()
        ? (montoTotalHospitalPmp * 100) / this.simulatorObjectiveValue()
        : 100,
      objetivoTrimestral,
    } as ProductsQuotation;
  });

  computedQuotation2 = computed<ProductsQuotation>((): ProductsQuotation => {
    const montoTotalHospitalPmp = this.simulatorItemValues2().reduce(
      (acc, product) => acc + product.pmpTotalAmount,
      0
    );
    console.log('montoTotalHospitalPmp', montoTotalHospitalPmp);
    const montoTotalPrecioSugerido = this.simulatorItemValues2().reduce(
      (acc, product) => acc + product.suggestedPriceTotalAmount,
      0
    );
    console.log('montoTotalPrecioSugerido', montoTotalPrecioSugerido);
    const montoTotalNotaDeCredito = 0;
    console.log('montoTotalNotaDeCredito', montoTotalNotaDeCredito);
    const montoTotalPrecioTransfer = this.simulatorItemValues2().reduce(
      (acc, product) => acc + (product.transferPriceTotalAmount || 0),
      0
    );
    console.log('montoTotalPrecioTransfer', montoTotalPrecioTransfer);
    const objetivoTrimestral = this.simulatorObjectiveValue();
    console.log('objetivoTrimestral', objetivoTrimestral);
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
      objetivoTrimestral,
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
          'https://www.google.com/url?q=https://app.powerbi.com/singleSignOn?experience%3Dpower-bi%26ru%3Dhttps%253A%252F%252Fapp.powerbi.com%252Fgroups%252Fme%252Freports%252F83b3455d-acc1-4eaf-8660-6fdf027ae4aa%252FReportSectionf86d32d8d0dc1c674701%253Fexperience%253Dpower-bi%2526noSignUpCheck%253D1&sa=D&source=editors&ust=1721341001893530&usg=AOvVaw03pMrHakhKtuekvSOgvhXo';
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
