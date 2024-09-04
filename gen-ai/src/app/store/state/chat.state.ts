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
            messages: [
                'ui: Can you tell me about the company\'s legacy?', 
                'so: The company offers a comprehensive range of services. The system operates across 26 states with a variety of buildings, offices, and locations for its customers. It is one of the largest companies in the country.',
                'ui: What else do they have?',
                'so: They also have locations where their workers work, as well as options depending on the type of service needed. The company is headquartered in Asheville, North Carolina.'
            ]
        },
        {
            chatId: '2b2b2b2',
            chatName: 'Assistance with Power application',
            isFavorite: true,
            messages: [
                'ui: Hi, I need some help with my Power app', 
                'so: Sure, what would you like to know about it?', 
                'ui: Where can I find the shorcut to my personal settings?', 
                'so: In the top right corner, under your user profile menu, you will find the settings.'
            ]
        },
        {
            chatId: '4f4f4f4',
            chatName: 'Software issues',
            isFavorite: true,
            messages: [
                `ui: Can you troubleshoot this software? I've tried the following: rebooting my computer, closing the software, and reinstalling the software.`, 
                `so: Did you try changing the setting from 'broken' to 'fixed'?`
            ]
        },
        {
            chatId: '7f7f7f7',
            chatName: '',
            isFavorite: false,
            messages: [
                'ui: Hello, I have a question.', 
                'so: Sure, can you be more specific?'
            ]
        },
        {
            chatId: '9f9f9f9',
            chatName: 'Safety in the workplace',
            isFavorite: true,
            messages: [
                `ui: Please create me a 3 step plan to boost my store's safety rating in the next four weeks. Each of these steps needs to have an action verb and a person who is responsible for the task. I would also like each step to be alliterative.`,
                `so: Here’s a 3-step alliterative plan to boost your store's safety rating:\n1. Survey Store, 2. Sanitize Surfaces, 3. Secure Signage`
            ]
        }
    ],
    selectedChatId: null
}