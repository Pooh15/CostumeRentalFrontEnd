import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

interface AuthResponseData {
	Success: [
	"User successfully registered."
	]
}

interface ResponseData {
  Success: [
    "Successfully created User Account."
  ]
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private appUrl = 'http://localhost:5000';  // URL to web api
	private handleError: HandleError;

	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
		this.handleError = httpErrorHandler.createHandleError('SellHistoryService') 
	}

	login(loginObj: {
		"username": string,
		"password": string
	}){
		return this.http
		.post<any>(
			`${this.appUrl}/auth/login`, loginObj)
		.pipe(
			catchError(errorRes => {
				let errorMessage = 'An unknown error occurred!';
				
				if (!errorRes.error) {
					return throwError(errorMessage);
				}else {
					return throwError(errorRes.error);
				}
			})
			);
	}

	signup(reqData:any) {
		const url = `${this.appUrl}/auth/register`;
        return this.http.post<ResponseData>(url, reqData)
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
