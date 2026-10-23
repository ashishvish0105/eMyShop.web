import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../../shared/components/section-title/section-title.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { CreateDynamicButtonService } from '../../../../core/Comman/create-dynamic-button.service';

@Component({
  selector: 'app-detail-convert',
  standalone: true,
  imports: [SectionTitleComponent, ButtonComponent],
  templateUrl: './detail-convert.component.html',
  styleUrl: './detail-convert.component.scss'
})
export class DetailConvertComponent {
  public constructor(private createDynamicButtonService:CreateDynamicButtonService){

  }

  async getSplitPDF(event:any){
   let imgBase64PathVariable =await this.createDynamicButtonService.inputFileUploadBtn(event).then((x:HTMLInputElement)=>  {
    //
    console.log(x.value)
   })


    console.log(imgBase64PathVariable);
  }
}
