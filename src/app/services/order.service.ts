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

	getWishList(arr: any): Observable<any[]>{
		return this.http.get<any[]>(`${this.appUrl}/inventory/getWishList/${arr}`)
		.pipe(
			map( response => {
				return response[0];
			}),catchError(this.handleError('getWishList', []))
			);//end pipe
	} 

	
	checkout(itemCntObj:{"item_id": number, "count": number}[]) {
		const url = `${this.appUrl}/user/placeOrder`;
		let user_id = sessionStorage.getItem('user_id');

		let checkOutObj = {
			"user_id": user_id,
			"items": itemCntObj
		}
        return this.http.post<any>(url, checkOutObj)
        .pipe(map( response => {  
        	console.log(response)
            return response; 
        }), catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error) {
            	return throwError(errorMessage);
            }else {
            	return throwError(errorRes.error);
            }
        }) );
	}
}
