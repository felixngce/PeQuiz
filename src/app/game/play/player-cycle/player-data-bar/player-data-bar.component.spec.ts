import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDataBarComponent } from './player-data-bar.component';

describe('PlayerDataBarComponent', () => {
  let component: PlayerDataBarComponent;
  let fixture: ComponentFixture<PlayerDataBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDataBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDataBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
