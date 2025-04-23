import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmerLayoutComponent } from './admin-farmer-layout.component';

describe('AdminFarmerLayoutComponent', () => {
  let component: AdminFarmerLayoutComponent;
  let fixture: ComponentFixture<AdminFarmerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFarmerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFarmerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
