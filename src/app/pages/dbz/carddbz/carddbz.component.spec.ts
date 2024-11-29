import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddbzComponent } from './carddbz.component';

describe('CarddbzComponent', () => {
  let component: CarddbzComponent;
  let fixture: ComponentFixture<CarddbzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarddbzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarddbzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
