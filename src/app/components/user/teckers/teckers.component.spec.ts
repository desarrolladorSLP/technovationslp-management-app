import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TeckersComponent } from "./teckers.component";

describe("TeckersComponent", () => {
  let component: TeckersComponent;
  let fixture: ComponentFixture<TeckersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeckersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
