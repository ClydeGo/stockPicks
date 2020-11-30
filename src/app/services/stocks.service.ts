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
    const y = Math.round(Math.random() * 5);
    for(let x = 0; x <= y; x++){
      const stock: stockPick = { 
        id: this.guidGenerator(),
        code: 'TSLA',
        reason: 'just felt like it',
        win: 1,
        conviction: Math.round(Math.random() * 5)
      }
      console.log(stock, x);
      this.stockPicks.push(stock);
    } 
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
    headers.append('projectid', 'sampleid');

    // this.http.get('http://sample.url/getStocks', { headers }).subscribe(x => {
    //   console.log('test');
    // });
    console.log(this.stockPicks, 'server');
    return of(this.stockPicks);
  }

  insertStockPick(stock){
    let ret;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    // this.http.post('http://sample.url/insertStockPick', { data: stock }, {headers}).pipe(retry(3), catchError(this.handleError)).subscribe(x => {
    //   return of(x);
    // });
    this.stockPicks.push(stock);
    console.log(this.stockPicks, 'server');
    return true;
  }

  editStockPick(stock){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    // this.http.post('http://sample.url/editStockPick', { data: stock }, {headers}).subscribe(x => {
    //   return x;
    // });

    const i = this.stockPicks.findIndex(x => x.id === stock.id);
    this.stockPicks[i] = stock;
    console.log(this.stockPicks);
    return true;
  }
  

  sampleGet(stock){ 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().append('param', 'value');

    this.http.get('http://sample.url/getStocks' ,{ headers,  params} ).pipe(retry(3), catchError(this.handleError)).subscribe(x => {
      return x;
    });
    
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
