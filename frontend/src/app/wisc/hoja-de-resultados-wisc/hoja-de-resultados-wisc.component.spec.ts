import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeResultadosWiscComponent } from './hoja-de-resultados-wisc.component';

describe('HojaDeResultadosWiscComponent', () => {
  let component: HojaDeResultadosWiscComponent;
  let fixture: ComponentFixture<HojaDeResultadosWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDeResultadosWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDeResultadosWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
