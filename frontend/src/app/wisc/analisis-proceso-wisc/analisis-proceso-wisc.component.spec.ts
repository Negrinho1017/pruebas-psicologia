import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisProcesoWiscComponent } from './analisis-proceso-wisc.component';

describe('AnalisisProcesoWiscComponent', () => {
  let component: AnalisisProcesoWiscComponent;
  let fixture: ComponentFixture<AnalisisProcesoWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisProcesoWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisProcesoWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
