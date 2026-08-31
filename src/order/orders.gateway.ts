import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server

  constructor(private jwtService: JwtService) { }

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;
      if (!token) throw new UnauthorizedException('No token provided');

      const payload = this.jwtService.verify(token)
      client.data.user = payload

      console.log(`Client connected: ${client.id} (${payload.sub}, ${payload.role})`)
    } catch (error: any) {
      console.log(`Client rejected: ${client.id} - ${error.message}`);
      client.emit('error', 'Unauthorized');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`)
  }

  @SubscribeMessage('joinKitchen')
  handleJoinKitchen(@ConnectedSocket() client: Socket) {
    if(client.data.user?.role !== 'KITCHEN' && client.data.user?.role !== 'ADMIN') {
      client.emit('error', 'Forbidden: kitchen role required')
      return
    }
    client.join('kitchen')
    return { event: 'joinedKitchen', data: 'ok' }
  }

  @SubscribeMessage('joinTable')
  handleJoinTable(@MessageBody() data: { tableId: number }, @ConnectedSocket() client: Socket) {
    client.join(`table-${data.tableId}`)
    return { event: 'joinedTable', data: 'ok' }
  }

}
