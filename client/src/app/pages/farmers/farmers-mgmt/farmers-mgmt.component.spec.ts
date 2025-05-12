import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersMgmtComponent } from './farmers-mgmt.component';

describe('FarmersMgmtComponent', () => {
  let component: FarmersMgmtComponent;
  let fixture: ComponentFixture<FarmersMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmersMgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmersMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
