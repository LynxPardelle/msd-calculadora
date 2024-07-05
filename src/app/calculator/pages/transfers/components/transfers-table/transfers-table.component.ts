import { Component, inject, Input } from '@angular/core';
import { Products } from '../../../../interfaces/simulator';
import { SimulatorService } from '../../../../services/simulator.service';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrl: './transfers-table.component.css',
})
export class TransfersTableComponent {
  @Input({ required: true }) productItems: Products[] = [];
  public currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  });
  public percentInputMask = createMask({
    alias: 'numeric',
    suffix: ' %',
    placeholder: '0%',
  });
  public showPopUp: 0 | 1 | 2 = 0;

  private _simulatorService = inject(SimulatorService);

  onItemSuggestedPriceChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const suggestedPrice = parseFloat(value);

    this._simulatorService.simulatorItemValues2.set(
      this.productItems.map((productItem) => {
        if (productItem.idProduct === product.idProduct) {
          return {
            ...productItem,
            suggestedPrice,
            itemPrice:
              suggestedPrice -
              suggestedPrice * (productItem.itemDiscount / 100),
            suggestedPriceTotalAmount: suggestedPrice * productItem.unit,
            transferPriceTotalAmount:
              (suggestedPrice -
                suggestedPrice * (productItem.itemDiscount / 100)) *
              productItem.unit,
          };
        } else {
          return productItem;
        }
      })
    );
  }

  onItemUnitChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const unit = parseInt(value);

    this._simulatorService.simulatorItemValues2.set(
      this.productItems.map((productItem) => {
        if (productItem.idProduct === product.idProduct) {
          return {
            ...productItem,
            unit,
            pmpTotalAmount: productItem.pmp * unit,
            suggestedPriceTotalAmount: productItem.suggestedPrice * unit,
            transferPriceTotalAmount:
              (productItem.suggestedPrice -
                productItem.suggestedPrice * (productItem.itemDiscount / 100)) *
              unit,
          };
        } else {
          return productItem;
        }
      })
    );
  }

  onItemDiscountChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(' %', '');
    let discount = parseFloat(value);
    this.showPopUp = discount > 16.66 ? 2 : discount > 10 ? 1 : 0;
    console.log(discount);
    if (discount > 16.66) {
      discount = 16.66;
    }
    console.log(discount);

    this._simulatorService.simulatorItemValues2.set(
      this.productItems.map((productItem) => {
        if (productItem.idProduct === product.idProduct) {
          return {
            ...productItem,
            itemDiscount: discount,
            itemPrice:
              productItem.suggestedPrice -
              productItem.suggestedPrice * (discount / 100),
            transferPriceTotalAmount:
              (productItem.suggestedPrice -
                productItem.suggestedPrice * (discount / 100)) *
              productItem.unit,
          };
        } else {
          return productItem;
        }
      })
    );
  }

  onlynumber(event: KeyboardEvent): void {
    event.key.match(/[^0-9]*/g) && event.preventDefault();
  }
}
