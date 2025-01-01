import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCommentCardComponent } from './one-comment-card.component';

describe('OneCommentCardComponent', () => {
  let component: OneCommentCardComponent;
  let fixture: ComponentFixture<OneCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneCommentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
