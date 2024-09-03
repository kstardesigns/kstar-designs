import { Chat } from '../models/chat.model';

export interface ChatState {
    chats: Chat[];
    selectedChatId: string | null;
}

export const initialChatState: ChatState = {
    chats: [
        {
            chatId: '1x1x1x1',
            chatName: 'The company\'s legacy',
            isFavorite: false,
            messages: ['Hello', 'How are you?']
        },
        {
            chatId: '2b2b2b2',
            chatName: 'Assistance with Power BI application',
            isFavorite: true,
            messages: ['Hi', 'What can I do for you?']
        },
        {
            chatId: '3c3c3c3',
            chatName: 'Assitance with Power BI application and this is a longer chat title in need of truncation after 3 lines or so',
            isFavorite: false,
            messages: ['Hello', 'How are you?']
        },
        {
            chatId: '4f4f4f4',
            chatName: 'Software issues',
            isFavorite: true,
            messages: ['Hi', 'What can I do for you?']
        },
        {
            chatId: '7f7f7f7',
            chatName: '',
            isFavorite: false,
            messages: ['Hello', 'How are you?']
        },
        {
            chatId: '9f9f9f9',
            chatName: 'Safety in the workplace',
            isFavorite: true,
            messages: ['Hi', 'What can I do for you?']
        }
    ],
    selectedChatId: null
}