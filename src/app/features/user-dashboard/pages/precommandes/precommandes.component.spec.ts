import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecommandesComponent } from './precommandes.component';

describe('PrecommandesComponent', () => {
  let component: PrecommandesComponent;
  let fixture: ComponentFixture<PrecommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
