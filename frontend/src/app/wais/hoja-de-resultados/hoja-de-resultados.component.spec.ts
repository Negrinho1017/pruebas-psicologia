import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeResultadosComponent } from './hoja-de-resultados.component';

describe('HojaDeResultadosComponent', () => {
  let component: HojaDeResultadosComponent;
  let fixture: ComponentFixture<HojaDeResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDeResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDeResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
