import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class AppComponent {
}
