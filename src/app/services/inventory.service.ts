import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


@Injectable({
	providedIn: 'root'
})
export class InventoryService {
private appUrl = 'http://localhost:5000';  // URL to web api
private handleError: HandleError;

constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
	this.handleError = httpErrorHandler.createHandleError('SellHistoryService') 
}

getItems(): Observable<any[]>{

	return this.http.get<any[]>(`${this.appUrl}/inventory/getDetails`)
	.pipe(
		map( response => {
			
			return response;
		}),catchError(this.handleError('getItems', []))
		);//end pipe
	}

getCategory(): Observable<any[]>{

	return this.http.get<any[]>(`${this.appUrl}/category/getCategory`)
	.pipe(
		map( response => {
			

			return response;
		}),catchError(this.handleError('getCategory', []))
		);//end pipe
	}
}