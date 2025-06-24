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
      webSocketFactory: () => new SockJS('http://localhost:9099/ws'),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('Conectado a WebSocket');

      this.client.subscribe('/topic/commit', (message) => {
        callback(message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };
    
    this.client.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
    };

    this.client.activate();
  }
}
