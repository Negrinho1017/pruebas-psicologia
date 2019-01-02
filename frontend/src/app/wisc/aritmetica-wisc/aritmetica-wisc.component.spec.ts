import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AritmeticaWiscComponent } from './aritmetica-wisc.component';

describe('AritmeticaWiscComponent', () => {
  let component: AritmeticaWiscComponent;
  let fixture: ComponentFixture<AritmeticaWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AritmeticaWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AritmeticaWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
