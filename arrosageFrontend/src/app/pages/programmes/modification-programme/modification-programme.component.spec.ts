import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProgrammeComponent } from './modification-programme.component';

describe('ModificationProgrammeComponent', () => {
  let component: ModificationProgrammeComponent;
  let fixture: ComponentFixture<ModificationProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
