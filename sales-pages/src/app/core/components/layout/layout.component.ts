import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule, 
    // HeaderComponent, 
    // FooterComponent, 
    // SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarOpen: boolean = true; 

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}