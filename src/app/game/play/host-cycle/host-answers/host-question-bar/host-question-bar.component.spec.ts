import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostQuestionBarComponent } from './host-question-bar.component';

describe('HostQuestionBarComponent', () => {
  let component: HostQuestionBarComponent;
  let fixture: ComponentFixture<HostQuestionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostQuestionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostQuestionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
