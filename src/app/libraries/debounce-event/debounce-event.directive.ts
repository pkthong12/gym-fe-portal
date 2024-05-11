import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output
  } from '@angular/core';
  import { Subject, Subscription } from 'rxjs';
  import { debounceTime } from 'rxjs/operators';
  
  @Directive({
    selector: '[appDebounce]',
    standalone: true
  })
  export class DebounceDirective implements OnInit, OnDestroy {
    @Input() debounceTime = 400;
    @Output() debounceClick = new EventEmitter();
    @Output() debounceKeyUp = new EventEmitter();
    private clicks = new Subject();
    private keyUps = new Subject();
    private subscription: Subscription[] = [];
  
    constructor() {}
  
    ngOnInit() {
      this.subscription.push(
        this.clicks
        .pipe(debounceTime(this.debounceTime))
        .subscribe(e => this.debounceClick.emit(e)),

        this.keyUps
        .pipe(debounceTime(this.debounceTime))
        .subscribe(e => this.debounceKeyUp.emit(e)),
    );
    }
  
    ngOnDestroy() {
      this.subscription.map(x=> x.unsubscribe());
    }
  
    @HostListener('click', ['$event'])
    clickEvent(event:any) {
      event.preventDefault();
      event.stopPropagation();
      this.clicks.next(event);
    }
    @HostListener('keyup', ['$event'])
    keyupEvent(event:any) {
      event.preventDefault();
      event.stopPropagation();
      this.keyUps.next(event);
    }
  }