import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StocksService } from 'src/app/services/stocks.service';
import { stockPick } from '../../models/stock-pick';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-stock-input',
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.scss'],
})
export class StockInputComponent implements OnInit {

  stockPick: stockPick[] = [];
  formGroup = new FormGroup({});
  fields: Object;

  @Input() data: stockPick;
  @Input() type: string;

  constructor(
    private stockService: StocksService,
    private modal: ModalController
  ) { 
    
  }

  ngOnInit() {
    if(this.type == 'add') {
      this.fields = {
        id: {formgroup: new FormControl(this.guidGenerator(), [Validators.required])},
        code: {formgroup: new FormControl('', [Validators.required]), placeholder: 'code'},
        reason: {formgroup: new FormControl('', [Validators.required]), placeholder: 'reason'},
        win: {formgroup: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]), placeholder: 'status'},
        conviction: {formgroup: new FormControl('', [Validators.required,Validators.min(1), Validators.max(5)]), placeholder: 'conviction'},
      }
    } else {
      this.fields = {
        id: {formgroup: new FormControl(this.data.id, [Validators.required])},
        code: {formgroup: new FormControl(this.data.code, [Validators.required]), placeholder: 'code'},
        reason: {formgroup: new FormControl(this.data.reason, [Validators.required]), placeholder: 'reason'},
        win: {formgroup: new FormControl(this.data.win, [Validators.required, Validators.min(0), Validators.max(1)]), placeholder: 'status'},
        conviction: {formgroup: new FormControl(this.data.conviction, [Validators.required,Validators.min(1), Validators.max(5)]), placeholder: 'conviction'},
      }
    }
    
    Object.keys(this.fields).forEach(element => {
      this.formGroup.addControl(element, this.fields[element].formgroup);
    });
  }

  editStock(stock: stockPick){
    stock.conviction = 5;
    this.stockService.editStockPick(stock);
    this.dismiss();
  }

  submitStock(stock){
    this.stockService.insertStockPick(stock);
    this.dismiss();
  }

  dismiss() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  } 
}
