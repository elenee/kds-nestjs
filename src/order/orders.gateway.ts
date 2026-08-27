import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`)
  }

  @SubscribeMessage('joinKitchen')
  handleJoinKitchen(@ConnectedSocket() client: Socket) {
    client.join('kitchen')
    return { event: 'joinedKicthen', data: 'ok' }
  }

  @SubscribeMessage('joinTable')
  handleJoinTable(@MessageBody() data: { tableId: number }, @ConnectedSocket() client: Socket) {
    client.join(`table-${data.tableId}`)
    return { event: 'joinedTable', data: 'ok' }
  }

}
