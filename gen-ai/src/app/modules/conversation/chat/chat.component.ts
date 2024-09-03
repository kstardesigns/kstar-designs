import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatState } from '../../../store/state/chat.state';
import { selectChatById } from '../../../store/selectors/chat.selectors';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Chat } from '../../../store/models/chat.model';

@Component({
  selector: 'bh-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() chatId!: string;
  public chatMessages$!: Observable<string[]>;

  constructor(
    private store: Store<ChatState>,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.chatMessages$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap((chatId: string) =>
        this.store.select(selectChatById(chatId)).pipe(
          map((chat: Chat | undefined) => chat?.messages || [])
        )
      )
    );
  }
}
