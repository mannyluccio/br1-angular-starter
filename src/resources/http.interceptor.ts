import {Injectable, SecurityContext} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import * as _ from 'lodash';
import {DomSanitizer} from "@angular/platform-browser";
import {concatMap, delay, retryWhen} from "rxjs/internal/operators";

const environment = require("../../env");

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    constructor(private _sanitizer: DomSanitizer) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clonedReq : any = req;
        if (!req.url.includes(".json")) {
            clonedReq = {
                url: `${environment.origin}/${req.url}`
            };
        }


        let token = localStorage.getItem('token');
        if (token) {
            clonedReq.setHeaders = {'x-access-token': token}
        }

        let escapeHtml = (unsafe) => {
            return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        };

        let checkType = (currentVal) => {
            if (_.isObject(currentVal)) {
                _.forOwn(currentVal, (value, key) => {
                    if (_.isString(value)) {
                        currentVal[key] = this._sanitizer.sanitize(SecurityContext.HTML, escapeHtml(value));
                    } else {
                        checkType(value);
                    }
                });
            } else if (_.isArray(currentVal)) {
                _.each(currentVal, (value, index) => {
                    if (_.isString(value)) {
                        currentVal[index] = this._sanitizer.sanitize(SecurityContext.HTML, escapeHtml(value));
                    } else {
                        checkType(value);
                    }
                })
            }
        };

        if (req.method === 'POST' || req.method === 'PUT') {
            clonedReq.body = req.body;
            checkType(clonedReq.body);
        }


        if (req.method === 'DELETE') {
            clonedReq.responseType = 'text';
        }

        const apiReq = req.clone(clonedReq);
        return next.handle(apiReq)
            .pipe(
                retryWhen(errors => errors
                    .pipe(
                        concatMap((error, count) => {
                            if (count < 5 && error.status == 502) {
                                return Observable.of(error.status);
                            }

                            return throwError(error);
                        }),
                        delay(1000)
                    )
                )
            )
            .catch(event => {
                if (event instanceof HttpErrorResponse) {
                    const response = event as HttpErrorResponse;
                    if (response.headers.get('content-type') === 'application/json; charset=utf-8') {
                        let error = new HttpErrorResponse({
                            error: _.isObject(response.error) ? response.error : JSON.parse(response.error),
                            headers: response.headers,
                            status: response.status,
                            statusText: response.statusText,
                            url: response.url,
                        });
                        return throwError(error);
                    }
                }
                return throwError(event);
            });
    }
}
