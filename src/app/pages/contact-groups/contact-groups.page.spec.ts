import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactGroupsPage } from './contact-groups.page';

describe('ContactGroupsPage', () => {
  let component: ContactGroupsPage;
  let fixture: ComponentFixture<ContactGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
