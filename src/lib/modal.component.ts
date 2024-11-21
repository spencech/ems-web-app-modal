import { Component, Input, OnInit, AfterViewInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';
import { ModalData } from './modal.classes';
import { delay, trace, empty } from 'ems-web-app-utils';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit, AfterViewInit  {

  @HostBinding('class.render') render: boolean = false;
  @HostBinding('class.transparent') transparent: boolean = true;
  @HostBinding('attr.data-modal-id') currentModalId: string | null = null;

  @Input("transition-speed") speed: number = 250;
  @Input("background") background: string = "rgba(255,255,255,0.25)";
  @Input("z-index") zIndex: number = 9000;
  @Input("focus-target") focusTarget: string = "#modal-info";

  private static INTERACTIVES: string = `a, button, input, select, textarea, [role="button"]`;

  public data?:ModalData | null;
  public styles!: SafeHtml;

  private subscription: Subscription | null = null;
  private $siblings!: any;
  private launcher: Element | null = null;
  private viewInitialized: boolean = false;
  private timeout: number = 0;
  
  constructor(public app: ModalService, private sanitizer: DomSanitizer, private element: ElementRef) {};

  ngOnInit() {
    this.buildStyles();
    this.subscription = this.app.currentModal$.subscribe(modalData => {
      if(modalData === undefined) return;
      clearTimeout(this.timeout);
      if(modalData) this.renderModal(modalData) 
      else this.hideModal();
    });
  }

  ngAfterViewInit() {
    this.onInitialize();
  }

  @HostListener('click', ['$event.target'])
  onContainerClick = (contained: HTMLElement) => {
    if(!this.data || this.data.preventClickToDismiss || contained.nodeName.toLowerCase() !== "modal") return;
    this.data.cancel();
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if(event.key === "Escape" && this.data?.cancel) {
      this.data.cancel();
    }
  }

  private trap() {
    const children = Array.prototype.slice.call(this.element.nativeElement.parentElement.children);
    const siblings = children.filter((child: HTMLElement) => child !== this.element.nativeElement);
    let sibling = siblings.shift();
    
    while(sibling) {
      const interactives = Array.prototype.slice.call(sibling.querySelectorAll(ModalComponent.INTERACTIVES));
      interactives.forEach((element: HTMLElement) => {
        element.tabIndex = -1;
        element.classList.add("tab-disabled");
      });
      sibling.ariaHidden = "true";
      sibling = siblings.shift();
    }

  }

  private untrap() {
    const children = Array.prototype.slice.call(this.element.nativeElement.parentElement.children);
    const siblings = children.filter((child: HTMLElement) => child !== this.element.nativeElement);
    const disabled = Array.prototype.slice.call(document.querySelectorAll(".tab-disabled"));
    
    siblings.forEach((sibling: HTMLElement) => sibling.removeAttribute("aria-hidden"));

    disabled.forEach((element: HTMLElement) => {
      element.tabIndex = 0;
      element.classList.remove("tab-disabled");
    });
  }

  private renderModal(modalData: ModalData) {
    this.currentModalId = modalData.id;
    this.render = true;
    this.data = modalData;
    this.launcher = document.activeElement;
    this.trap();
    document.querySelector("body")!.classList.add("modalview");
    this.element.nativeElement.onkeyup = this.onKeyUp;


    this.timeout = window.setTimeout(() => {
      const info = this.element.nativeElement.querySelector(this.focusTarget);
      info.focus();
      this.transparent = false;
      this.onInitialize(); 
    });
  }

  private onInitialize() {
    if(!this.data?.initialized || this.viewInitialized) return;
    
    const element = this.element.nativeElement.querySelector(".modal-content");
    this.data.initialized(element, this.data);
    this.viewInitialized = true;
  }

  private hideModal() {

    this.transparent = true;
    this.viewInitialized = false;
    this.element.nativeElement.onkeyup = null;
    document.querySelector("body")!.classList.remove("modalview");
    this.untrap();
    
    if(this.launcher) (this.launcher as HTMLElement).focus();
    
    this.timeout = window.setTimeout(() => {
      this.render = false;
      this.data = null;
      this.currentModalId = null;
    }, this.speed);
  }

  private buildStyles() {

    const styles = `<style>
      modal {
        background: ${this.background};
        transition: opacity ${this.speed / 1000}s;
      }

      modal.transparent {
        transition: opacity ${this.speed / 1000}s;
      }

      modal.render {
        z-index: ${this.zIndex};
      }

      .modal-blur {
        transition: all ${this.speed / 1000}s;
      }

      .modalview .modal-blur {
        filter: blur(0.125rem);
        transition: all ${this.speed / 1000}s;
      }

    </style>`;

    this.styles = this.sanitizer.bypassSecurityTrustHtml(styles);
  }
}
