import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupressionProgrammeComponent } from './supression-programme.component';

describe('SupressionProgrammeComponent', () => {
  let component: SupressionProgrammeComponent;
  let fixture: ComponentFixture<SupressionProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupressionProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupressionProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
