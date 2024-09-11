import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule, HttpClientXsrfModule  } from '@angular/common/http';
import { TestService } from '../../shared/services/test.service';
@Component({
  selector: 'app-front',
  standalone: true,
  imports: [  CommonModule,
              HttpClientModule,
              HttpClientXsrfModule ,
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss',
  providers:[TestService,],
})
export class FrontComponent implements OnInit {
  previewImage: string | ArrayBuffer | null | undefined= null;
  dataList:any[]=[];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.testService.loadListImage('test').subscribe({
      next: (response)=>{
          if (response){
            this.dataList = response.data;
          }
      },
      error:(error)=>{

      }
    });
  }

  onImageUpload(event:any){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.previewImage = e.target?.result;
      reader.readAsDataURL(file);

      this.testService.uploadImage(file).subscribe({
        next: (response) => {
          if (response.filename ){
            this.addImageArr(response.filename, response.pathfile, response.url);
          }
          console.log('Image uploaded successfully:', response);

        },
        error: (error) => {
          console.error('Image upload failed:', error);

        }
      });
    }
  }

  selectImage(i:number){
    let selectedData = this.dataList[i]
    this.previewImage = selectedData.url
  }

  deleteImage(i:number){
    let selectedData = this.dataList[i]
    console.log(selectedData)
    let pathImage = selectedData.pathfile
    
    this.testService.deleteImage(pathImage).subscribe({
      next: (response) => {
        if (response.status ){
          if (response.status == 'success'){
            this.dataList = this.dataList.filter(item => item.pathfile !== pathImage);
          }
        }
        console.log('Image uploaded successfully:', response);

      },
      error: (error) => {
        console.error('Image upload failed:', error);

      }
    });
  }

  addImageArr(newFilename:string, newPathfile:string, newUrl:string){
    this.dataList.push({filename:newFilename, pathfile:newPathfile, url:newUrl})
  }
}
