import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprensionWiscComponent } from './comprension-wisc.component';

describe('ComprensionWiscComponent', () => {
  let component: ComprensionWiscComponent;
  let fixture: ComponentFixture<ComprensionWiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprensionWiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprensionWiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
