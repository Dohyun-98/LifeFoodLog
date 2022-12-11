import { ApiProperty } from '@nestjs/swagger';

export class FoodLogCreateDto {
  @ApiProperty({
    example: 'foods:[1,2,3]',
    description: 'The foods of the FoodLog',
    type: String,
  })
  foods: string[];
}
