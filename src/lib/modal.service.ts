import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { ModalData } from "./modal.classes";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private currentModalSource:BehaviorSubject<ModalData|null|undefined> = new BehaviorSubject<ModalData|null|undefined>(undefined);
  public currentModal$ = this.currentModalSource.asObservable();

  private _modalQueue: ModalData[] = [];
  private _currentModal: ModalData | null | undefined;

  public setCurrentModal(value: ModalData | null) {

    if(value && this._currentModal) {
      this._modalQueue.push(this._currentModal);
    }

    if(!value && this._modalQueue.length) {
      value = this._modalQueue.pop() as ModalData;
    }

    this._currentModal = value;
    this.currentModalSource.next(value);
  }
}
