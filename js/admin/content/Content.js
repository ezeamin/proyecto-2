import { generateRandomId } from '../../utilities.js';

export class Content {
  constructor(name, type, category, cover, trailer, description, isPublished) {
    this.id = generateRandomId();
    this.name = name;
    this.typeId = type;
    this.categoryId = category;
    this.cover = cover;
    this.trailer = trailer;
    this.description = description;
    this.isPublished = isPublished === 'on';
  }
}
