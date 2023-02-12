import { Injectable } from '@nestjs/common'
import { Item } from './items.model'

@Injectable()
export class ItemsService {
  private items: Item[] = []
  findAll(): Item[] {
    return this.items
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id)
  }

  create(item: Item): Item {
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
