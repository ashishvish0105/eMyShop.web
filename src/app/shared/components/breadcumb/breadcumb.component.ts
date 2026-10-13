import {
  Component,
  OnInit,
  Injectable,
  Inject,
  inject,
  Input,
  AfterContentInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-breadcumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcumb.component.html',
  styleUrl: './breadcumb.component.scss',
})
export class BreadcumbComponent implements OnInit {
  @Input() CurrentPathTitle: string = 'Default title name';
  @Input("class") className!:string;
  @Input()breadcumbType:"traditional" |"withoutTitle" | "morden" ="traditional";
  // const routerer = @Inject("Router");
  urlList: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.routerPathSet();
      }
    });
  }

  ngOnInit(): void {
    this.routerPathSet();
  }

  routerPathSet() {
    this.urlList = this.router.url.split('/').filter((res: any) => {
      if (res != '') {
        return res;
      }
    });
  }

  breadCumbMethod(item: String) {
    let GetNavName: string[] = [];
    this.urlList.forEach((navName) => {
      if (item.toString() == navName.toString()) {
        this.router.navigate(['/', ...GetNavName, navName]);
      } else {
        GetNavName.push(navName);
      }
    });
  }
}
