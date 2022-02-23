import { Directive, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[cdkTextareaAutosize]',
})
export class TextFieldAutosizeTextareaExample {
  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
