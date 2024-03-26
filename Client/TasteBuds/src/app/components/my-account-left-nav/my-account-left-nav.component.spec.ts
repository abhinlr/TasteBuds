import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountLeftNavComponent } from './my-account-left-nav.component';

describe('MyAccountLeftNavComponent', () => {
  let component: MyAccountLeftNavComponent;
  let fixture: ComponentFixture<MyAccountLeftNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAccountLeftNavComponent]
    });
    fixture = TestBed.createComponent(MyAccountLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
