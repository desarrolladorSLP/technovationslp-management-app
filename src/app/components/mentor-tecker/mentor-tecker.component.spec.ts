import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorTeckerComponent } from './mentor-tecker.component';

describe('MentorTeckerComponent', () => {
  let component: MentorTeckerComponent;
  let fixture: ComponentFixture<MentorTeckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTeckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorTeckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
