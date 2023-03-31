import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = true;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;

  constructor(private el: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.activeElementIndex = 0;

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border 2px solid red');
        }
      }
    }

    setTimeout(() => {
      this.renderComplete.emit(true);
    })


  }

  initKeyUp(ev: KeyboardEvent): void {

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight' && this.index < this.items.length-1) {
      this.index++;
    }

    if (ev.key === 'ArrowLeft' && this.index > 0) {
      this.index--;
    }

    if (this.items[this.index]) {
      (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }

    this.activeElementIndex = this.index;
  }

  initStyle(index: number): void {
    if (this.items[index]?.getAttribute('style') !== 'border: 2px solid red') {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }
}
