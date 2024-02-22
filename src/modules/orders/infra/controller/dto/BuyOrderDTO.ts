import { ApiProperty } from '@nestjs/swagger';

export class BuyOrderDTO {
  @ApiProperty()
  orderId!: string;
}
