import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../../libraries/tooltip/tooltip.module';

declare var Zenix: any;
@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TooltipModule,
    FormsModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss'
})
export class NavigatorComponent implements AfterViewInit {
  data:any[]=[];
  constructor(
    private authService: AuthService
  ){
    
  }
  ngAfterViewInit(): void {
    Zenix.init();
  }
  ngOnInit() {
    this.data = this.authService.data$.value?.decentralization;
  }
}
