import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderDetailsService {
  getOrderDetails() {
    return { message: 'Ruta GET /order-details funcionando correctamente' };
  }
}
