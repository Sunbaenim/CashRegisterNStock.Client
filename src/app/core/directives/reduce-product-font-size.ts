import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReduceProductFontSize]',
  standalone: true
})
export class ReduceProductFontSizeDirective implements AfterViewInit {

  fontSize!: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.fontSize = this.getElementFontSize();
    this.checkElement();
  }

  getElementFontSize = () => parseInt((getComputedStyle(this.elementRef.nativeElement).fontSize).split('px')[0]);

  setElementFontSize = () => this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', (this.fontSize - 1) + 'px');;
  
  checkElement() {
    let element = this.elementRef.nativeElement;
    let isElementBiggerThanParent = (): boolean => {
      let elementWidth: number = 0;
      let paddingProductBanner: number = parseInt((getComputedStyle(this.elementRef.nativeElement.parentElement).padding).split(' ')[1].split('px')[0]) * 2;
      
      if (element.classList.contains('product-name')) {
        elementWidth = element.offsetWidth;
      } else if (element.classList.contains('product-subheader')) {
        let gap = parseInt((getComputedStyle(this.elementRef.nativeElement).gap).split('px')[0]);
        elementWidth = element.children[0].offsetWidth + element.children[1].offsetWidth + gap;
      }
      return elementWidth + paddingProductBanner > element.parentElement!.offsetWidth;
    }

    while (isElementBiggerThanParent()) {
      this.fontSize = this.getElementFontSize();
      this.setElementFontSize();
    }
  }

}
