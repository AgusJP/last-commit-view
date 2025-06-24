import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client!: Client;

  connect(callback: (message: string) => void) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('https://3250-45-15-1-205.ngrok-free.app/ws'),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('Conectado a WebSocket');

      this.client.subscribe('/topic/commit', (message) => {
        callback(message.body);
      });
    };

    this.client.activate();
  }
}
