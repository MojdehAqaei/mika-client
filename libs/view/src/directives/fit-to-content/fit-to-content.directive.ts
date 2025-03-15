import {
  AfterContentInit,
  ApplicationRef,
  Directive,
  ElementRef,
  inject,
  Input,
  Renderer2
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';

@Directive({
  selector: '[viewFitToContent]',
  standalone: true,
})
export class FitToContentDirective implements AfterContentInit {
  readonly #el = inject(ElementRef);
  readonly #app = inject(ApplicationRef);
  readonly #viewportRuler = inject(ViewportRuler);
  readonly #renderer = inject(Renderer2);

  @Input() contentHeight!: number;

  ngAfterContentInit() {
    setTimeout(() => {
      /** children are of type HTMLCollection */
      const remainingHeight = this.#app.components[0].location.nativeElement.children.namedItem('app').children.namedItem('main-content').offsetHeight;
      const layoutHeight = this.#app.components[0].location.nativeElement.children.namedItem('app').children.namedItem('main-content').children.namedItem('view-layout').children.namedItem('layout-wrapper').offsetHeight;
      // this.setMinHeight(this.contentHeight + (this.viewportHeight - remainingHeight));
      this.setMinHeight(layoutHeight);
    });
  }

  get viewportWidth() {
    return this.#viewportRuler.getViewportSize().width;
  }
  get viewportHeight() {
    return  this.#viewportRuler.getViewportSize().height;
  }

  getCssValue(el: ElementRef, cssProperty: string = 'min-height') {
    const element = el.nativeElement;
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.getPropertyValue(cssProperty)
  }

  setMinHeight(height: number) {
    this.#renderer.setStyle(this.#el.nativeElement, 'min-height', height + 'px');
  }
}
