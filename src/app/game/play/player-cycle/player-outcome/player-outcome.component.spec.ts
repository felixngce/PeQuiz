import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOutcomeComponent } from './player-outcome.component';

describe('PlayerOutcomeComponent', () => {
  let component: PlayerOutcomeComponent;
  let fixture: ComponentFixture<PlayerOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
