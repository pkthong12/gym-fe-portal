import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  getMaxZIndex() {
      return Math.max(
        ...Array.from(this.document.querySelectorAll('body *'), el =>
          parseFloat(typeof window !== "undefined" ? window.getComputedStyle(el).zIndex : '0'),
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0,
      );
    
  }

  cssStringSizeToNumber(stringSize: string): number | undefined {
    if (!!!stringSize) return undefined
    const length = stringSize.length;
    let currentChar!: string;
    let digitFoundBefore: boolean = false;
    let result: string = ''
    for (let i = 0; i < length; i++) {
      currentChar = stringSize[i];
      if ('0123456789'.indexOf(currentChar) >= 0) {
        result += currentChar;
        digitFoundBefore = true;
      } else {
        if (digitFoundBefore) {
          break;
        }
      }
    }
    return Number(result);
  }

  getCssStringSizeUnit(stringSize: string): string | undefined {
    if (!!!stringSize) return undefined;
    const numberPart = this.cssStringSizeToNumber(stringSize)!;
    if (!!numberPart) {
      return stringSize.replace(numberPart!.toString(), '')
    } else {
      return undefined;
    }
  }

}