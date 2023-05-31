import { Component,OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js';
import { Subscription } from 'rxjs';
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
  labelDataPie:any[]=[];
  labelDataPie_Charge_Type:any[]=[];
  labelDataPie_Charge_Type_Description:any[]=[];


  colorData:any[]=[];
  realData:any[]=[]
  realData1:any[]=[]
  realDataPie:any[]=[]
  realDataPie_Charge_Type:any[]=[]
  realDataPie_Charge_Type_Description:any[]=[]

  constructor(private api:TEISService){
    this.selectedOption="_Charged_Org"
  }

  private eventSubscription!: Subscription;
  ngOnInit(): void {
    this.api.getTEIS().
    subscribe(x=>{
      this.chartData=x;
      console.log(this.chartData)

      if (this.chartData != null) {
        this.processChartData();
        this.handleSelectedOption()

      }}
    )
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  // Function to process chart data
  processChartData(): void {
    for (let index = 0; index < this.chartData.length; index++) {
      const label = this.chartData[index].Fiscal_Month;
      const realData = this.chartData[index].Charge_Amount;

      const labelPie_Charged_Org = this.chartData[index].Charged_Org;
      const labelPie_Charge_Type = this.chartData[index].Charge_Type;
      const labelPie_Charge_Type_Description = this.chartData[index].Charge_Type_Description;
      // console.log(":"+label+":")

      // Check labelData if it contains the label
      this.updateChartData(label.replace(/\s+/g, ' ').trim(), realData, this.labelData, this.realData);
      this.updateChartData(labelPie_Charged_Org,realData,this.labelDataPie,this.realDataPie)

      this.updateChartData(labelPie_Charge_Type,realData,this.labelDataPie_Charge_Type,this.realDataPie_Charge_Type)
      this.updateChartData(labelPie_Charge_Type_Description,realData,this.labelDataPie_Charge_Type_Description,this.realDataPie_Charge_Type_Description)
    }
    console.log("0-")
    console.log(this.labelData);
    console.log(this.realData);
    console.log(this.labelDataPie);
    console.log(this.realDataPie);
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
    console.log("1-")
    console.log(this.labelData);
    console.log(this.realData);
    const last12FiscalMonths = this.generateLast12FiscalMonths(this.labelData);  //only generate month problem with charge amt not updated
    console.log("2-")
    console.log(last12FiscalMonths);

    console.log("3-")
    this.assignChargedAmount(last12FiscalMonths);
    console.log(this.labelData1)
    console.log(this.realData1)

    this.renderChart(this.labelData1, this.realData1, this.colorData, 'bar', 'barchart');
  }

  selectedOption!: string;
  handleSelectedOption(): void {
    switch (this.selectedOption) {
      case '_Charged_Org':
        this.renderPieChart(this.labelDataPie, this.realDataPie, this.colorData, 'pie', 'piechart');
        break;
      case '_Charge_Type':
        this.renderPieChart(this.labelDataPie_Charge_Type, this.realDataPie, this.colorData, 'pie', 'piechart');
        break;
      case '_Charge_Type_Description':
        this.renderPieChart(this.labelDataPie_Charge_Type_Description, this.realDataPie, this.colorData, 'pie', 'piechart');
        break;
      default:
        break;
    }
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
        const realData = this.realData[index];
        this.updateChartData(fiscalMonth, realData, this.labelData1, this.realData1);
      } else {
        const chargedAmount = 0;
        this.updateChartData(fiscalMonth, chargedAmount, this.labelData1, this.realData1);
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
          label: '# Charged_Org',
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
