import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsDetailsComponent } from './outfits-details.component';

describe('OutfitsDetailsComponent', () => {
  let component: OutfitsDetailsComponent;
  let fixture: ComponentFixture<OutfitsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
