import { createReducer, on } from '@ngrx/store';
import { ChatState, initialChatState } from '../state/chat.state';
import { Chat } from '../models/chat.model';
import * as ChatActions from '../actions/chat.actions';

export const chatReducer = createReducer(
    initialChatState,
    on(ChatActions.loadChatsSuccess, (state, { chats }) => ({
        ...state,
        chats: [...chats],
    })),
    on(ChatActions.selectChat, (state, { chatId }) => ({
        ...state,
        selectedChatId: chatId,
    })),
    on(ChatActions.updateChat, (state, { chatId, changes }) => ({
        ...state,
        chats: state.chats.map((chat: Chat) =>
            chat.chatId === chatId ? { ...chat, ...changes } : chat
        ),
    })),
    on(ChatActions.addChat, (state, { chat }) => ({
        ...state,
        chats: [...state.chats, chat]
    })),
    on(ChatActions.removeChat, (state, { chatId }) => ({
        ...state,
        chats: state.chats.filter(chat => chat.chatId !== chatId)
    })),
    on(ChatActions.removeAllChats, state => ({
        ...state,
        chats: []
    }))
);