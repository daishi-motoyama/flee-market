import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ItemsService } from './items.service'
import { Item } from './items.model'
import { ItemStatus } from './items-status.enum'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id)
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.create({
      id,
      name,
      price,
      description,
      status: ItemStatus.OnSale,
    })
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
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
  delete(@Param('id') id: string): boolean {
    return this.itemsService.delete(id)
  }
}
