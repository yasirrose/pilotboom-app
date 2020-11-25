import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatListingPage } from './chat-listing.page';

describe('ChatListingPage', () => {
  let component: ChatListingPage;
  let fixture: ComponentFixture<ChatListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
