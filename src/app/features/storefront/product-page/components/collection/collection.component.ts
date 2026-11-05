import { Component } from '@angular/core';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent {
  collections = [
    {
      title: 'Men Collections',
      image: 'https://i.postimg.cc/m2KxLGxm/collection-1.jpg'
    },
    {
      title: 'Women Collections',
      image: 'https://i.postimg.cc/44t26Hjr/collection-2.jpg'
    },
    {
      title: 'Sports Collections',
      image: 'https://i.postimg.cc/15rWThm9/collection-3.jpg'
    }
  ];
}
