import { Component, inject, Input } from '@angular/core';
import { Products } from '../../../../interfaces/simulator';
import { SimulatorService } from '../../../../services/simulator.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrl: './transfers-table.component.css',
})
export class TransfersTableComponent {
  @Input({ required: true }) productItems: Products[] = [];

  private _simulatorService = inject(SimulatorService);

  onItemSuggestedPriceChange(product: Products, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const suggestedPrice = parseFloat(value);
    console.log('suggestedPrice', suggestedPrice);

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
    const value = target.value;
    const discount = parseInt(value);

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
