import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base-component',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.scss'
})
export class BaseComponent implements OnInit,AfterViewInit, OnDestroy{
  subscriptions!: Subscription[] ;

  constructor(
  ) {
    this.subscriptions = [];
   }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
