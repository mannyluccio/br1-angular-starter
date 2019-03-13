import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs-compat';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor() {}

    addMessage(type:string, message: string) {
        this.subject.next({ type: type, message: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}