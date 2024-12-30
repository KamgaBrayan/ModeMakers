import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreOutfitsComponent } from './explore-outfits.component';

describe('ExploreOutfitsComponent', () => {
  let component: ExploreOutfitsComponent;
  let fixture: ComponentFixture<ExploreOutfitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreOutfitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreOutfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
