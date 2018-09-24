import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RompecabezasVisualComponent } from './rompecabezas-visual.component';

describe('RompecabezasVisualComponent', () => {
  let component: RompecabezasVisualComponent;
  let fixture: ComponentFixture<RompecabezasVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RompecabezasVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RompecabezasVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
