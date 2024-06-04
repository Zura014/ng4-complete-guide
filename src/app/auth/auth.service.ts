import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean,
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkkd-u_gWenfirMz188F9goaHPCpT5uhA';
    LOGIN_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkkd-u_gWenfirMz188F9goaHPCpT5uhA';

    constructor(private http: HttpClient) { }

    signup(email: string, password: string): Observable<Object> {
        return this.http.post<AuthResponseData>(
            this.SIGNUP_URL,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError)
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.LOGIN_URL, { 
            email: email,
            password: password,
            returnSecureToken: true,

        })
        .pipe(
            catchError(this.handleError)
        );;
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if(!err.error || !err.error.error) {
            return throwError(errorMessage);
        }
        switch(err.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
        }
        return throwError(errorMessage);
    }

}