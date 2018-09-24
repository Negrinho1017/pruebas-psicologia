import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosLetrasComponent } from './numeros-letras.component';

describe('NumerosLetrasComponent', () => {
  let component: NumerosLetrasComponent;
  let fixture: ComponentFixture<NumerosLetrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerosLetrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerosLetrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
