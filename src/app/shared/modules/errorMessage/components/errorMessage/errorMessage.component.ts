import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-errorMessage',
  template: '<div>{{messageProps}}</div>',
})
export class ErrorMessageComponent {
  @Input('message') messageProps: string = 'Something went wrong';
  constructor() {}
}
