import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameOutfitsSectionComponent } from './same-outfits-section.component';

describe('SameOutfitsSectionComponent', () => {
  let component: SameOutfitsSectionComponent;
  let fixture: ComponentFixture<SameOutfitsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SameOutfitsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SameOutfitsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
