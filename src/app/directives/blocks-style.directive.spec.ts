import { BlocksStyleDirective } from './blocks-style.directive';
import {ElementRef} from "@angular/core";

describe('BlocksStyleDirective', () => {
  it('should create an instance', () => {
    const directive = new BlocksStyleDirective(new ElementRef<any>(0));
    expect(directive).toBeTruthy();
  });
});
