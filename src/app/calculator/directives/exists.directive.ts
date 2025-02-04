import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
    selector: '[appExists]',
    standalone: false
})
export class ExistsDirective implements OnInit {
  @Input() appExists!: boolean;
  @Input() time: number = 1;
  @Output('appExists') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (this.appExists) {
      setTimeout(() => {
        this.initEvent.emit();
      }, this.time);
    }
  }
}
