import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverContentComponent } from './cover-content.component';

describe('CoverContentComponent', () => {
  let component: CoverContentComponent;
  let fixture: ComponentFixture<CoverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
