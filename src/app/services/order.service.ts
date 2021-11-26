import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private appUrl = 'http://localhost:5000';  // URL to web api
	private handleError: HandleError;
	role: string= "";

	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
		this.handleError = httpErrorHandler.createHandleError('OrderService');
	}

	getOrders(): Observable<any[]>{
		let userId = sessionStorage.getItem('user_id');
		return this.http.get<any[]>(`${this.appUrl}/user/orderDetails/${userId}`)
		.pipe(
			map( response => {
				return response[0];
			}),catchError(this.handleError('getOrders', []))
			);//end pipe
	}

}
