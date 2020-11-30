import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private sampleUser = [{
    username: 'me',
    password: 'me'
  }];
  constructor(
    private http: HttpClient,
    private route: Router,
    private auth: AuthService
  ) { }

  login(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().append('data', user);

    if(this.sampleUser.find(x => x.password == user.password && x.password == user.password) !== undefined){
      console.log('works');
      this.auth.setUser(user);
      this.route.navigate(['stock-picks']);
    } else {
      console.log('no user match');
    }

    // this.http.get('http://sample.url/getStocks' ,{ headers,  params} ).pipe(retry(3), catchError(this.handleError)).subscribe(x => {
    //   return x;
    // });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
