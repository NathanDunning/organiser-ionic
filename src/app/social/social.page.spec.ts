import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPage } from './social.page';

describe('SocialPage', () => {
  let component: SocialPage;
  let fixture: ComponentFixture<SocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
