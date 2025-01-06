import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensurationsComponent } from './mensurations.component';
import { FormGroup } from '@angular/forms';

describe('MensurationsComponent', () => {
  let component: MensurationsComponent;
  let fixture: ComponentFixture<MensurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MensurationsComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
