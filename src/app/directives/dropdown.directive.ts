import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') dropdownClicked(eventData: Event){
    if(this.elementRef.nativeElement.classList.contains('open')){
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }
    else {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    }
  }

  // The below code worked for Max but not for me. Check why
  // @HostBinding('class.open') isOpen = false;

  // @HostBinding('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  //   console.log('test');
  // }

}
