import { ApiProperty } from '@nestjs/swagger';

export class VariantResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  material: string;

  @ApiProperty()
  stock: number;

  @ApiProperty({ required: false })
  price: number | null;

  @ApiProperty()
  combinationKey: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
