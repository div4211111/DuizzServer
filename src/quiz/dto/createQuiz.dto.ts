import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAndUpdateCategoryDto } from 'src/categories/dto/createCategory.dto';
import { CreateQuestionDto } from '../../question/dto/createQuestion.dto';

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Заголовок квиза',
        example: 'Любой заголовок',
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Описание квиза',
        example: 'Любое описание',
    })
    description: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Вопросы для квиза',
        example: [
            {
                title: 'Сколько будет 2+2?',
                answers: ['Два', 'Три', 'Четыре', 'Пять'],
                correctAnswer: 2,
            },
        ],
        type: [CreateQuestionDto],
    })
    questions: CreateQuestionDto[];

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Список категорий',
        example: [{ title: 'Математика' }, { title: 'История' }],
        type: [CreateAndUpdateCategoryDto],
    })
    categories?: CreateAndUpdateCategoryDto[];
}
