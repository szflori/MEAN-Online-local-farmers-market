import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmerHeaderComponent } from './admin-farmer-header.component';

describe('AdminFarmerHeaderComponent', () => {
  let component: AdminFarmerHeaderComponent;
  let fixture: ComponentFixture<AdminFarmerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFarmerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFarmerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
