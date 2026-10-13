import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {  ICategoryInfo } from '../../../models/IFileResponse.model';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-information-wiith-image',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './information-wiith-image.component.html',
  styleUrl: './information-wiith-image.component.scss',
})
export class InformationWiithImageComponent {
  @Input('dataSource') dataSourcePayload!: ICategoryInfo;
  @Input() infoWithImg: string | undefined;
  imageTilte = 'image title name';
  imageDescription =
    'image description for decribe image and image impotance, image description for decribe image and image impotance.image description for decribe image and image impotance, image description for decribe image and image impotance.image description for decribe image and image impotance, image description for decribe image and image impotance.image description for decribe image and image impotance, image description for decribe image and image impotance.';
  @Output('editButtonEvent') editButtonMethod = new EventEmitter<any>();
  @Output("deleteButtonEvent") deleteButtonMethod= new EventEmitter<ICategoryInfo>();

  editButton(dataSourcePayload:ICategoryInfo) {

    this.editButtonMethod.emit(dataSourcePayload);
  }

  deleteButton(dataSourcePayload:ICategoryInfo) {
    this.deleteButtonMethod.emit(dataSourcePayload);
  }
}
