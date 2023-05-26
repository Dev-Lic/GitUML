import { Component,OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js';
import { teisInvoices } from 'src/app/Modules/teisInvoices.module';
import { TEISService } from 'src/app/Services/teis.service';
Chart.register(...registerables);

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit{
  chartData!:teisInvoices[];
  labelData:any[]=[];
  colorData:any[]=[];
  realData:any[]=[]

  constructor(private api:TEISService){}
  ngOnInit(): void {
    this.api.getTEIS().
    subscribe(x=>{
      this.chartData=x;
      console.log(this.chartData)
      if(this.chartData!=null){
        // console.log(this.chartData)
        for (let index = 0; index < this.chartData.length; index++) {
          // console.log(this.chartData[index])
          // console.log(this.labelData[index],this.colorData[index],this.realData[index])
          this.labelData.push(this.chartData[index].Month+"-"+this.chartData[index].Year);
          console.log(this.chartData[index].Billing_Dept)
          this.realData.push(this.chartData[index].Charged_Amount);
          console.log(this.chartData[index].Charged_Amount)
          // this.colorData.push(this.chartData[index].colorCode);
          // console.log(this.labelData[index],this.colorData[index],this.realData[index])
        }
        this.renderChart(this.labelData,this.realData,this.colorData,'pie','piechart');
        this.renderChart(this.labelData,this.realData,this.colorData,'bar','barchart');
        // this.renderChart(this.labelData,this.realData,this.colorData,'doughnut','doughnutchart');
        // this.renderChart(this.labelData,this.realData,this.colorData,'polarArea','pochart');
        // this.renderChart(this.labelData,this.realData,this.colorData,'radar','rochart');


      }}
      )


    // this.renderChart(this.labelData,this.realData,this.colorData,'bar','barchart');
    // this.renderChart(this.labelData,this.realData,this.colorData,'pie','piechart');

  }

  renderChart(labelData:any,mainData:any,colorData:any,type:any,id:any){
    // new Chart("piechart", {
    new Chart(id, {
      // type: 'bar',
      type: type,
      data: {
        // labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        labels: labelData,
        datasets: [{
          label: '# Sales (10.000 DH)',
          // data: [12, 19, 3, 5, 2, 3],
          data: mainData,
          borderWidth: 2,
          backgroundColor: [
            "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",
            'rgba(255, 255, 0, 0.7)',
          ],
          // backgroundColor: colorData,
          borderColor: [
            "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",
            'rgba(255, 255, 0, 1)',
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
