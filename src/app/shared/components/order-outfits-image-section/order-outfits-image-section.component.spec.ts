import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOutfitsImageSectionComponent } from './order-outfits-image-section.component';

describe('OrderOutfitsImageSectionComponent', () => {
  let component: OrderOutfitsImageSectionComponent;
  let fixture: ComponentFixture<OrderOutfitsImageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderOutfitsImageSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOutfitsImageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
