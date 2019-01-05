import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisWiscComponent } from './analisis-wisc.component';

describe('AnalisisWiscComponent', () => {
  let component: AnalisisWiscComponent;
  let fixture: ComponentFixture<AnalisisWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
