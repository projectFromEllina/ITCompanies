import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-waiter-loader',
  templateUrl: './waiter-loader.component.html',
  styleUrls: ['./waiter-loader.component.less']
})
export class WaiterLoaderComponent {
  @Input() isShowLoader: boolean = false;
}
