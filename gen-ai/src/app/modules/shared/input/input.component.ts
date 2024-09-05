import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ChatState } from '../../../store/state/chat.state';
import { selectChatById } from '../../../store/selectors/chat.selectors';
import * as ChatActions from '../../../store/actions/chat.actions';
import { switchMap, map, take } from 'rxjs/operators';
import { Chat } from '../../../store/models/chat.model';

@Component({
  selector: 'bh-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})

export class InputComponent {
  @Input() chatId!: string;
  @Input() optionInput!: string;
  @Input() inputText: string;
  public selectedFile: File | null;
  public fileUrl: string | null;
  public fileName: string | null;
  public fileNameShort: string | undefined;
  public fileExt: string | undefined;
  public isImage: boolean;

  constructor(
    public router: Router,
    private http: HttpClient,
    private store: Store<ChatState>
  ) { 
    this.inputText = '';
    this.selectedFile = null;
    this.fileUrl = null;
    this.fileName = null;
    this.fileNameShort = '';
    this.fileExt = '';
    this.isImage = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = input.files[0].name;
      this.fileNameShort = this.fileName.length > 30 ? `${this.fileName.slice(0, 10)}...${this.fileName.slice(-10)}` : this.fileName;
      this.fileExt = input.files[0].name.split('.').pop();

      //check if file is image
      this.isImage = this.selectedFile.type.startsWith('image/');

      if (this.isImage) {
        //create url for image
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileUrl = reader.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  deleteFile(): void {
    this.selectedFile = null;
    this.fileUrl = null;
    this.isImage = false;
    this.fileName = '';
    this.fileNameShort = '';
    this.fileExt = '';
  }

  onSubmit() {
    //from root page    
    if (this.router.url.includes('/start')) { 
      const newChat: Chat = {
        chatId: this.chatId, 
        chatName: '',
        isFavorite: false,
        messages: []
      };

      //add new chat to store
      this.store.dispatch(ChatActions.addChat({ chat: newChat }));
    }

    if (this.router.url.includes('/new') || this.router.url.includes('/start')) {
      this.router.navigate(['/chat', this.chatId]);
    }

    //until API is ready: post user message
    if (this.inputText.trim()) {
      const userMessage = `ui: ${this.inputText.trim()}`;

      this.store.select(selectChatById(this.chatId)).pipe(
        take(1),
        map((chat: Chat | undefined) => {
          if (chat) {
            // Create a new array of messages with the new user message appended
            const updatedMessages = [...chat.messages, userMessage];
  
            // Dispatch the action to update the chat's messages in the store
            this.store.dispatch(ChatActions.updateChat({
              chatId: this.chatId,
              changes: { messages: updatedMessages }
            }));
          }
        })
      ).subscribe();

      //until API is ready: temporarily post loading state
      setTimeout(() => {
        this.store.select(selectChatById(this.chatId)).pipe(
          take(1),
          map((chat: Chat | undefined) => {
            if (chat) {
              // Create a new array of messages with the new user message appended
              const updatedMessages = [...chat.messages, `so:`];
    
              // Dispatch the action to update the chat's messages in the store
              this.store.dispatch(ChatActions.updateChat({
                chatId: this.chatId,
                changes: { messages: updatedMessages }
              }));
            }
          })
        ).subscribe();
      }, 500);

      //until API is ready: default reply
      setTimeout(() => {
        this.store.select(selectChatById(this.chatId)).pipe(
          take(1),
          map((chat: Chat | undefined) => {
            if (chat) {
              // Create a new array of messages with the new user message appended
              let updatedMessages = chat.messages.slice(0, -1);
              const loaderlessMessages = [...updatedMessages, `so: This is just a prototype of a gen AI chatbot, but thanks for checking it out!`];
    
              // Dispatch the action to update the chat's messages in the store
              this.store.dispatch(ChatActions.updateChat({
                chatId: this.chatId,
                changes: { messages: loaderlessMessages }
              }));
            }
          })
        ).subscribe();
      }, 1500);

      // Clear the input field
      this.inputText = '';
    }
    
    const formData = new FormData();

    //pass image attachment
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    
    //other form data
    formData.append('query', this.inputText);

    //test form data
    // const formDataObj: { [key: string]: any } = {};
    // formData.forEach((value, key) => {
    //   formDataObj[key] = value;
    // });
    // console.log(formDataObj);
    
    //send the FormData to the backend
    // this.http.post('backend-url/api/upload', formData).subscribe({
    //   next: (response) => {
    //     console.log('upload success:', response);
    //   },
    //   error: (error) => {
    //     console.error('upload error:', error);
    //   },
    //   complete: () => {
    //     console.log('upload completed');
    //   }
    // });
  }

  onEnterKey(event: KeyboardEvent) {
    //submit form on enter, if shift key isn't held for line break
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}