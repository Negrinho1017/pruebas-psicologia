import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemejanzasWiscComponent } from './semejanzas-wisc.component';

describe('SemejanzasWiscComponent', () => {
  let component: SemejanzasWiscComponent;
  let fixture: ComponentFixture<SemejanzasWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemejanzasWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemejanzasWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
