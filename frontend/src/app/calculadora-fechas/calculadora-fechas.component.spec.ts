import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraFechasComponent } from './calculadora-fechas.component';

describe('CalculadoraFechasComponent', () => {
  let component: CalculadoraFechasComponent;
  let fixture: ComponentFixture<CalculadoraFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
