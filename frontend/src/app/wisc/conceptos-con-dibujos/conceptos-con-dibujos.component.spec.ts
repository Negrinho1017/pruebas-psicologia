import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosConDibujosComponent } from './conceptos-con-dibujos.component';

describe('ConceptosConDibujosComponent', () => {
  let component: ConceptosConDibujosComponent;
  let fixture: ComponentFixture<ConceptosConDibujosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptosConDibujosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptosConDibujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
