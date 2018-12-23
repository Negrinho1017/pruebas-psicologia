import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurasIncompletasWiscComponent } from './figuras-incompletas-wisc.component';

describe('FigurasIncompletasWiscComponent', () => {
  let component: FigurasIncompletasWiscComponent;
  let fixture: ComponentFixture<FigurasIncompletasWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurasIncompletasWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurasIncompletasWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
