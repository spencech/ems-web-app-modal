# Modal

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

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

## Usage

Example Modal Configuration

	<modal 	[transition-speed]="250" [z-index]="99" background="rgba(255,255,0,0.25)"></modal>
	
Component Usage:
	
	import { Component, AfterViewInit, ViewChild, TemplateRef  } from '@angular/core';
	import { ModalData, ModalService } from "Modal";
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


Note that the loader type defaults to Loader.Spinner. If you want to use the ellipsis loader, you must call the load method at least once (as pictured above.) Subsequent show/hide calls will preserve this configuration