import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lotto-project';
  constructor(private router: Router) {}

  confirmNavigation() {
    if (confirm('Bạn có chắc chắn muốn rời khỏi trang này?')) {
      // Chuyển đến trang đích nếu người dùng đồng ý
      this.router.navigateByUrl('/home');
    }
  }
}
