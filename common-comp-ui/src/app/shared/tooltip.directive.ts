import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Injector, Input } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {

// Reference of the tooltip
// https://accesto.com/blog/how-to-create-angular-tooltip-directive/ 


  @Input() tooltip = '';

  private componentRef: ComponentRef<any>;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}


  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
        const componentFactory =
              this.componentFactoryResolver.resolveComponentFactory(
              TooltipComponent);
        this.componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(this.componentRef.hostView);
        const domElem = 
              (this.componentRef.hostView as EmbeddedViewRef<any>)
              .rootNodes[0] as HTMLElement;       
        document.body.appendChild(domElem);
        this.setTooltipComponentProperties();
    }
  }
}
