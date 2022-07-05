# EMS Web Application Components: Modal

The Modal Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

The embedded component and service expose an interface for rendering a modal overlay and content window. This component also implements keybord trapping and focus management to meet accessibility requirements.

**Note that this component is typically used as a singleton**, defined once and rendered at the top-most component level.

Also note that styling options are limited, and will need to be customized in your CSS files to meet the needs of your implementation.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.


## Usage

Module Implementation

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';

	import { AppComponent } from './app.component';
	import { ModalModule, ModalService } from "ems-web-app-modal";

	@NgModule({
	  declarations: [
	    AppComponent
	  ],
	  imports: [
	    BrowserModule,
	    ModalModule
	  ],
	  providers: [ ModalService ],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }

Example placement of &lt;modal/&gt; node in DOM:

	<body app>
		<some-app-component class="modal-blur"></some-app-component>
		<some-other-component class="modal-blur"></some-other-component>
		<modal [transition-speed]="250" [z-index]="99" background="rgba(255,255,0,0.25)"></modal>
	</body>

Template attributes with defaults:

	"transition-speed": number = 1000; // speed of fade in / fade out
	"background": string = "rgba(255,255,255,0.25)"; //modal background
	"z-index": number = 10000;

Note the usage of the "modal-blur" class above. The Modal component adds a blur filter to any elements with this class. 

Example request to render modal from another component:
	
	import { Component, ViewChild, TemplateRef  } from '@angular/core';
	import { ModalData, ModalService } from "ems-web-app-modal";
	@Component({
	  selector: 'some-app-component',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class SomeAppComponent {
		@ViewChild("modalTest") modalTemplate!: TemplateRef<any>;
		public title: string = "modal title";
		constructor(private modal: ModalService) {}
		showModal() {
			const data = new ModalData();
			data.preventClickToDismiss = true; //defaults to false -- controls whether user can click outside of the modal context box to dismiss the view
			data.initialized = (element: HTMLElement, data: ModalData) => console.log(element); //optional callback after modal has been rendered
			data.template = this.modalTemplate;
			data.cancel = this.closeModal; //required invoked if user types ESC key or clicks outside content box to hide modal
			this.modal.setCurrentModal(data);
		}
		closeModal = () => {
			this.modal.setCurrentModal(null);
		}
	}


Example template for the calling component:

	<div class="control-buttons">
		<button (click)="showModal()" [ngStyle]="{'z-index': 10000, position: 'relative'}">Show Modal</button>
	</div>
	<div class="content-panel">
		<p>Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
	</div>
	<ng-template #modalTest>
		<p>#1: Hello from the modal template {{ title }}</p>
		<div class="buttons">
			<button class="button" (click)="closeModal()">Close</button>
		</div>
	</ng-template>

Note that modals can be "stacked"... if you call setCurrentModal multiple times. Each subsequent modal closure removes the most recently added modal from the stack.

## Code scaffolding

Run `ng generate component component-name --project Modal` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project Modal`.
> Note: Don't forget to add `--project Modal` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build Modal` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build Modal`, go to the dist folder `cd dist/modal` and run `npm publish`.

## Running unit tests

Run `ng test Modal` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
