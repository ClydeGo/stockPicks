import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { __makeTemplateObject } from 'tslib';
import { StockInputComponent } from '../components/stock-input/stock-input.component';
import { stockPick } from '../models/stock-pick';
import { StocksService } from '../services/stocks.service';
import * as HighCharts from 'highcharts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-stock-picks',
  templateUrl: './stock-picks.page.html',
  styleUrls: ['./stock-picks.page.scss'],
})
export class StockPicksPage implements OnInit {

  stockPick: stockPick[] = [];
  formGroup = new FormGroup({});
  fields: Object;

  constructor(
    private fb: FormBuilder,
    private stockService: StocksService,
    private cd: ChangeDetectorRef,
    private modal: ModalController
  ) { 
    
  }

  ngOnInit() {
    this.getStocks();
  }

  async editStock(stock: stockPick){
    const modal = await this.modal.create({
      component: StockInputComponent,
      componentProps: {
        'data': stock,
        'type': 'edit',
      }
    });

    await modal.present();

    return await modal.onWillDismiss().then(x => {
      console.log('editted');
      this.plotStockChart();
    });
  }

  async submitStock(){
    const modal = await this.modal.create({
      component: StockInputComponent,
      componentProps: {
        'data': undefined,
        'type': 'add',
      }
    });
   
    await modal.present();

    return await modal.onWillDismiss().then(x => {
      console.log('added');
      this.plotStockChart();
    });
  }

  getStocks(){
    this.stockService.getStockPicks().subscribe(x => {
      this.stockPick = x;
      this.cd.detectChanges();
      this.plotStockChart();
    });

  
    console.log(this.stockPick.filter(x => x.conviction == 1).length);
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: StockInputComponent,
    });
    return await modal.present();
  }

  plotStockChart() {

    let series = [];
    for(let i = 1; i <= 5; i++){
      let temp = {name: i, type: undefined, data: []};
      temp.data.push(this.stockPick.filter(x => x.conviction == i && x.win == 1 ).length);
      temp.data.push(this.stockPick.filter(x => x.conviction == i && x.win == 0 ).length);
      series.push(temp);
    }
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Stock Picks'
      },
      xAxis: {
        title: {
          text: 'conviction'
        },
        allowDecimals: false,
        categories: ['wins', 'losses']
      },
      yAxis: {
        title: {
          text: 'wins'
        },
        allowDecimals: false,
      },
      series: series,
      // series: [
      //   {
      //     name: 1,
      //     type: undefined,
      //     data: [5, 4]
      //   },
      //   {
      //     name: 2,
      //     type: undefined,
      //     data: [1, 3]
      //   },
      //   {
      //     name: 3,
      //     type: undefined,
      //     data: [2, 2]
      //   },
      //   {
      //     name: '4',
      //     type: undefined,
      //     data: [3, 0]
      //   },
      //   {
      //     name: '5',
      //     type: undefined,
      //     data: [8, 1]
      //   },
      // ],
      credits: {
        enabled: false
      },
    });
  }
}
