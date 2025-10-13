import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-submitpopup',
  imports: [],
  templateUrl: './submitpopup.component.html',
  styleUrl: './submitpopup.component.scss'
})
export class SubmitpopupComponent {
 @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}