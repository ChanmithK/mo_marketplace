import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateVariantDto } from './create-variant.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateVariantDto extends PartialType(
  OmitType(CreateVariantDto, ['color', 'size', 'material'] as const),
) {
  @ApiProperty({ example: 'Red', required: false })
  @IsString()
  @IsNotEmpty()
  color?: string;

  @ApiProperty({ example: 'M', required: false })
  @IsString()
  @IsNotEmpty()
  size?: string;

  @ApiProperty({ example: 'Cotton', required: false })
  @IsString()
  @IsNotEmpty()
  material?: string;
}
