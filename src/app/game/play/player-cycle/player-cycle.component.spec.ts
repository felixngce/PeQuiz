import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCycleComponent } from './player-cycle.component';

describe('PlayerCycleComponent', () => {
  let component: PlayerCycleComponent;
  let fixture: ComponentFixture<PlayerCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
