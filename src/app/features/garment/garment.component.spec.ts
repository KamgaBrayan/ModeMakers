import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentComponent} from './garment.component';

describe('ProductDetailComponent', () => {
  let component: GarmentComponent;
  let fixture: ComponentFixture<GarmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
