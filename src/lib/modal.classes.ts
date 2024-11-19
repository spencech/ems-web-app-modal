import { TemplateRef } from '@angular/core';

export class ModalData  {

	private _id!: string;
	private _preventClickToDismiss: boolean = false;
	private _initialized?: ((element: HTMLElement, data: ModalData) => void) | undefined;
	private _cancel!: () => void ; 
	private _template!: TemplateRef<any>;
	private _classes: string[] = [];
	
	constructor() {};

	set id(value: string) {
		this._id = value;
	}

	get id(): string {
		return this._id;
	}

	set initialized(value: ((element: HTMLElement, data: ModalData) => void) | undefined) {
		this._initialized = value;
	}

	get initialized(): ((element: HTMLElement, data: ModalData) => void) | undefined {
		return this._initialized;
	}

	set cancel(value: () => void) {
		this._cancel = value;
	}

	get cancel(): () => void {
		return this._cancel;
	}

	get preventClickToDismiss(): boolean {
		return this._preventClickToDismiss;
	}

	set preventClickToDismiss(value: boolean){
		this._preventClickToDismiss = value;
	}

	set template(value: TemplateRef<any>) {
		this._template = value;
	}

	get template(): TemplateRef<any> {
		return this._template;
	}

	get classes(): string[] {
		return this._classes;
	}

	set classes(value: string[]){
		this._classes = value;
	}


}
