import { Component, OnInit } from '@angular/core';
import { api } from '../../../services/api';
import { SalesReportService } from '../../services/sales-report.service';

@Component({
  selector: 'app-sales-report',
  standalone: false,
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss',
})
export class SalesReportComponent implements OnInit {
  chartData: { name: string; value: number }[] = [];
  constructor(private salesReportService: SalesReportService) {}

  async ngOnInit() {
    const data = await this.salesReportService.getList();

    this.chartData = data.map((entry: any) => {
      const { year, month } = entry._id;
      const label = `${year}.${month.toString().padStart(2, '0')}`;
      return { name: label, value: entry.totalSales };
    });
  }
}
