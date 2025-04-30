import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMgmtComponent } from './orders-mgmt.component';

describe('OrdersMgmtComponent', () => {
  let component: OrdersMgmtComponent;
  let fixture: ComponentFixture<OrdersMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersMgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
