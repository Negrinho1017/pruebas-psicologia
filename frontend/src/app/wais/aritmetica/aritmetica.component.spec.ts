import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AritmeticaComponent } from './aritmetica.component';

describe('AritmeticaComponent', () => {
  let component: AritmeticaComponent;
  let fixture: ComponentFixture<AritmeticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AritmeticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AritmeticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
