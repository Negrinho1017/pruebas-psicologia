import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClavesComponent } from './claves.component';

describe('ClavesComponent', () => {
  let component: ClavesComponent;
  let fixture: ComponentFixture<ClavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
