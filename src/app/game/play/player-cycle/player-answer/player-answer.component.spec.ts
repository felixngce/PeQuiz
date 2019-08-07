import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAnswerComponent } from './player-answer.component';

describe('PlayerAnswerComponent', () => {
  let component: PlayerAnswerComponent;
  let fixture: ComponentFixture<PlayerAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
