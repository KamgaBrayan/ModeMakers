import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentSpecialComponent} from './garment-special.component';

describe('ProductDetailComponent', () => {
  let component: GarmentSpecialComponent;
  let fixture: ComponentFixture<GarmentSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarmentSpecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
