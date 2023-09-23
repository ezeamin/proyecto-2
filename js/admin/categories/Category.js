import {
  generateRandomId,
  setFirstLetterToUpperCase,
} from '../../utilities.js';

export class Category {
  constructor(name) {
    const formattedName = setFirstLetterToUpperCase(name).trim();

    this.id = generateRandomId();
    this.name = formattedName;
  }
}
