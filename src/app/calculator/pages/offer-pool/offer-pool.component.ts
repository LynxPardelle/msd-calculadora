import { Component, inject, Input, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';
import { Offer } from '../../interfaces/simulator';

@Component({
  selector: 'app-offer-pool',
  templateUrl: './offer-pool.component.html',
  styleUrl: './offer-pool.component.css',
})
export class OfferPoolComponent implements OnInit {
  @Input() selectedCategory: string = 'Todas';

  private simulatorService = inject(SimulatorService);

  get offersCategories() {
    const chaosCategories = this.simulatorService.offers
      .map((offer) => offer.category.map((category) => category))
      .filter((category) => category.length > 0);

    const orderCategories = chaosCategories.flat();
    const uniqueCategories = ['Todas', ...new Set(orderCategories)];
    console.log(uniqueCategories);

    return uniqueCategories;
  }

  get filteredOffers() {
    return this.selectedCategory === 'Todas'
      ? this.simulatorService.offers
      : this.simulatorService.offers.filter((offer) =>
          offer.category.includes(this.selectedCategory)
        );
  }

  onChangeSelectedCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedCategory = value;
  }

  ngOnInit(): void {
    this.simulatorService.enableDiscount = false;
  }
}
