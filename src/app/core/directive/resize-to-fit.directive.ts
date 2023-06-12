import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeToFit]'
})
export class ResizeToFitDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.checkElementWidth();
  }

  checkElementWidth() {
    const element = this.elementRef.nativeElement;    
    const productBannerComputedStyle = getComputedStyle(element);
    const productBannerPadding = parseInt(productBannerComputedStyle.padding.split('px')[0]);
    const productBannerWidth = parseInt(productBannerComputedStyle.width.split('px')[0]);
    const productNameElement = element.firstChild;
    const productNameComputedStyle = getComputedStyle(productNameElement);
    const productNameTextWidth = parseInt(productNameComputedStyle.width.split('px')[0]);
    const isProductNameTooBig = productBannerWidth - (productBannerPadding * 3) - productNameTextWidth < 0 ? true : false;
    if (isProductNameTooBig) {
      this.changeFontSize(productNameElement);
    }

    const productDescElement = element.children[1].children[0];
    const productDescComputedStyle = getComputedStyle(productDescElement);
    const productDescTextWidth = parseInt(productDescComputedStyle.width.split('px')[0]);
    const productPriceElement = element.children[1].children[1];
    const productPriceComputedStyle = getComputedStyle(productPriceElement);
    const productPriceTextWidth = parseInt(productPriceComputedStyle.width.split('px')[0]);
    const isProductDescTooBig = productBannerWidth - (productBannerPadding * 4) - productDescTextWidth - productPriceTextWidth < 0 ? true : false;
    if (isProductDescTooBig) {
      this.changeFontSize(productDescElement);
    }
  }

  changeFontSize(element: HTMLElement) {
    const fontSize = parseFloat(getComputedStyle(element).fontSize);
    this.renderer.setStyle(element, 'font-size', `${fontSize - 1}px`);
    this.checkElementWidth();
  }

}
