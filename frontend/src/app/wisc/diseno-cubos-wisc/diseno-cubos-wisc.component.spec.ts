import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenoCubosWiscComponent } from './diseno-cubos-wisc.component';

describe('DisenoCubosWiscComponent', () => {
  let component: DisenoCubosWiscComponent;
  let fixture: ComponentFixture<DisenoCubosWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenoCubosWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenoCubosWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
