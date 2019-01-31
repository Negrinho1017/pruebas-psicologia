import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDePruebasComponent } from './hoja-de-pruebas.component';

describe('HojaDePruebasComponent', () => {
  let component: HojaDePruebasComponent;
  let fixture: ComponentFixture<HojaDePruebasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDePruebasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDePruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
