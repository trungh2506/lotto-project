import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lotto-tickets',
  templateUrl: './lotto-tickets.component.html',
  styleUrls: ['./lotto-tickets.component.css'],
})
export class LottoTicketsComponent implements OnInit {
  numberInput: any = 0;
  selectedTicket!: any;
  selectedNumber!: any;
  ticket_data: any[][] = [];
  winning_numbers: any[] = [];
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
  onSelectedTicket(value: any) {
    this.selectedTicket = value;
    this.readTicketData(value);
  }
  readTicketData(value: any) {
    return this.http
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
      this.reset();
    }
  }

  addWinningNumber(number: any) {
    const index = this.winning_numbers.indexOf(number);
    if (!this.winning_numbers) {
      this.winning_numbers = [];
    }
    if (index !== -1) {
      this.winning_numbers.splice(index, 1);
    } else this.winning_numbers.push(number);
    this.isVictory(number);
  }

  isInWinningNumbers(number: any) {
    const index = this.winning_numbers.indexOf(number);
    //nếu tồn tại
    if (index !== -1) {
      return true;
    } else return false;
  }

  reset() {
    this.selectedTicket = null;
    this.ticket_data = [];
    this.winning_numbers = [];
  }

  isVictory(number: any) {
    let count_number = 0;
    let row = -1;
    let col = -1;

    //Duyệt qua mảng 2 chiều để tìm vị trí
    for (let i = 0; i < this.ticket_data.length; i++) {
      for (let j = 0; j < this.ticket_data[i].length; j++) {
        if (this.ticket_data[i][j] === number) {
          row = i;
          col = j;
          break;
        }
      }
      // Nếu đã tìm thấy giá trị thì dừng vòng lặp ngoài
      if (row !== -1 && col !== -1) {
        break;
      }
    }

    // console.log(`Giá trị ${number} được tìm thấy tại vị trí (${row}, ${col})`);

    //Duyệt để kiểm tra điều kiện thắng
    for (let i = 0; i < this.ticket_data[row].length; i++) {
      if (this.isInWinningNumbers(this.ticket_data[row][i])) {
        count_number++;
      }
    }
    if (count_number === 5) {
      alert('Chúc mừng bạn đã KINH!');
    }
  }

  findNumber() {
    this.numberInput = prompt('Nhập số cần dò trong phiếu');
    let number = parseInt(this.numberInput);
    let isFound = false;

    if (!isNaN(number)) {
      if (number < 0 || number > 90) {
        alert('Nhập số lớn hơn 0 hoặc nhỏ hơn 90!');
      } else {
      }
    } else {
      alert('Vui lòng nhập một số hợp lệ!');
    }

    for (let array of this.ticket_data) {
      for (let numberInArray of array) {
        if (number === numberInArray) {
          const index = this.winning_numbers.indexOf(number);
          if (index === -1) {
            this.winning_numbers.push(number);
            isFound = true;
          }
        }
      }
    }
  }
}
