import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenoCubosComponent } from './diseno-cubos.component';

describe('DisenoCubosComponent', () => {
  let component: DisenoCubosComponent;
  let fixture: ComponentFixture<DisenoCubosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenoCubosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenoCubosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
