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

	createInventory(inventoryObj: any) {
		return this.http
			.post<ResponseData>(
				`${this.appUrl}/inventory/addItem`,
				inventoryObj
			)
			.pipe(
				catchError(errorRes => {
					let errorMessage = 'An unknown error occurred!';

					if (!errorRes.error) {
						return throwError(errorMessage);
					} else {
						return throwError(errorRes.error.message);
					}
				})
			);
	}

	createCategory(category: { "categoryName": string }) {
		return this.http
			.post<ResponseData>(
				`${this.appUrl}/category/create`, category)
			.pipe(map(response => {
				console.log(response);
				return response;
			}),
				catchError(errorRes => {
					let errorMessage = 'An unknown error occurred!';

					if (!errorRes.error) {
						return throwError(errorMessage);
					} else {
						return throwError(errorRes.error.message);
					}
				})
			);
	}

	addPattern(patternName: string, categoryId: number) {
		return this.http
			.post<ResponseData>(
				`${this.appUrl}/category/createPattern`,
				{ "patternName": patternName, "categoryId": categoryId })
			.pipe(map(response => {
				console.log(response);
				return response;
			}),
				catchError(errorRes => {
					let errorMessage = 'An unknown error occurred!';

					if (!errorRes.error) {
						return throwError(errorMessage);
					} else {
						return throwError(errorRes.error.message);
					}
				})
			);
	}

	returnOrder(order_id: number, item_id: number, actual_return_count: number) {

		return this.http
			.post<ResponseData>(
				`${this.appUrl}/inventory/postReturnOrder`,
				{ "order_id": order_id, "item_id": item_id, "actual_return_count": actual_return_count })
			.pipe(map((response) => {	
				return response;
			}),
				catchError(errorRes => {
					let errorMessage = 'An unknown error occurred!';					

					if (!errorRes.error) {
						return throwError(errorMessage);
					} else {
						return throwError(errorRes.error.message);
					}
				})
			);
	}

	removeLaundry(item_id: number,order_id: number)
	{
		return this.http
		.post<ResponseData>(
			`${this.appUrl}/inventory/postRemoveLaundry`,
			{ "item_id": item_id,"order_id": order_id })
		.pipe(map((response) => {	
			return response;
		}),
			catchError(errorRes => {
				let errorMessage = 'An unknown error occurred!';					

				if (!errorRes.error) {
					return throwError(errorMessage);
				} else {
					return throwError(errorRes.error.message);
				}
			})
		);
	}

	keywordSearch(key:string) {
		console.log(key);

		return this.http
			.post<ResponseData>(
				`${this.appUrl}/inventory/searchKeyword`,
				{ "key": key })
			.pipe(map((response) => {				
				console.log(response);
				return response;
			}),
				catchError(errorRes => {
					let errorMessage = 'An unknown error occurred!';					

					if (!errorRes.error) {
						return throwError(errorMessage);
					} else {
						return throwError(errorRes.error.message);
					}
				})
			);
	}

}
