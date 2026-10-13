import { Component } from '@angular/core';
import { AdvertisementSliderComponent } from '../components/advertisement-slider/advertisement-slider.component';
import { BreadcumbComponent } from "../../../../shared/components/breadcumb/breadcumb.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconWithSectionTitleComponent } from "../../../../shared/components/icon-with-section-title/icon-with-section-title.component";
import { InputGroupComponent } from "../../../../shared/components/input-group/input-group.component";
import { OuterBoxStyleComponent } from "../../../../shared/components/outer-box-style/outer-box-style.component";
import { PageNotFoundComponent } from "../../../../shared/components/page-not-found/page-not-found.component";
import { SectionLayoutComponent } from "../../../../shared/components/section-layout/section-layout.component";
import { SectionTitleComponent } from "../../../../shared/components/section-title/section-title.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { LineChartComponent } from "../../../components/charts/line-chart/line-chart.component";
import { EmyButtonsComponent } from "../../../components/emy-buttons/emy-buttons.component";
import { ProgressBarComponent } from "../../../components/progress-bar/proress-bar.component";
import { SectionTitleWithbuttonsComponent } from "../../../components/section-title-withbuttons/section-title-withbuttons.component";
import { SummaryCardComponent } from "../../../components/summary-card/summary-card.component";
import { TableWithTitleComponent } from "../../../components/table-with-title/table-with-title.component";
import { TitleWithItemComponent } from "../../../components/title-with-item/title-with-item.component";

@Component({
  selector: 'app-layout-one',
  standalone: true,
  imports: [AdvertisementSliderComponent, OuterBoxStyleComponent, BreadcumbComponent, ButtonComponent, IconWithSectionTitleComponent, InputGroupComponent, OuterBoxStyleComponent, PageNotFoundComponent, SectionLayoutComponent, SectionTitleComponent, TableComponent, LineChartComponent, EmyButtonsComponent, ProgressBarComponent, SectionTitleWithbuttonsComponent, SummaryCardComponent, TableWithTitleComponent, TitleWithItemComponent],
  templateUrl: './layout-one.component.html',
  styleUrl: './layout-one.component.scss'
})
export class LayoutOneComponent {
  dataSources = {
      title: 'convert pdf to image',
      description: 'you convert any type document into pdf',
    }
}
