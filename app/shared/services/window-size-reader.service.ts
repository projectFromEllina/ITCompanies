import {Injectable} from '@angular/core';

export enum ScreenState {
    mobile,
    tablet,
    desktop
};

const mobileMaxWidth = 475;
const tabletMaxWidth = 1024;

@Injectable({
    providedIn: 'root'
})
export class WindowSizeReaderService {
    private payload = ScreenState.desktop;

    constructor() {
        this.onResizeWindow(window.innerWidth);
    }

    public get screenState(): ScreenState {
        return this.payload;
    }

    public onResizeWindow(width: number) {
        const mobile = width <= mobileMaxWidth;
        const tablet = width <= tabletMaxWidth && width > mobileMaxWidth;
        if(mobile) {
            this.payload = ScreenState.mobile;
        } else if (tablet) {
            this.payload = ScreenState.tablet;
        } else {
            this.payload = ScreenState.desktop;
        }
    }
}
