import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaSimbolosComponent } from './busqueda-simbolos.component';

describe('BusquedaSimbolosComponent', () => {
  let component: BusquedaSimbolosComponent;
  let fixture: ComponentFixture<BusquedaSimbolosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaSimbolosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaSimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
