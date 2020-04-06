﻿import {Component, Input, OnChanges, ViewChild, ElementRef} from '@angular/core';

const defaultMaxSymbols = 250;

@Component({
    selector: 'app-show-more',
    templateUrl: './show-more.component.html',
    styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements OnChanges {
    @Input() text: string = '';
    @Input() maxSymbols: number = defaultMaxSymbols;
    @ViewChild('mainText', {static: true}) mainText: ElementRef;

    length: number = 0;
    displayedText: string;
    isLimitExceeded: boolean = false;
    isExpanded: boolean = false;

    ngOnChanges(): void {
        this.text = this.text || '';
        this.isLimitExceeded = this.text.length > this.maxSymbols;
        this.displayedText = this.isLimitExceeded
            ? this.text.substring(
            0,
            Math.max(
                this.text.lastIndexOf(' ', this.maxSymbols),
                this.text.indexOf(' ', this.maxSymbols),
                0
            )
        ) + '... '
        : this.text;

        this.setText(this.displayedText);
    }

    showAll(): void {
        this.isExpanded = !this.isExpanded;
        this.isExpanded
            ? this.setText(this.text)
            : this.setText(this.displayedText);
    }

    setText(text: string) {
        this.mainText.nativeElement.innerHTML = text.replace(/\n\r?/g, '<br />');
    }

    get buttonText(): string {
        return this.isExpanded ? 'see less' : 'see more';
    }
}
