import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDTO {
  @ApiProperty()
  quantity: number;
}
