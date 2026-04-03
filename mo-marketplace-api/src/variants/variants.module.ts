import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  VariantsController,
  VariantsRootController,
} from './variants.controller';
import { VariantsService } from './variants.service';
import { Variant } from '../entities/variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variant])],
  controllers: [VariantsController, VariantsRootController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
