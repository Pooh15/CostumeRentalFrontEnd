import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";


interface ResponseData {
	Success: [
	"Successfully Added."
	]
}

@Injectable({
	providedIn: 'root'
})
export class InventoryformService {
private appUrl = 'http://localhost:5000';  // URL to web api
constructor(private http: HttpClient) { }

createInventory(inventoryObj: any){
	let headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		
	return this.http
	.post<ResponseData>(
		`${this.appUrl}/category/abc`,
		inventoryObj
		)
	.pipe(
		catchError(errorRes => {
			let errorMessage = 'An unknown error occurred!';

			return throwError(errorRes.error);
		})
		);
}
}