import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChatState } from '../state/chat.state';
import { Chat } from '../models/chat.model';

//feature selector for the entire chat state
export const selectChatState = createFeatureSelector<ChatState>('chat');

//selector for all chats
export const selectAllChats = createSelector(
    selectChatState,
    (state: ChatState) => state.chats
);

//selector for a specific chat by ID
export const selectChatById = (chatId: string) =>
    createSelector(selectAllChats, (chats: Chat[]) => 
        chats.find(chat => chat.chatId === chatId)
    );

//selector for favorite chats
export const selectFavoriteChats = createSelector(
  selectAllChats,
  (chats: Chat[]) => chats.filter(chat => chat.isFavorite)  
);