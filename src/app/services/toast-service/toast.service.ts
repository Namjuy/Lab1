import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  /**
   * Show a Bootstrap toast message.
   * @param valid - The ID of the HTML element containing the toast.
   */
  showToastMessage: (valid: string) => void = (valid) => {
    // Get the HTML element by ID
    const toastLiveExample = document.getElementById(valid);

    // Check if the element exists
    if (toastLiveExample) {
      // Create a new Toast instance and show it
      const toastBootstrap = new Toast(toastLiveExample);
      toastBootstrap.show();
    }
  };
}
