import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasIncompletasComponent } from './figuras-incompletas.component';

describe('FigurasIncompletasComponent', () => {
  let component: FigurasIncompletasComponent;
  let fixture: ComponentFixture<FigurasIncompletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurasIncompletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurasIncompletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
