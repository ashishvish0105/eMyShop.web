import { CurrencyPipe, JsonPipe} from '@angular/common';
import { AfterViewInit, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent implements AfterViewInit{
  @Input() SummaryTitle: string = 'Total Sales';
  @Input() SummaryValue: number = 15000;
  @Input() currencyType: string = 'USD';
  @Input() perstageWiseTrand: number = 5;
  @Input() iconName: string = 'payments';
  @Input() iconBgColorCode: string = '#000000';

  valueTrand: 'up' | 'down' = 'up';


  constValueTrand = {
    ValueTrandUp: 'up',
    ValueTrandEqual: 'equal',
    ValueTrandDown: 'down'
  };


  ngAfterViewInit(): void {

    // how to number is postive or negative to according trand
    // this.perstageWiseTrand
  }

}

export const constValueTrand = {
    ValueTrandUp: 'up',
    ValueTrandEqual: 'equal',
    ValueTrandDown: 'down'
};


export interface summaryCardObjModel {
  title: string;
  value: number;
  currencyType: string;
  valueTrand: string;
  perstageWiseTrand: number;
  iconName: string;
  iconBgColorCode: string;
}
