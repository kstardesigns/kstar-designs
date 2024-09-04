import { Directive, HostListener, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[bhTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements OnChanges {

  @Input() bhTextareaAutoresize!: string;

  constructor(private elementRef: ElementRef) { }

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bhTextareaAutoresize']) {
      setTimeout(() => this.resize(), 0);
    }
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
  }

}