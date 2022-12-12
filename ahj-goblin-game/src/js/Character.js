export default class Character {
  constructor(name, boarSize) {
    this.name = name;
    this.boarSize = boarSize;
    this.currentPosition = Math.floor(Math.random() * boarSize ** 2);
  }

  get position() {
    return Math.floor(Math.random() * this.boarSize ** 2);
  }
}
