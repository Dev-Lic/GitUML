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
  labelData1:any[]=[];
  colorData:any[]=[];
  realData:any[]=[]
  realData1:any[]=[]

  constructor(private api:TEISService){}
  ngOnInit(): void {
    this.api.getTEIS().
    subscribe(x=>{
      this.chartData=x;
      console.log(this.chartData)

      if (this.chartData != null) {
        for (let index = 0; index < this.chartData.length; index++) {
          const label = this.chartData[index].Fiscal_Month;
          const realData = this.chartData[index].Charge_Amount;

          // Check labelData if contains the label
          this.updateChartData(label, realData, this.labelData, this.realData);
        }

        const fiscalMonthComparator = (a: string, b: string): number => {
          const monthsInOrder = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

          const [aMonth, aYear] = a.split('-');
          const [bMonth, bYear] = b.split('-');

          // Compare years first
          if (aYear !== bYear) {
            return parseInt(aYear) - parseInt(bYear);
          }

          // Compare months
          return monthsInOrder.indexOf(aMonth) - monthsInOrder.indexOf(bMonth);
        };

        // Sort labelData using the fiscalMonthComparator
        this.labelData.sort(fiscalMonthComparator);
        console.log(this.labelData)
        const last12FiscalMonths = this.generateLast12FiscalMonths(this.labelData);
        console.log(last12FiscalMonths)
        this.assignChargedAmount(last12FiscalMonths);

        this.renderPieChart(this.labelData, this.realData, this.colorData, 'pie', 'piechart');
        this.renderChart(this.labelData1, this.realData1, this.colorData, 'bar', 'barchart');
      }
      }

    )

  }

  updateChartData(label: string, realData: number, labelData: string[], realDataArray: number[]): void {
    const labelIndex = labelData.indexOf(label);
    if (labelIndex === -1) {
      labelData.push(label);
      realDataArray.push(realData);
    } else {
      realDataArray[labelIndex] += realData;
    }
  }


  generateLast12FiscalMonths(labelData: string[]): string[] {
    const fiscalMonths: string[] = [];
    const lastMonth = labelData[labelData.length - 1];
    const monthsInOrder = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const [lastMonthValue, lastYearValue] = lastMonth.split('-');
    const lastMonthIndex = monthsInOrder.indexOf(lastMonthValue);

    let currentMonthIndex = lastMonthIndex;
    let currentYear = parseInt(lastYearValue);

    for (let i = 0; i < 12; i++) {
      fiscalMonths.unshift(monthsInOrder[currentMonthIndex] + '-' + currentYear);

      currentMonthIndex--;
      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
      }
    }

    return fiscalMonths;
  }


  assignChargedAmount(last12FiscalMonths: string[]): void {
    for (const fiscalMonth of last12FiscalMonths) {
      const index = this.labelData.indexOf(fiscalMonth);
      if (index !== -1) {
        const chargedAmount = this.chartData[index].Charge_Amount;
        this.labelData1.push(fiscalMonth);
        this.realData1.push(chargedAmount);
      } else {
        const chargedAmount = 0;
        this.labelData1.push(fiscalMonth);
        this.realData1.push(chargedAmount);
      }
    }
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
          label: '# TEIS Expense',
          // data: [12, 19, 3, 5, 2, 3],
          data: mainData,
          borderWidth: 2,
          order: 2,
          backgroundColor: "#3e95cd"
          ,
          // backgroundColor: colorData,
          borderColor: "#3e95cd"

        },{
          label: '# Telecom Expense',
          // data: [12, 19, 3, 5, 2, 3],
          data: mainData,
          borderWidth: 2,
          order: 2,
          backgroundColor: "#8e5ea2"
          ,
          // backgroundColor: colorData,
          borderColor: "#8e5ea2"

        },{
          label: '# Monthly Expense',
          // data: [12, 19, 3, 5, 2, 3],
          data: mainData,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          // backgroundColor: colorData,
          borderColor: 'rgba(255, 0, 0, 1)',
          tension: 0.4,
          type: 'line',
          order: 1,
          pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 15
        }]
      },
      options: {
        // plugins: {
        //   legend: {
        //     onClick: () => {} // Disable legend click
        //   }
        // },
        scales: {
          x:{
            stacked : true
          },
          y: {
            beginAtZero: true,
            stacked : true
          }
        }
      }
    });
  }

  renderPieChart(labelData:any,mainData:any,colorData:any,type:any,id:any){
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
          backgroundColor:  [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "rgba(255, 255, 0, 0.7)",
            "#4d8f3e",
            "#9e4f8a",
            "#7cba3f",
            "#b9c8e3",
            "#5063c4",
            "rgba(0, 255, 255, 0.7)"
          ],
          // backgroundColor: colorData,
          borderColor:  [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "rgba(255, 255, 0, 0.7)",
            "#4d8f3e",
            "#9e4f8a",
            "#7cba3f",
            "#b9c8e3",
            "#5063c4",
            "rgba(0, 255, 255, 0.7)"
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
