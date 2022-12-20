import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoryCreateDto } from './dto/sub-category.create.dto';
import { SubCategory } from './entity/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findAll(): Promise<SubCategory[]> {
    return await this.subCategoryRepository.find();
  }

  async find({ id }): Promise<SubCategory[]> {
    return await this.subCategoryRepository.find({
      where: {
        maincategory: { id },
      },
    });
  }

  async create(subCategory: SubCategoryCreateDto): Promise<SubCategory> {
    const isDuplicate = await this.subCategoryRepository.findOne({
      where: {
        name: subCategory.name,
      },
    });
    if (isDuplicate) {
      throw new UnprocessableEntityException('duplicate sub category name');
    }
    return await this.subCategoryRepository
      .save({
        ...subCategory,
      })
      .catch((err) => {
        throw new UnprocessableEntityException(
          'invalid main category id or name',
        );
      });
  }

  async delete(id) {
    const isExist = await this.subCategoryRepository.findOne({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new UnprocessableEntityException('sub category not found');
    }
    const result = await this.subCategoryRepository.delete(id);
    return result.affected ? true : false;
  }
}
