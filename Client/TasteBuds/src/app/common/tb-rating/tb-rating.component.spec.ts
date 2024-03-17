import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbRatingComponent } from './tb-rating.component';

describe('TbRatingComponent', () => {
  let component: TbRatingComponent;
  let fixture: ComponentFixture<TbRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TbRatingComponent]
    });
    fixture = TestBed.createComponent(TbRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
