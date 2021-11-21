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
				
				if (!errorRes.error.Error) {
					return throwError(errorMessage);
				}else {
					return throwError(errorRes.error);
				}
			})
			);
	}

signup(reqData:any) {
return this.http
  .post<AuthResponseData>(
    `${this.appUrl}/auth/register`,
    reqData
  ).pipe(
    catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error.Error) {
        return throwError(errorMessage);
      }else {
        return throwError(errorRes.error.Error);
      }
      
    })
  );
}
}