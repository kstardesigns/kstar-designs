import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChatState } from '../../../store/state/chat.state';
import * as ChatActions from '../../../store/actions/chat.actions';
import { Chat } from '../../../store/models/chat.model';

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public sidebarOpen: boolean;
  public accordionsOpen: boolean;

  constructor(
    private store: Store<ChatState>,
    public router: Router
  ) {
    this.sidebarOpen = false;
    this.accordionsOpen = false;
  }

  //open/close sidebar
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

    if (this.sidebarOpen) { //if it's open
      document.body.classList.add('mobile-overlay-open');
      document.body.classList.add('sidebar-open');
      document.querySelectorAll('.bh-sidebar-details').forEach(function(sidebarAccordion){
        sidebarAccordion.classList.add('sidebar-open');
      });
    } else {
      document.body.classList.remove('mobile-overlay-open');
      document.body.classList.remove('sidebar-open');
      document.querySelectorAll('.bh-sidebar-details').forEach(function(sidebarAccordion){
        sidebarAccordion.classList.remove('sidebar-open');
      });
    }

    //add sidebar transition class after sidebar has opened for the first time on desktop
    const headerGroup = document.querySelector('.bh-header-group');

    if (headerGroup !== null) {
      setTimeout(function() {
        headerGroup.classList.add('with-transition');
      }, 2000);
    } 
  }

  openAccordions() {
    if (!this.sidebarOpen) {
      this.accordionsOpen = true;
      this.toggleSidebar();
    } else {
      this.accordionsOpen = !this.accordionsOpen;
    }
  }

  createNewChat() {
    const newChatId = Date.now().toString();

    const newChat: Chat = {
      chatId: newChatId, 
      chatName: '',
      isFavorite: false,
      messages: []
    };

    //add new chat to store
    this.store.dispatch(ChatActions.addChat({ chat: newChat }));

    //go to new chat page
    this.router.navigate(['/new', newChatId]);

    if (window.innerWidth <= 640) {
      this.toggleSidebar();
    }
  }
}
