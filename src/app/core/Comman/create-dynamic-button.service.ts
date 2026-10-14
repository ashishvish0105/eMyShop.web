import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDynamicButtonService {
  public selectedFiles: SelectedFiles[] = [];

  constructor() {}

  // async inputFileUploadBtn(evetn: Event) {
  //   let imgBase64PathVariable: HTMLInputElement | undefined;

  //   evetn.preventDefault();
  //   let button = document.createElement('input');
  //   button.setAttribute('type', 'file');
  //   button.addEventListener('change', (event: any) => {
  //      ;
  //     if (event.target != null) {
  //       imgBase64PathVariable = await event.target.value;
  //       console.log(imgBase64PathVariable);
  //     }
  //   });
  //   button.click();
  //   console.log(imgBase64PathVariable);

  //   return imgBase64PathVariable;
  // }

  async inputFileUploadBtn(event: Event): Promise<any | undefined> {
    event.preventDefault();

    return new Promise((resolve, reject) => {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');

      fileInput.addEventListener('change', async (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (target && target.files && target.files[0]) {
          const file = target.files[0];
          resolve(target);

          // const reader = new FileReader();

          // reader.onload = () => {
          //   const base64String = reader.result as string;
          //   console.log(base64String);
          //   resolve(base64String);
          // };

          // reader.onerror = (error) => {
          //   console.error('File reading error:', error);
          //   reject(error);
          // };

          // reader.readAsDataURL(file);
        } else {
          resolve(undefined);
        }
      });

      fileInput.click();
    });
  }

  createFileUploadBtn(evetn: Event) {
    let imgBase64PathVariable: HTMLInputElement | undefined;

    evetn.preventDefault();
    let button = document.createElement('input');
    button.setAttribute('type', 'file');
    button.setAttribute('src', "'data:image/jpg;base64,' + imagePath");
    button.addEventListener('change', (event: Event) => {
      return event.target as HTMLInputElement;
    });
    button.click();

    return imgBase64PathVariable;
  }

  public toFilesBase64(
    files: File[],
    selectedFiles: SelectedFiles[]
  ): Observable<SelectedFiles[]> {
    const result = new AsyncSubject<SelectedFiles[]>();
    if (files?.length) {
      Object.keys(files)?.forEach(async (file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(
            (f) => f?.name != files[i]?.name
          );
          selectedFiles.push({
            name: files[i]?.name,
            file: files[i],
            base64: reader?.result as string,
          });
          result.next(selectedFiles);
          if (files?.length === i + 1) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }
}

export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}
