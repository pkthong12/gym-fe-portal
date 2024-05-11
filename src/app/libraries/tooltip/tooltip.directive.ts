import {
  Directive,
  Input,
  ComponentRef,
  ElementRef,
  ApplicationRef,
  EmbeddedViewRef,
  HostListener,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';

import { TooltipComponent } from './tooltip.component';
import { Router } from '@angular/router';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  private componentRef!: ComponentRef<any>;
  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private router : Router
  ) { }

  @Input() appTooltip!: string;
  @Input() showAnyway!: boolean;
  @Input() position!: string; // "above", "under", "left", "right"

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: any): void {
    const condition = () => this.showAnyway || (!e.currentTarget.innerText && !e.currentTarget.innerText?.length) || (!!e.currentTarget.innerText && !!e.currentTarget.innerText?.length && (e.currentTarget.offsetWidth < e.currentTarget.scrollWidth))
    if (!condition()) return
    if (this.componentRef === undefined) {
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
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  @HostListener('click')
  onClick(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined as any;
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== undefined) {
      this.componentRef.instance.tooltip = this.appTooltip;
      const { left, right, top, bottom, width, height } = this.elementRef.nativeElement.getBoundingClientRect();
      

      if (this.position === 'above') {
        this.componentRef.instance.left = left;
        this.componentRef.instance.top = top - 50;
      } else if (this.position === 'left') {
        this.componentRef.instance.top = top;
        console.log(this.componentRef)
        this.componentRef.instance.left = left - 250;
        this.componentRef.instance.width = 150;
      } else {
        this.componentRef.instance.left = left;
        this.componentRef.instance.top = top + 40;
      }
      
      setTimeout(() => {
        const paragraphs = document.querySelectorAll('.tooltip-text');
        const els = document.querySelectorAll('.app-tooltip-container');
        if (paragraphs.length > 0 && els.length > 0) {//sét cứng chỉ có header
          if (paragraphs[0].getBoundingClientRect().top < 150) {
            els.forEach((x: any) => {
              // console.log(x);
              
              x.style.height = '30px'
            })
            if (!!this.componentRef) {
              setTimeout(() => {
                // console.log(this.router.url);
                
                if (paragraphs[0].getBoundingClientRect().height > els[0].getBoundingClientRect().height) {
                  if(!!this.router.url.includes('attendance')){
                    if(!!this.router.url.includes('/cms/attendance/business/time-import')){
                      this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 95)
                      return
                    }  else if (!!this.router.url.includes('/cms/attendance/business/timesheetsummary') || !!this.router.url.includes('/cms/attendance/list/swipedata')){
                      this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 75)
                      return
                    } else if(!!this.router.url.includes('/cms/attendance/business/shiftsort')){
                      this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 75)
                      return
                    }
                    
                  }
                  if(!!this.router.url.includes('approve')){
                    this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 100)

                    return
                  }
                  if(!!this.router.url.includes('insurance')){
                    if(!!this.router.url.includes('cms/insurance/business/ins-arising')){
                        this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 150)
                      return
                    }
                  }
                  if(!!this.router.url.includes('user')){
                    if(!!this.router.url.includes('cms/system/user')){
                        this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 60)
                      return
                    }
                  }
                  if(!!this.router.url.includes('cms/profile/business/dynamic-report')){
                    this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 60)
                      return
                  }
                  this.componentRef.instance.left = this.componentRef.instance.left - (window.innerWidth - (paragraphs[0].getBoundingClientRect().width + paragraphs[0].getBoundingClientRect().x) + 40)
                }
              }, 10)

            }
          }
        }
      })
    }
  }

}
