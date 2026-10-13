import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-main-dashboard-section',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './main-dashboard-section.component.html',
  styleUrl: './main-dashboard-section.component.scss'
})
export class MainDashboardSectionComponent {

}
