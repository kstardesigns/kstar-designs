import { Component, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'bh-system-output',
  templateUrl: './system-output.component.html',
  styleUrl: './system-output.component.scss'
})

export class SystemOutputComponent {
  @ViewChild('tooltip3', { static: false }) tooltip3!: MatTooltip;
  @Input() responseIsReady: boolean;
  @Input() response: string;
  public visibleFeedbackForm: boolean;
  public feedbackType: string;
  public feedbackText: string;
  public positiveTooltip: string;
  public negativeTooltip: string;
  public copyTooltip: string;
  public positives: { id: string; name: string; isChecked: boolean}[] = [];
  public negatives: { id: string; name: string; isChecked: boolean}[] = [];
  
  constructor(
    private http: HttpClient
  ) { 
    this.responseIsReady = false;
    this.response = '';
    this.visibleFeedbackForm = false;
    this.feedbackType = '';
    this.feedbackText = '';
    this.positiveTooltip = 'Good response';
    this.negativeTooltip = 'Bad response';
    this.copyTooltip = 'Click to copy';
    this.positives = [
      { id: 'correct', name: 'Correct', isChecked: false },
      { id: 'clear-and-easy-to-understand', name: 'Clear and easy to understand', isChecked: false },
      { id: 'complete-response', name: 'Complete response', isChecked: false }
    ];
    this.negatives = [
      { id: 'not-factually-correct', name: 'Not factually correct', isChecked: false },
      { id: 'harmful-or-offensive', name: 'Harmful or offensive', isChecked: false },
      { id: 'overactive-refusal', name: 'Overactive refusal', isChecked: false },
      { id: 'didnt-fully-follow-my-request', name: 'Didn\'t fully follow my request', isChecked: false },
      { id: 'irrelevant-response', name: 'Irrelevant response', isChecked: false }
    ];
  }

  showFeedbackForm(feedback: string) {
    if (feedback !== 'cancel') {
      this.visibleFeedbackForm = true;
      this.feedbackType = feedback;  
    } else {
      this.visibleFeedbackForm = false;
      this.feedbackType = '';
    }
  }

  onFeedbackSubmit(feedback: string) {
    const formData = new FormData();

    formData.append('feedback-type', feedback);

    if (feedback == 'positive') {
      this.positives.forEach((choice, index) => {
        formData.append(`pos_${choice.id}`, choice.isChecked.toString());
      });
    }

    if (feedback == 'negative') {
      this.negatives.forEach((choice, index) => {
        formData.append(`neg_${choice.id}`, choice.isChecked.toString());
      });
    }

    formData.append(`${feedback.substring(0,3)}_additional-feedback`, this.feedbackText);

    //test form data
    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log(formDataObj);

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
      this.onFeedbackSubmit(this.feedbackType);
    }
  }

  copyToClipboard() {
    this.copyTooltip = 'Copied!';
    this.tooltip3.show();
    
    navigator.clipboard.writeText(this.response).then(() => {
      setTimeout(() => {
        this.copyTooltip = 'Click to copy';
        this.tooltip3.hide();
      }, 2000);
      
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}