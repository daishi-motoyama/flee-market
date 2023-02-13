import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateItemsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string

  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  price: number

  @IsString()
  @IsNotEmpty()
  description: string
}
