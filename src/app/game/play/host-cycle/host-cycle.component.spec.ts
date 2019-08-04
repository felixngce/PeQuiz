import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCycleComponent } from './host-cycle.component';

describe('HostCycleComponent', () => {
  let component: HostCycleComponent;
  let fixture: ComponentFixture<HostCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
