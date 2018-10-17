import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoFiguradoComponent } from './peso-figurado.component';

describe('PesoFiguradoComponent', () => {
  let component: PesoFiguradoComponent;
  let fixture: ComponentFixture<PesoFiguradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesoFiguradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoFiguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
