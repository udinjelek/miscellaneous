import { Component, OnInit , inject, ViewChild } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { CodeWithLineNumbersComponent } from '../../shared/template/code-with-line-numbers/code-with-line-numbers.component';
import { TestService } from '../../shared/services/test.service';
import { HttpClientModule, HttpClientXsrfModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexResponsive,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-test-sat-nusapersada',
  standalone: true,
  imports: [  CommonModule,
              TestComponent,
              CodeWithLineNumbersComponent,
              HttpClientModule,
              HttpClientXsrfModule ,
              NgApexchartsModule,
            ],
  templateUrl: './test-sat-nusapersada.component.html',
  styleUrls: ['./test-sat-nusapersada.component.scss'],
  providers: [TestService]
})
export class TestSatNusapersadaComponent implements OnInit{
  @ViewChild('chart') chart!: ChartComponent;


  result_queryCountPoCerInPr:any[]=[]
  result_queryBreakdownCountPoCerInPr:any[]=[]
  result_queryPr:any[]=[]
  result_queryPo:any[]=[]
  result_queryCer:any[]=[]
  result_queryPoLine:any[]=[]
  result_queryCerLine:any[]=[]
  result_queryPoPoLine:any[]=[]
  result_queryCerCerLine:any[]=[]
  result_queryCompareTally:any[]=[]
  result_queryCompareItemPoCerSame:any[]=[]

  result_querySummaryTotalPr:number=0
  result_querySummaryTotalPo:number=0
  result_querySummaryTotalCer:number =0

  result_queryTotalTally:any[]=[]
  
  isSidebarHide:boolean = false

  po_cer_match_sequence_product: number = 0
  po_cer_match_quantity_po: number = 0
  po_cer_match_quantity_cer: number = 0

  po_cer_not_match_sequence_product: number = 0
  po_cer_not_match_quantity_po: number = 0
  po_cer_not_match_quantity_cer: number = 0

  po_only_sequence_product: number = 0
  po_only_quantity_po: number = 0
  po_only_quantity_cer: number = 0
  
  cer_only_sequence_product: number = 0
  cer_only_quantity_po: number = 0
  cer_only_quantity_cer: number = 0

  soal:any={no1A:false,no1B:false,no1C:false, dashboard:false }
  
  sql_wordColorMapping:any={
      red: ['important', 'urgent'],
      blue: ['select', 'from', 'left join', 'group by'],
      colorNo1: ['pr','table_pr', 'total_pr'],
      colorNo2: ['po','table_po', 'total_po', 'po_sum'],
      colorNo2A: ['pol','table_po_line'],
      colorNo3: ['cer','table_cer', 'total_cer', 'cer_sum'],
      colorNo3A: ['cerl','table_cer_line'],
      green:['--'],
  }

  Workingloc: ChartOptions3 = {
    series: [10,10,30,40],
    chart: {
      type: "donut"
    },
    labels: ["CER Only", "PO CER Match", "PO CER Not Match", "PO Only"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 350
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  constructor(
    private testService :TestService
  ){}
  

  ngOnInit(): void {
    this.loadData()
    this.setActiveSoal('no1A')
  }

  loadData(){
    this.testService.loadAnswer().subscribe({
      next: (response) => {
        this.result_queryCountPoCerInPr = response.data.data_json_queryCountPoCerInPr
        this.result_queryBreakdownCountPoCerInPr = response.data.data_json_queryBreakdownCountPoCerInPr
        this.result_queryPr = response.data.data_json_queryPr
        this.result_queryPo = response.data.data_json_queryPo
        this.result_queryCer = response.data.data_json_queryCer
        this.result_queryCompareTally = response.data.data_json_queryCompareTally
        this.result_queryPoLine = response.data.data_json_queryPoLine
        this.result_queryCerLine = response.data.data_json_queryCerLine
        this.result_queryPoPoLine = response.data.data_json_queryPoPoLine
        this.result_queryCerCerLine = response.data.data_json_queryCerCerLine
        this.result_queryCompareItemPoCerSame = response.data.data_json_queryCompareItemPoCerSame
        
        this.result_querySummaryTotalPr = response.data.data_json_querySummaryTotalPr
        this.result_querySummaryTotalPo = response.data.data_json_querySummaryTotalPo
        this.result_querySummaryTotalCer = response.data.data_json_querySummaryTotalCer
        this.result_queryTotalTally = response.data.data_json_queryTotalTally
        this.calculate_summary()
        console.log(this.result_queryCompareItemPoCerSame)
        this.Workingloc.series = [  this.cer_only_sequence_product,
                                    this.po_cer_match_sequence_product,
                                    this.po_cer_not_match_sequence_product,
                                    this.po_only_sequence_product,
                                 ];
      },
      error: (err) => {
   
      }
    });
  }

  setActiveSoal(choice:string){
    this.soal['no1A'] = false
    this.soal['no1B'] = false
    this.soal['no1C'] = false
    this.soal['dashboard'] = false

    this.soal[choice] = true
  }

  toogleSidebarHide(){
    this.isSidebarHide = !this.isSidebarHide
  }

  calculate_summary(){
    this.po_cer_match_sequence_product = 0
    this.po_cer_match_quantity_po = 0
    this.po_cer_match_quantity_cer = 0

    this.po_cer_not_match_sequence_product = 0
    this.po_cer_not_match_quantity_po = 0
    this.po_cer_not_match_quantity_cer = 0

    this.po_only_sequence_product = 0
    this.po_only_quantity_po = 0
    this.po_only_quantity_cer = 0
    
    this.cer_only_sequence_product = 0
    this.cer_only_quantity_po = 0
    this.cer_only_quantity_cer = 0

    this.result_queryCompareItemPoCerSame.forEach(row=>{
          if (row.remark === "both PO and CER exist" && row.result === "Qty Match") {
            this.po_cer_match_sequence_product++;
            this.po_cer_match_quantity_po += row.po_line_quantity;
            this.po_cer_match_quantity_cer += row.cer_line_quantity;
            row.type = 'po_cer_match';
          }

          if (row.remark === "both PO and CER exist" && row.result === "Qty Mismatch") {
            this.po_cer_not_match_sequence_product++;
            this.po_cer_not_match_quantity_po += row.po_line_quantity;
            this.po_cer_not_match_quantity_cer += row.cer_line_quantity;
            row.type = 'po_cer_not_match';
          }

          if (row.remark === "only PO line exist" ) {
            this.po_only_sequence_product++;
            this.po_only_quantity_po += row.po_line_quantity;
            row.type = 'po_only';
          }

          if (row.remark === "only CER line exist" ) {
            this.cer_only_sequence_product++;
            this.cer_only_quantity_cer += row.cer_line_quantity;
            row.type = 'cer_only';
          }
    });
  }
  queryBreakdownCountPoCerInPr = `
    select 
        pr.code pr_code,
        count(distinct po.id) total_po,
        count(distinct cer.id) total_cer
    from 
        table_pr pr
    left join 
        table_po po on pr.id = po.pr_id
    left join 
        table_cer cer on pr.id = cer.pr_id
    group by 
        pr.code;
  `;

  queryCountPoCerInPr = `
    select 
        count(distinct po.id) total_po,
        count(distinct cer.id) total_cer
    from 
        table_pr pr
    left join 
        table_po po on pr.id = po.pr_id
    left join 
        table_cer cer on pr.id = cer.pr_id;
  `;

  queryCompareTally =`
  select 	
      pr.id, 
      pr.code pr_code , 
      po_sum.po_quantity, 
      cer_sum.cer_quantity,
      case
          when ifnull(po_sum.po_quantity, 0) = ifnull(cer_sum.cer_quantity, 0)
          then 'Total Qty Match'
          else 'Total Qty Mismatch'
      end result
  from table_pr pr
  left join
  (
      select po.pr_id , sum(pol.quantity ) as po_quantity
      from table_po po
      left join table_po_line pol
      on po.id = pol.po_id 
      group by po.pr_id
  ) po_sum
  on po_sum.pr_id = pr.id
  left join
  (
      select cer.pr_id , sum(cerl.quantity ) as cer_quantity
      from table_cer cer
      left join table_cer_line cerl
      on cer.id = cerl.cer_id 
      group by cer.pr_id
  ) cer_sum
  on cer_sum.pr_id = pr.id;
        `

queryCompareItemPoCerSame =`
select 
  pr.code pr_code,
  po.code po_code,
  cer.code cer_code,
  pol.sequence line_sequence,
  pol.product_id line_product_id,
  pol.quantity po_line_quantity,
  cerl.quantity cer_line_quantity,
  case
    when ifnull(pol.quantity, 0) = ifnull(cerl.quantity, 0)
    then 'Qty Match'
    else 'Qty Mismatch'
  end result,
  'both PO and CER exist' remark
from table_pr pr
left join table_po po on pr.id = po.pr_id
left join table_cer cer on pr.id = cer.pr_id
left join table_po_line pol on po.id = pol.po_id
left join table_cer_line cerl on cer.id = cerl.cer_id
where pol.product_id = cerl.product_id 
and pol.sequence = cerl.sequence
-- kita union dengan query yg lain
union
-- query untuk check dimana sequence & product_id ada di PO tapi tidak ada di CER
select
  pr.code pr_code,
  po.code po_code,
  cer.code cer_code,
  pol.sequence line_sequence,
  pol.product_id line_product_id,
  pol.quantity po_line_quantity,
  cerl.quantity cer_line_quantity,
  'Qty Mismatch' result,
  'only PO line exist' remark
from table_pr pr
left join table_po po on pr.id = po.pr_id
left join table_cer cer on pr.id = cer.pr_id
left join table_po_line pol on po.id = pol.po_id
left join table_cer_line cerl on cer.id = cerl.cer_id 
and pol.product_id = cerl.product_id 
and pol.sequence = cerl.sequence
where cerl.quantity is null 
and cerl.sequence is null 
and pol.quantity is not null
and pol.sequence is not null
-- kita union dengan query yg lain
union
-- query untuk check dimana sequence & product_id ada di CER tapi tidak ada di PO
select
  pr.code pr_code,
  po.code po_code,
  cer.code cer_code,
  cerl.sequence line_sequence,
  cerl.product_id line_product_id,
  pol.quantity po_line_quantity,
  cerl.quantity cer_line_quantity,
  'Qty Mismatch' result,
  'only CER line exist' remark
from table_pr pr
left join table_po po on pr.id = po.pr_id
left join table_cer cer on pr.id = cer.pr_id
left join table_cer_line cerl on cer.id = cerl.cer_id 
left join table_po_line pol on po.id = pol.po_id
and pol.product_id = cerl.product_id 
and pol.sequence = cerl.sequence
where cerl.quantity is not null 
and cerl.sequence is not null 
and pol.quantity is null
and pol.sequence is null;
        `

}
