import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http'; //when API is ready
import { Observable, of } from 'rxjs';
import { Chat } from '../store/models/chat.model';
import { initialChatState } from '../store/state/chat.state';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    // private apiUrl = 'api-url-here'; //when API is ready

    constructor(
        // private http: HttpClient //when API is ready
    ) {}

    getChats(): Observable<Chat[]> {
        // return this.http.get<Chat[]>(`${this.apiUrl}/chats`); //when API is ready
        return of(initialChatState.chats); // sample data
    }
}