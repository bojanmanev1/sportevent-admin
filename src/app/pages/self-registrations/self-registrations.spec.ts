import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRegistrations } from './self-registrations';

describe('SelfRegistrations', () => {
  let component: SelfRegistrations;
  let fixture: ComponentFixture<SelfRegistrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfRegistrations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfRegistrations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
