import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpruebasOpcionalesComponent } from './subpruebas-opcionales.component';

describe('SubpruebasOpcionalesComponent', () => {
  let component: SubpruebasOpcionalesComponent;
  let fixture: ComponentFixture<SubpruebasOpcionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpruebasOpcionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpruebasOpcionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
