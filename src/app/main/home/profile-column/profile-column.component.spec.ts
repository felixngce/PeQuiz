import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileColumnComponent } from './profile-column.component';

describe('ProfileColumnComponent', () => {
  let component: ProfileColumnComponent;
  let fixture: ComponentFixture<ProfileColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
