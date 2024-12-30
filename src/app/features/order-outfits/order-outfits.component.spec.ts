import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOutfitsComponent } from './order-outfits.component';

describe('OrderOutfitsComponent', () => {
  let component: OrderOutfitsComponent;
  let fixture: ComponentFixture<OrderOutfitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderOutfitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOutfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
