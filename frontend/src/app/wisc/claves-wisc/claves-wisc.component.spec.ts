import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClavesWiscComponent } from './claves-wisc.component';

describe('ClavesWiscComponent', () => {
  let component: ClavesWiscComponent;
  let fixture: ComponentFixture<ClavesWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClavesWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClavesWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
