import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homecomponent } from './homecomponent';

describe('Home', () => {
  let component: Homecomponent;
  let fixture: ComponentFixture<Homecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Homecomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
