import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProgrammeComponent } from './creation-programme.component';

describe('CreationProgrammeComponent', () => {
  let component: CreationProgrammeComponent;
  let fixture: ComponentFixture<CreationProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
