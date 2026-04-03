import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VariantResponseDto } from './dto/variant-response.dto';

@ApiTags('Variants')
@Controller('products/:productId/variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new variant for a product' })
  @ApiResponse({ status: 201, type: VariantResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 409, description: 'Duplicate variant combination' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    return this.variantsService.create(productId, createVariantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all variants for a product' })
  @ApiResponse({ status: 200, type: [VariantResponseDto] })
  findAll(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.variantsService.findByProduct(productId);
  }
}

@Controller('variants')
export class VariantsRootController {
  constructor(private readonly variantsService: VariantsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a variant by ID' })
  @ApiResponse({ status: 200, type: VariantResponseDto })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.variantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a variant' })
  @ApiResponse({ status: 200, type: VariantResponseDto })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  @ApiResponse({ status: 409, description: 'Duplicate variant combination' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.variantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a variant' })
  @ApiResponse({ status: 200, description: 'Variant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.variantsService.remove(id);
  }
}
