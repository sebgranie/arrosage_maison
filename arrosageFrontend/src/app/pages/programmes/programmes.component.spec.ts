import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesComponent } from './programmes.component';

describe('ProgrammesComponent', () => {
  let component: ProgrammesComponent;
  let fixture: ComponentFixture<ProgrammesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
