import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeSubpruebasComponent } from './hoja-de-subpruebas.component';

describe('HojaDeSubpruebasComponent', () => {
  let component: HojaDeSubpruebasComponent;
  let fixture: ComponentFixture<HojaDeSubpruebasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDeSubpruebasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDeSubpruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
