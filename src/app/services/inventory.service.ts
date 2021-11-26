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

getPattern(): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getPattern`)
		.pipe(
			map( response => {
				
				return response;
			}),catchError(this.handleError('getPattern', []))
			);//end pipe
		}

getColor(): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getColor`)
		.pipe(
			map( response => {
					
				return response;
			}),catchError(this.handleError('getColor', []))
			);//end pipe
		}

getSize(): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getSize`)
		.pipe(
			map( response => {
						
				return response;
			}),catchError(this.handleError('getSize', []))
			);//end pipe
		}

getCloth(): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getCloth`)
		.pipe(
			map( response => {
							
				return response;
			}),catchError(this.handleError('getCloth', []))
			);//end pipe
		}
getCategoryDetails(checkedCategory:any[]): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getCategoryDetails/${checkedCategory}`)
		.pipe(
			map( response => {
				
	
				return response;
			}),catchError(this.handleError('getCategoryDetails', []))
			);//end pipe
		}
getPatternDetails(checkedPattern:any[]): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getPatternDetails/${checkedPattern}`)
		.pipe(
			map( response => {					
		
				return response;
			}),catchError(this.handleError('getPatternDetails', []))
			);//end pipe
		}

getSizeDetails(checkedSize:any[]): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getSizeDetails/${checkedSize}`)
		.pipe(
			map( response => {					
		
				return response;
			}),catchError(this.handleError('getSizeDetails', []))
			);//end pipe
		}

getColorDetails(checkedColor:any[]): Observable<any[]>{

		return this.http.get<any[]>(`${this.appUrl}/category/getColorDetails/${checkedColor}`)
		.pipe(
			map( response => {					
				
				return response;
			}),catchError(this.handleError('getColorDetails', []))
			);//end pipe
		}

getClothDetails(checkedCloth:any[]): Observable<any[]>{

 		return this.http.get<any[]>(`${this.appUrl}/category/getClothDetails/${checkedCloth}`)
		.pipe(
			map( response => {					
		
				return response;
			}),catchError(this.handleError('getClothDetails', []))
			);//end pipe
		}

	}
