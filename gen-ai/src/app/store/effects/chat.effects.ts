import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../models/chat.model';
import * as ChatActions from '../actions/chat.actions';

@Injectable()
export class ChatEffects {
    loadChats$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ChatActions.loadChats),
            mergeMap(() =>
                this.chatService.getChats().pipe(
                    map((chats: Chat[]) => ChatActions.loadChatsSuccess({ chats })),
                    catchError(error => of(ChatActions.loadChatsFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) {
        console.log('Actions stream:', this.actions$);
    }
}