import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsColumnComponent } from './account-details-column.component';

describe('AccountDetailsColumnComponent', () => {
  let component: AccountDetailsColumnComponent;
  let fixture: ComponentFixture<AccountDetailsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
