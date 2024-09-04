import { Component, Input, ViewChild, ElementRef, inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatState } from '../../../../store/state/chat.state';
import { selectFavoriteChats, selectAllChats } from '../../../../store/selectors/chat.selectors';
import * as ChatActions from '../../../../store/actions/chat.actions';

@Component({
  selector: 'bh-header-accordion',
  templateUrl: './header-accordion.component.html',
  styleUrl: './header-accordion.component.scss'
})
export class HeaderAccordionComponent {
  readonly dialog = inject(MatDialog);

  @Input() accordionName: string;
  @Input() favoritesMenu: boolean;
  @Input() historyMenu: boolean;
  @Input() sidebarOpen: boolean;
  @Input() accordionsOpen: boolean;
  @ViewChild('accDetails', { static: true }) details!: ElementRef; //<details>
  @ViewChild('accSummary', { static: true }) summary!: ElementRef; //<summary>
  @ViewChild('accContent', { static: true }) content!: ElementRef; //.bh-sidebar-accordion-content
  private mobileSidebarBp: number;
  public favorites$: Observable<{ chatId: string; chatName: string; }[]>;
  public history$: Observable<{ chatId: string; chatName: string; }[]>;
  public currentChatId: string = '';

  constructor(
    private store: Store<ChatState>,
    private router: Router
  ) {
    this.accordionName = '';
    this.favoritesMenu = false;
    this.historyMenu= false;
    this.sidebarOpen = false;
    this.accordionsOpen = false;
    this.mobileSidebarBp = 640;
    this.favorites$ = this.store.select(selectFavoriteChats);
    this.history$ = this.store.select(selectAllChats);
  }
  
  openChat(chatId: string): void {
    this.router.navigate(['/chat', chatId]);
    this.currentChatId = chatId;
  }

  openConfirmationDialog(dialogType: string, chatId: string, chatName: string) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'bh-dialog-small',
      data: {
        confirmationType: dialogType,
        chatId: chatId,
        chatName: chatName
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch(dialogType) {
          case 'removeChatFromHistory':
            this.removeChatFromHistory(chatId);
            break;
          case 'removeAllHistory':
            this.removeAllHistory();
            break;
          case 'removeChatFromFavs':
            this.removeChatFromFavs(chatId);
            break;
          default:
            console.log('Not 1 of the valid confirmations');
        }
      }
    });
  }

  removeChatFromFavs(chatId: string): void {
    this.store.dispatch(ChatActions.updateChat({ chatId, changes: { isFavorite: false } }));
  }

  removeChatFromHistory(chatId: string) {
    //if current chat is deleted, go back to landing page
    if (this.currentChatId == chatId) {
      this.router.navigate(['/start']);
    }
    this.store.dispatch(ChatActions.removeChat({ chatId }));
  }

  removeAllHistory(): void {
    this.router.navigate(['/start']);
    this.store.dispatch(ChatActions.removeAllChats());
  }
}