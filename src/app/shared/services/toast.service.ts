import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isVisible: boolean = false;
  message!: string;
  color: string = 'green';
  toastPos: number = 0;

  constructor() { }

  private resetToast(duration: number) {
    setTimeout(() => {
      this.toastPos = 0;
      this.isVisible = false;
      this.message = '';
    }, duration);
  }

  showSuccessToast(message: string, duration: number = 2000) {
    this.toastPos = window.innerHeight + window.scrollY;
    this.color = 'green';
    this.message = message;
    this.isVisible = true;
    this.resetToast(duration);
  }
  
  showErrorToast(message: string = 'Une erreur s\'est produite.', duration: number = 2000) {
    this.toastPos = window.innerHeight + window.scrollY;
    this.color = 'red';
    this.message = message;
    this.isVisible = true;
    this.resetToast(duration);
  }
  
}
