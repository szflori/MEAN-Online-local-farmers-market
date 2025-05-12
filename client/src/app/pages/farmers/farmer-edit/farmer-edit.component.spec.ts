import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerEditComponent } from './farmer-edit.component';

describe('FarmerEditComponent', () => {
  let component: FarmerEditComponent;
  let fixture: ComponentFixture<FarmerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
