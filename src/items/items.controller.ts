import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ItemsService } from './items.service'
import { Item } from './items.model'
import { CreateItemsDto } from './dto/create-items.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll()
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.findById(id)
  }

  @Post()
  create(@Body() createItemDto: CreateItemsDto): Item {
    return this.itemsService.create(createItemDto)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.update(id, {
      name,
      description,
      price,
    })
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): boolean {
    return this.itemsService.delete(id)
  }
}
