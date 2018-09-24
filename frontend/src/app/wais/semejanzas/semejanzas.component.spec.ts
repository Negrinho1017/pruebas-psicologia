import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemejanzasComponent } from './semejanzas.component';

describe('SemejanzasComponent', () => {
  let component: SemejanzasComponent;
  let fixture: ComponentFixture<SemejanzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemejanzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemejanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
