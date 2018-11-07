import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisProcesoComponent } from './analisis-proceso.component';

describe('AnalisisProcesoComponent', () => {
  let component: AnalisisProcesoComponent;
  let fixture: ComponentFixture<AnalisisProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
