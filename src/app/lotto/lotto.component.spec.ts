import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoComponent } from './lotto.component';

describe('LottoComponent', () => {
  let component: LottoComponent;
  let fixture: ComponentFixture<LottoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LottoComponent]
    });
    fixture = TestBed.createComponent(LottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
