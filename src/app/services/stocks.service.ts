import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { ErrorHandler, Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { stockPick } from '../models/stock-pick';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private stockPicks: Array<stockPick>; 

  constructor(
    private http: HttpClient
  ) { 
    this.stockPicks = [];
  }


  //to remove
  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  } 
  //end of to remove

  getStockPicks(){ 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' ,'http://localhost:3000');
    // headers.append('Access-Control-Allow-Methods' ,'GET,PUT,POST,DELETE');
    // headers.append('Access-Control-Allow-Headers', 'true');
    // headers.append('Access-Control-Allow-Credentials', 'true');


    return this.http.get<stockPick[]>('http://localhost:3000/api/stocks', { headers }).pipe(retry(3));
  }

  insertStockPick(stock){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/stocks', { data: stock }, {headers}).pipe(retry(3));
  }

  editStockPick(stock){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/api/stocks', { data: stock }, {headers}).pipe(retry(3));
  }
  

  sampleGet(stock){ 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().append('param', 'value');

    // this.http.get('http://sample.url/getStocks' ,{ headers,  params} ).pipe(retry(3), catchError(this.handleError)).subscribe(x => {
    //   return x;
    // });
    
  }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
}
