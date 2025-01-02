import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSlideComponent } from './product-slide.component';

describe('ProductSlideComponent', () => {
  let component: ProductSlideComponent;
  let fixture: ComponentFixture<ProductSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
