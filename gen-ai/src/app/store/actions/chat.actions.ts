import { createAction, props } from '@ngrx/store';
import { Chat } from '../models/chat.model';

export const loadChats = createAction('[Chat] Load Chats');
export const loadChatsSuccess = createAction('[Chat] Load Chats Success', props<{ chats: Chat[] }>());
export const loadChatsFailure = createAction('[Chat] Load Chats Failure', props<{ error: any }>());
export const selectChat = createAction('[Chat] Select Chat', props<{ chatId: string }>());
export const updateChat = createAction('[Chat] Update Chat', props<{ chatId: string, changes: Partial<Chat> }>());
export const addChat = createAction('[Chat] Add Chat', props<{ chat: Chat }>());
export const removeChat = createAction('[Chat] Remove Chat', props<{ chatId: string }>());
export const removeAllChats = createAction('[Chat] Remove All Chats');