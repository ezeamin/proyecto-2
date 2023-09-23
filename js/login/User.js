import { generateRandomId } from '../utilities.js';

export class User {
  constructor(email, password) {
    this.id = generateRandomId();
    this.email = email;
    this.password = password;
  }
}

export class UserWithoutPassword {
  constructor(email) {
    this.id = generateRandomId();
    this.email = email;
  }
}
