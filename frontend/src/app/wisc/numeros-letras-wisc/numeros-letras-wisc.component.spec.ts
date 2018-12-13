import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosLetrasWiscComponent } from './numeros-letras-wisc.component';

describe('NumerosLetrasWiscComponent', () => {
  let component: NumerosLetrasWiscComponent;
  let fixture: ComponentFixture<NumerosLetrasWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerosLetrasWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerosLetrasWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
