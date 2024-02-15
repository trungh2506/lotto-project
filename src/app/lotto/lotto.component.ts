import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-lotto',
  templateUrl: './lotto.component.html',
  styleUrls: ['./lotto.component.css'],
})
export class LottoComponent {
  numberInput: any;
  numbers: number[][] = []; //Số hiển thị trên html

  lotto_numbers: number[][] = []; //Số dò

  is_lotto_numbers: number[][] = []; // số đã quay

  randomNum: any = 0; //Số vừa quay
  constructor(
    private router: Router,
    private speechService: SpeechService,
  ) {}

  ngOnInit(): void {
    this.numbers = this.generateNumbersArray();
    this.lotto_numbers = this.generateNumbersArray();
  }

  generateNumbersArray(): number[][] {
    const numbersArray: number[][] = [];
    let count = 1;
    for (let i = 0; i < 10; i++) {
      const row: number[] = [];
      for (let j = 0; j < 9; j++) {
        row.push(count++);
      }
      numbersArray.push(row);
    }
    return numbersArray;
  }

  randomInLottoNumbers() {
    if (this.lotto_numbers.length == 0) {
      alert('Đã rao hết số!');
    }
    const randomRow = Math.floor(Math.random() * this.lotto_numbers.length);
    const randomCol = Math.floor(
      Math.random() * this.lotto_numbers[randomRow].length,
    );

    this.randomNum = this.lotto_numbers[randomRow][randomCol];

    // Xóa phần tử đã chọn khỏi hàng được chọn
    this.lotto_numbers[randomRow].splice(randomCol, 1);

    // Nếu bạn muốn xóa cả hàng nếu nó trở thành rỗng
    if (this.lotto_numbers[randomRow].length === 0) {
      this.lotto_numbers.splice(randomRow, 1);
    }

    // Thêm số đã chọn vào mảng is_lotto_numbers
    this.is_lotto_numbers.push(this.randomNum);

    //Lưu is lotto numbers vào localStorage
    localStorage.setItem(
      'lotto_numbers',
      JSON.stringify(this.is_lotto_numbers),
    );
    this.speakText(this.randomNum);
  }

  isInLottoNumbers(number: any) {
    if (this.is_lotto_numbers.indexOf(number) !== -1) {
      return true;
    } else return false;
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
      return;
    }

    if (this.isInLottoNumbers(number)) {
      alert(`Có số ${number}!`);
    } else {
      alert(`Chưa có!`);
    }
  }

  reset() {
    if (confirm('Bạn có muốn reset ?')) {
      this.is_lotto_numbers = [];
      this.lotto_numbers = this.generateNumbersArray();
      this.randomNum = 0;
      localStorage.removeItem('lotto_numbers');
    }
  }

  speakText(number: string) {
    this.speechService.speak(number);
  }
}
