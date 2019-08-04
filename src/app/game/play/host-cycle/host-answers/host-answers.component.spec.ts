import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAnswersComponent } from './host-answers.component';

describe('HostAnswersComponent', () => {
  let component: HostAnswersComponent;
  let fixture: ComponentFixture<HostAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
