import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDTO {
  @ApiProperty()
  orderId?: string;

  @ApiProperty()
  movieId!: string;

  @ApiProperty()
  quantity!: number;
}
