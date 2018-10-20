import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortalezasDebilidadesComponent } from './fortalezas-debilidades.component';

describe('FortalezasDebilidadesComponent', () => {
  let component: FortalezasDebilidadesComponent;
  let fixture: ComponentFixture<FortalezasDebilidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortalezasDebilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortalezasDebilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
