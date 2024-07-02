import { Component, OnInit , inject} from '@angular/core';
import { TestComponent } from '../test/test.component';
import { CodeWithLineNumbersComponent } from '../../shared/template/code-with-line-numbers/code-with-line-numbers.component';
import { TestService } from '../../shared/services/test.service';
import { HttpClientModule, HttpClientXsrfModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
@Component({
  selector: 'app-test-sat-nusapersada',
  standalone: true,
  imports: [  CommonModule,
              TestComponent,
              CodeWithLineNumbersComponent,
              HttpClientModule,
              HttpClientXsrfModule ,
            ],
  templateUrl: './test-sat-nusapersada.component.html',
  styleUrls: ['./test-sat-nusapersada.component.scss'],
  providers: [TestService]
})
export class TestSatNusapersadaComponent implements OnInit{
  result_queryCountPoCerInPr:any[]=[]
  result_queryBreakdownCountPoCerInPr:any[]=[]
  result_queryPr:any[]=[]
  result_queryPo:any[]=[]
  result_queryCer:any[]=[]
  constructor(
    private testService :TestService
  ){}
  

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.testService.loadAnswer().subscribe({
      next: (response) => {
        this.result_queryCountPoCerInPr = response.data.data_json_queryCountPoCerInPr
        this.result_queryBreakdownCountPoCerInPr = response.data.data_json_queryBreakdownCountPoCerInPr
        this.result_queryPr = response.data.data_json_queryPr
        this.result_queryPo = response.data.data_json_queryPo
        this.result_queryCer = response.data.data_json_queryCer
      },
      error: (err) => {
   
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

}
