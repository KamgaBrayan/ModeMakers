import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewSectionComponent } from './image-view-section.component';

describe('ImageViewSectionComponent', () => {
  let component: ImageViewSectionComponent;
  let fixture: ComponentFixture<ImageViewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
