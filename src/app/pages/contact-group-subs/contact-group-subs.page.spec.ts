import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactGroupSubsPage } from './contact-group-subs.page';

describe('ContactGroupSubsPage', () => {
  let component: ContactGroupSubsPage;
  let fixture: ComponentFixture<ContactGroupSubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactGroupSubsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactGroupSubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
