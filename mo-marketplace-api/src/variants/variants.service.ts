import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from '../entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private variantsRepository: Repository<Variant>,
  ) {}

  private generateCombinationKey(
    color: string,
    size: string,
    material: string,
  ): string {
    return `${color.toLowerCase()}-${size.toLowerCase()}-${material.toLowerCase()}`;
  }

  async create(
    productId: string,
    createVariantDto: CreateVariantDto,
  ): Promise<Variant> {
    const combinationKey = this.generateCombinationKey(
      createVariantDto.color,
      createVariantDto.size,
      createVariantDto.material,
    );

    // Check for duplicate combination
    const existingVariant = await this.variantsRepository.findOne({
      where: { combinationKey },
    });

    if (existingVariant) {
      throw new ConflictException(
        `Variant with combination "${combinationKey}" already exists`,
      );
    }

    const variant = this.variantsRepository.create({
      ...createVariantDto,
      productId,
      combinationKey,
    });

    return this.variantsRepository.save(variant);
  }

  async update(
    id: string,
    updateVariantDto: UpdateVariantDto,
  ): Promise<Variant> {
    const variant = await this.findOne(id);

    // If updating color, size, or material, check for duplicates
    if (
      updateVariantDto.color ||
      updateVariantDto.size ||
      updateVariantDto.material
    ) {
      const newCombinationKey = this.generateCombinationKey(
        updateVariantDto.color || variant.color,
        updateVariantDto.size || variant.size,
        updateVariantDto.material || variant.material,
      );

      if (newCombinationKey !== variant.combinationKey) {
        const existingVariant = await this.variantsRepository.findOne({
          where: { combinationKey: newCombinationKey },
        });

        if (existingVariant && existingVariant.id !== id) {
          throw new ConflictException(
            `Variant with combination "${newCombinationKey}" already exists`,
          );
        }

        variant.combinationKey = newCombinationKey;
      }
    }

    Object.assign(variant, updateVariantDto);
    return this.variantsRepository.save(variant);
  }

  async remove(id: string): Promise<void> {
    const variant = await this.findOne(id);
    await this.variantsRepository.remove(variant);
  }

  async findOne(id: string): Promise<Variant> {
    const variant = await this.variantsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!variant) {
      throw new NotFoundException(`Variant with ID "${id}" not found`);
    }

    return variant;
  }

  async findByProduct(productId: string): Promise<Variant[]> {
    return this.variantsRepository.find({
      where: { productId },
    });
  }
}
