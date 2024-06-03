import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkkd-u_gWenfirMz188F9goaHPCpT5uhA';

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
            catchError(
                err => {
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
            )
        );
    }

}