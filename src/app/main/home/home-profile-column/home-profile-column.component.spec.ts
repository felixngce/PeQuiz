import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfileColumnComponent } from './home-profile-column.component';

describe('HomeProfileColumnComponent', () => {
  let component: HomeProfileColumnComponent;
  let fixture: ComponentFixture<HomeProfileColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfileColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfileColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
