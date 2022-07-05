# Modal

The Modal Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

The embedded component and service expose an interface for rendering a modal overlay and content window. This component also implements keybord trapping and focus management to meet accessibility requirements.

Note that styling options are limited, and will need to be customized in your CSS files to meet the needs of your implementation.

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


Component usage:
	
	import { Component, AfterViewInit, ViewChild, TemplateRef  } from '@angular/core';
	import { ModalData, ModalService } from "ems-web-app-modal";
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements AfterViewInit {
		@ViewChild("modalTest") modalTemplate!: TemplateRef<any>;
		public title: string = "modal title";
		constructor(private modal: ModalService) {}
		showModal() {
			const data = new ModalData();
			data.template = this.modalTemplate;
			data.cancel = this.closeModal;
			this.modal.setCurrentModal(data);
		}
		closeModal = () => {
			this.modal.setCurrentModal(null);
		}
	}


Example modal configuration in template:

	<modal 	[transition-speed]="250" [z-index]="99" background="rgba(255,255,0,0.25)"></modal>
	

	<div class="control-buttons">
		<button (click)="showModal()" [ngStyle]="{'z-index': 10000, position: 'relative'}">Show Modal</button>
	</div>
	<div class="content-panel modal-blur">
		<p>Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
	</div>

	<modal 	[transition-speed]="250" [z-index]="99" background="rgba(255,255,0,0.25)"></modal>

	<ng-template #modalTest>
		<p>#1: Hello from the modal template {{ title }}</p>
		<div class="buttons">
			<button class="button" (click)="closeModal()">Close</button>
		</div>
	</ng-template>




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
