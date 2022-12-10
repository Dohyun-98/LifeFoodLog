import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entity/main-category.entity';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findAll(): Promise<MainCategory[]> {
    return await this.mainCategoryRepository.find();
  }

  async create(name: string): Promise<MainCategory> {
    const isDuplicate = await this.mainCategoryRepository.findOne({
      where: {
        name,
      },
    });
    if (isDuplicate) {
      throw new UnprocessableEntityException('duplicate main category name');
    }
    return await this.mainCategoryRepository.save({
      name,
    });
  }
}
