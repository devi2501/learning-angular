import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitabilityInboxComponent } from './suitability-inbox.component';

describe('SuitabilityInboxComponent', () => {
  let component: SuitabilityInboxComponent;
  let fixture: ComponentFixture<SuitabilityInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitabilityInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitabilityInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
