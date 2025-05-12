import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerShowComponent } from './farmer-show.component';

describe('FarmerShowComponent', () => {
  let component: FarmerShowComponent;
  let fixture: ComponentFixture<FarmerShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
