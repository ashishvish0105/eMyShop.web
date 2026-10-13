import { Component } from '@angular/core';
import { SectionTitleWithbuttonsComponent } from '../../components/section-title-withbuttons/section-title-withbuttons.component';
import { SummaryCardComponent, summaryCardObjModel } from '../../components/summary-card/summary-card.component';
import { TitleWithItemComponent } from "../../components/title-with-item/title-with-item.component";
import { LineChartComponent } from "../../components/charts/line-chart/line-chart.component";
import {TableWithTitleComponent } from "../../components/table-with-title/table-with-title.component";
import { Button } from '../../components/emy-buttons/emy-buttons.component';
import { ProgressBarComponent } from "../../components/progress-bar/proress-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SectionTitleWithbuttonsComponent, SummaryCardComponent, TitleWithItemComponent, LineChartComponent, TableWithTitleComponent, ProgressBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  buttons: Button[] = [
      {
        buttonType: 'primary',
        label: 'last 30 days',
        buttonIcon: 'calendar_today',
        isActive: true,
        cssClass:'eMy-primary'
      },
      {
        buttonType: 'secondary',
        label: 'Export Report',
        buttonIcon: 'file_download',
        cssClass:'eMy-secondary',
        isActive: true,
      }
    ];

tableColumnNamas = [
  { header: 'Order ID', field: 'orderId', type: 'text' },
  { header: 'Customer', field: 'customer', type: 'customer' },
  { header: 'Date', field: 'date', type: 'text' },
  { header: 'Total', field: 'total', type: 'currency' },
  { header: 'Status', field: 'status', type: 'status' }
];

orders: Order[] = [
  {
    orderId: '#ORD-7241',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    date: 'Oct 24, 2023',
    total: 249.5,
    status: 'Processing'
  }
];

  summaryCards: summaryCardObjModel[] = [
    {
      title: 'Total Sales',
      value: 128430,
      currencyType: 'USD',
      valueTrand: 'up',
      perstageWiseTrand: 12.5,
      iconName: 'payments',
      iconBgColorCode: '#ooddcc',
    },
    {
      title: 'Average Order Value',
      value: 84.2,
      currencyType: 'USD',
      valueTrand: 'up',
      perstageWiseTrand: 3.2,
      iconName: 'shopping_cart',
      iconBgColorCode: '#d5e0f833',
    },
    {
      title: 'Conversion Rate',
      value: 3.85,
      currencyType: 'USD',
      valueTrand: 'down',
      perstageWiseTrand: 0.8,
      iconName: 'track_changes',
      iconBgColorCode: '#ffdbcd4d',
    },
    {
      title: 'Active Sessions',
      value: 1429,
      currencyType: 'USD',
      valueTrand: 'up',
      perstageWiseTrand: 24,
      iconName: 'bolt',
      iconBgColorCode: '#e1e2ed',
    },
  ];
}



// export interface Customer {
//   initials: string;
//   name: string;
//   email: string;
// }

export interface Order {
  orderId: string;
  name: string;
  email: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
