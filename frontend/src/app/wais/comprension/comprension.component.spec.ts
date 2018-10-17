import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprensionComponent } from './comprension.component';

describe('ComprensionComponent', () => {
  let component: ComprensionComponent;
  let fixture: ComponentFixture<ComprensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
