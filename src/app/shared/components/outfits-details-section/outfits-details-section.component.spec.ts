import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsDetailsSectionComponent } from './outfits-details-section.component';

describe('OutfitsDetailsSectionComponent', () => {
  let component: OutfitsDetailsSectionComponent;
  let fixture: ComponentFixture<OutfitsDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitsDetailsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitsDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
