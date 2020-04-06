import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.less']
})
export class CustomPopupComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() textBtn: string;
  @Input() isOpenCustomPopup: boolean = false;
  @Output() openPopupEvent = new EventEmitter();
  @Output() onActionEvent = new EventEmitter();

  onClose(): void {
    this.isOpenCustomPopup = false;
    this.openPopupEvent.emit();
  }

  onAction(): void {
    this.onActionEvent.emit();
    this.onClose();
  }
}
