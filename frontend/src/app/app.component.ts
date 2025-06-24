import { Component, inject } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  message = '';
  private readonly wsService = inject(WebSocketService);

  ngOnInit() {
    this.wsService.connect((message) => {
      this.message = message;
    });
  }
}
