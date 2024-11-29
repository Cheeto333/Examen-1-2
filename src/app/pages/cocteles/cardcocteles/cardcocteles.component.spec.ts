import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCoctelesComponent } from './cardcocteles.component';

describe('CardcoctelesComponent', () => {
  let component: CardCoctelesComponent;
  let fixture: ComponentFixture<CardCoctelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCoctelesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCoctelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
