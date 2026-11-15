import {
  Component,
  OnInit,
  Injectable,
  Inject,
  inject,
  Input,
  AfterContentInit,
  AfterViewInit,
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
export class BreadcumbComponent implements OnInit,AfterViewInit {
  @Input() CurrentPathTitle: string = 'Default title name';
  @Input("class") className!:string;
  @Input({required:false})breadcumbType:"traditional" |"withoutTitle" | "morden" | "mordenWithoutTitle" = "morden";
  // const routerer = @Inject("Router");
  urlList: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.routerPathSet();
      }
    });
  }
  ngAfterViewInit(): void {
    //  this.routerPathSet();
     console.log( this.breadcumbType)
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

  // breadCumbMethod(item: String) {
  //   let GetNavName: string[] = [];
  //   this.urlList.forEach((navName) => {
  //     if (item.toString() == navName.toString()) {
  //       this.router.navigate(['/', ...GetNavName, navName]);
  //     } else {
  //       GetNavName.push(navName);
  //     }
  //   });
  // }

    breadCumbMethod(item: string, index: number): void {
    if (index === this.urlList.length - 1) {
      return;
    }

    const routeSegments = this.router.url
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .filter(Boolean);

    const targetRoute = routeSegments.slice(0, index + 1);

    this.router.navigate(['/', ...targetRoute]);
  }

}
