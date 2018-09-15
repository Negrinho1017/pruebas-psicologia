import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDeDatosComponent } from './ingreso-de-datos.component';

describe('IngresoDeDatosComponent', () => {
  let component: IngresoDeDatosComponent;
  let fixture: ComponentFixture<IngresoDeDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoDeDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoDeDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
