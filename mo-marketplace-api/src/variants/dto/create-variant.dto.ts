import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({ example: 'Red' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 'M' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({ example: 'Cotton' })
  @IsString()
  @IsNotEmpty()
  material: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ example: 34.99, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}
