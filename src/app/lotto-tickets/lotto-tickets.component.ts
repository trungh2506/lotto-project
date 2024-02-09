import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lotto-tickets',
  templateUrl: './lotto-tickets.component.html',
  styleUrls: ['./lotto-tickets.component.css'],
})
export class LottoTicketsComponent implements OnInit {
  selectedTicket!: any;
  ticket_data!: any[][];
  colors = [
    '#d5a6bd',
    '#dd7e6b',
    '#8e7cc3',
    '#f6b26b',
    '#f6b26b',
    '#93c47d',
    '#6d9eeb',
    '#00ff00',
    '#d5a6bd',
    '#dd7e6b',
    '#8e7cc3',
    '#f6b26b',
    '#f6b26b',
    '#93c47d',
    '#6d9eeb',
    '#00ff00',
  ];
  tickets: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.createTicketInfo();
  }
  getColorTicket() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
  onSelectedTicket(value: any) {
    this.selectedTicket = value;
    this.readTicketData(value);
  }
  readTicketData(value: any) {
    this.http
      .get(`assets/loto-tickets-data/${value}.txt`, {
        responseType: 'text' as 'json',
      })
      .subscribe((data: any) => {
        this.ticket_data = this.parseTextToArray(data);
      });
  }
  parseTextToArray(text: string): number[][] {
    // Loại bỏ dấu ngoặc vuông từ nội dung văn bản
    text = text.replace(/\[|\]/g, '');
    // Tiếp tục chuyển đổi nội dung văn bản thành mảng 2 chiều như trước
    const lines = text.split('\n');
    const dataArray: number[][] = [];
    lines.forEach((line) => {
      const numbers = line.split(',').map((num) => parseInt(num.trim()));
      dataArray.push(numbers);
    });
    return dataArray;
  }

  createTicketInfo() {
    for (let i = 1; i <= 16; i++) {
      this.tickets.push({
        ticket_id: i,
        ticket_name: `Phiếu số ${i}`,
        ticket_color: this.colors[i - 1],
      });
    }
  }

  backToSelectTicket() {
    if (confirm('Bạn có muốn đổi phiếu khác?')) {
      this.selectedTicket = null;
      this.ticket_data = [];
    }
  }
}
