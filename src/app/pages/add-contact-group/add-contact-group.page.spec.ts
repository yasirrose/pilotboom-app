import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddContactGroupPage } from './add-contact-group.page';

describe('AddContactGroupPage', () => {
  let component: AddContactGroupPage;
  let fixture: ComponentFixture<AddContactGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContactGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
