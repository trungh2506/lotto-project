import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lotto',
  templateUrl: './lotto.component.html',
  styleUrls: ['./lotto.component.css'],
})
export class LottoComponent {
  isPlaying: boolean = false; // kiểm tra đang rao lô tô hay chưa
  audioDuration: any = 0;
  audio: HTMLAudioElement = new Audio();
  numberInput: any;
  numbers: number[][] = []; //Số hiển thị trên html

  lotto_numbers: number[][] = []; //Số dò

  is_lotto_numbers: number[][] = []; // số đã quay

  displayNum: any = 0; // số hiển thị kết quả = randomNum
  randomNum: any = 0; //Số vừa quay
  constructor(private router: Router) {}

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

  async randomInLottoNumbers() {
    this.isPlaying = true;
    if (this.lotto_numbers.length == 0) {
      alert('Đã rao hết số!');
      return;
    }
    while (this.lotto_numbers.length > 0 && this.is_lotto_numbers.length < 90) {
      const randomRow = Math.floor(Math.random() * this.lotto_numbers.length);
      const randomCol = Math.floor(
        Math.random() * this.lotto_numbers[randomRow].length,
      );

      this.randomNum = this.lotto_numbers[randomRow][randomCol];
      await this.voiceLotto(this.randomNum);
      this.displayNum = this.randomNum;
      // sau khi rao xong thì sẽ hiển thị số lên màn hình

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
    }
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
    if (confirm('Bạn có muốn hô lại từ đầu ?')) {
      this.is_lotto_numbers = [];
      this.lotto_numbers = this.generateNumbersArray();
      this.randomNum = 0;
      localStorage.removeItem('lotto_numbers');
    }
  }

  //Pause hô lô tô
  pauseLotto() {
    this.isPlaying = false;
    this.audio.pause();
    alert('Đã dừng!');
  }

  resumeLotto() {
    this.isPlaying = true;
    this.audio.play();
  }

  // hô lô tô
  async voiceLotto(number: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.audio.src = `../../assets/lotto-audio/raoloto${number}.webm`;

      // Xác định độ dài của audio và sau đó phát âm thanh
      this.audio.onloadedmetadata = () => {
        this.audioDuration = this.audio.duration;

        // Làm tròn số
        this.audioDuration = Math.ceil(this.audioDuration);
        this.audio.play();

        // Khi phát âm thanh kết thúc, resolve promise
        this.audio.onended = () => {
          resolve();
        };
      };

      // Xử lý lỗi nếu có
      this.audio.onerror = (error) => {
        reject(error);
      };
    });
  }

  //lấy ra số đã ro trước đó
  previousNumber(): any {
    let previousNumber =
      this.is_lotto_numbers[this.is_lotto_numbers.length - 2];
    if (!previousNumber) {
      return 0;
    } else {
      return previousNumber;
    }
  }
}
