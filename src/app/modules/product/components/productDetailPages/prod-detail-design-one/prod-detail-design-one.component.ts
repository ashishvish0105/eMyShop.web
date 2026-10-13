import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-prod-detail-design-one',
  standalone: true,
  imports: [],
  templateUrl: './prod-detail-design-one.component.html',
  styleUrl: './prod-detail-design-one.component.scss',
  // refreshURL: 'https://codepen.io/anishjsofficial/embed/MWQXvVm/?theme-id=modal',
})
export class ProdDetailDesignOneComponent implements AfterViewInit {
//https://codepen.io/anishjsofficial/embed/MWQXvVm/?theme-id=modal

  ngAfterViewInit(): void {
    // const imgs = document.querySelectorAll('.img-select a');
    // const imgBtns = [...imgs];
    // let imgId = 1;

    // imgBtns.forEach((imgItem) => {
    //   imgItem.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     imgId = imgItem.dataset.id;
    //     slideImage();
    //   });
    // });

    // window.addEventListener('resize', slideImage);
  }

  slideImage() {
    // displayWidth = document.querySelector(
    //   '.img-showcase img:first-child'
    // ).clientWidth;

    // document.querySelector('.img-showcase').style.transform = `translateX(${
    //   -(imgId - 1) * displayWidth
    // }px)`;
  }

}
