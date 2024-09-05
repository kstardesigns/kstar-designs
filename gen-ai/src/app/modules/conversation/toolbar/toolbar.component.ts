import { Component, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { ChatState } from '../../../store/state/chat.state';
import { selectChatById } from '../../../store/selectors/chat.selectors';
import * as ChatActions from '../../../store/actions/chat.actions';
import { Chat } from '../../../store/models/chat.model';

@Component({
  selector: 'bh-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('chatName') chatName!: ElementRef;
  @Input() set chatId(value: string) {
    this.chatIdSubject.next(value);
    this.initializeChatDetails();
  }

  private chatIdSubject = new BehaviorSubject<string | null>(null);
  public editMode: boolean;
  public currentChatName: string;
  public isFavorited$!: Observable<boolean>;
  public favAriaLabel: string;

  constructor(private store: Store<ChatState>) { 
    this.editMode = false;
    this.currentChatName = 'Untitled';
    this.favAriaLabel = 'Add chat to favorites';
  }

  ngOnInit() {
    this.initializeChatDetails();
  }

  ngOnDestroy(): void {
    this.chatIdSubject.complete();
  }

  private initializeChatDetails(): void {
    //update favorite icon
    this.isFavorited$ = this.chatIdSubject.pipe(
      switchMap(chatId =>
        this.store.select(selectChatById(chatId!)).pipe(
          map(chat => chat?.isFavorite || false)
        )
      )
    );

    //get chat's name
    this.chatIdSubject.pipe(
      switchMap(chatId => this.store.select(selectChatById(chatId!)).pipe(take(1))),
      map((chat: Chat | undefined) => {
        if (chat) {
          this.currentChatName = chat.chatName == '' ? 'Untitled' : chat.chatName;
          this.favAriaLabel = chat.isFavorite ? 'Remove chat from favorites' : 'Add chat to favorites';
        }
      })
    ).subscribe();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      //autofocus on text input
      setTimeout(() => {
        if (this.chatName) {
          this.chatName.nativeElement.focus();
        }
      }, 250);
    } else {
      this.updateChatName();
    }
  }

  updateChatName(): void {
    this.chatIdSubject.pipe(
      switchMap(chatId => this.store.select(selectChatById(chatId!)).pipe(take(1))),
      map((chat: Chat | undefined) => {
        if (chat) {
          const newName = this.currentChatName.trim() === '' ? 'Untitled' : this.currentChatName.trim();
          this.store.dispatch(ChatActions.updateChat({
            chatId: chat.chatId,
            changes: { chatName: newName }
          }));
        }
      })
    ).subscribe();
  }

  toggleFavorite() {
    this.chatIdSubject.pipe(
      switchMap(chatId => this.store.select(selectChatById(chatId!)).pipe(take(1))),
      map((chat: Chat | undefined) => {
        if (chat) {
          this.store.dispatch(ChatActions.updateChat({
            chatId: chat.chatId,
            changes: { isFavorite: !chat.isFavorite }
          }))
        }
      })
    ).subscribe();
  }
}