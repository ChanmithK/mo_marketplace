import { ApiProperty } from '@nestjs/swagger';
import { VariantResponseDto } from '../../variants/dto/variant-response.dto';

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  basePrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [VariantResponseDto], required: false })
  variants?: VariantResponseDto[];
}
