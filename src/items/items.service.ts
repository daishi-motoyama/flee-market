import { Injectable, NotFoundException } from '@nestjs/common'
import { Item } from './items.model'
import { CreateItemsDto } from './dto/create-items.dto'
import { ItemStatus } from './items-status.enum'
import { v4 as uuidV4 } from 'uuid'

@Injectable()
export class ItemsService {
  private items: Item[] = []
  findAll(): Item[] {
    return this.items
  }

  findById(id: string): Item {
    const data = this.items.find((item) => item.id === id)
    if (!data) throw new NotFoundException()
    return data
  }

  create(createItemDto: CreateItemsDto): Item {
    const item: Item = {
      ...createItemDto,
      id: uuidV4(),
      status: ItemStatus.OnSale,
    }
    this.items.push(item)
    return item
  }

  update(
    id: string,
    values: Pick<Item, 'price' | 'name' | 'description'>,
  ): Item {
    const item = this.items.find((item) => item.id === id)
    item.price = values.price
    item.name = values.name
    item.description = values.description
    return item
  }

  delete(id: string): boolean {
    this.items = this.items.filter((item) => item.id !== id)
    return !!this.items.find((item) => item.id !== id)
  }
}
