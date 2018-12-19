import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaSimbolosWiscComponent } from './busqueda-simbolos-wisc.component';

describe('BusquedaSimbolosWiscComponent', () => {
  let component: BusquedaSimbolosWiscComponent;
  let fixture: ComponentFixture<BusquedaSimbolosWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaSimbolosWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaSimbolosWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
