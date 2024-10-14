import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }
}
