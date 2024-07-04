import { Component, inject, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';

@Component({
  selector: 'app-transfers',
  styleUrl: './transfers.component.css',
  template: `
    <div
      class="d-flex flex-column justify-content-between align-items-stretch align-content-between h-100"
    >
      <div class="overflow-auto p-5">
        <app-transfers-table
          [productItems]="products"
          class="flex-grow-1 mb-auto"
        ></app-transfers-table>
      </div>
      <app-transfers-quotation></app-transfers-quotation>
      <div class="customTarget col-6 position-fixed bottom-0 end-0 me-3">
        <h3 class="text-center mb-3" style="color: #3E444C;">
          Precio Unitario
        </h3>
        <div class="d-flex col-10 mx-auto gap-3">
          @for(item of reSortedProducts; track item.idProduct){
          <div
            class="d-flex flex-column justify-content-end align-content-end align-items-center w-33"
          >
            <span
              class="customText-3 mt-2 text-center"
              style="font-size: 1vw;"
              >{{ item.productName }}</span
            >
            <span
              class="form-control p-0 mt-3 customInputQuantity text-center"
              >{{ item.itemPrice | currency }}</span
            >
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TransfersComponent implements OnInit {
  private _simulatorService = inject(SimulatorService);

  get products() {
    return this._simulatorService.simulatorItemValues2().filter((item) => {
      if ([4, 6, 9].includes(item.idProduct)) {
        console.log(item);
        return item;
      } else {
        return null;
      }
    });
  }
  get reSortedProducts() {
    let prods = this._simulatorService.simulatorItemValues2().filter((item) => {
      if ([4, 6, 9].includes(item.idProduct)) {
        console.log(item);
        return item;
      } else {
        return null;
      }
    });
    let temp = prods[1];
    prods[1] = prods[0];
    prods[0] = prods[2];
    prods[2] = temp;
    return prods;
  }

  ngOnInit(): void {
    this._simulatorService.enableDiscount = false;
  }
}
