import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDePuntuacionesCompuestasComponent } from './hoja-de-puntuaciones-compuestas.component';

describe('HojaDePuntuacionesCompuestasComponent', () => {
  let component: HojaDePuntuacionesCompuestasComponent;
  let fixture: ComponentFixture<HojaDePuntuacionesCompuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDePuntuacionesCompuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDePuntuacionesCompuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
