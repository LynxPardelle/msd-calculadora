import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css',
    standalone: false
})
export class FaqComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _bef: NgxBootstrapExpandedFeaturesService) {}

  ngOnInit(): void {
    this.cssCreate();
  }

  cssCreate() {
    this._bef.cssCreate();
  }

  closeModal() {

  }
}
