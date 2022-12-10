class Address {
  constructor(street, name, postalCode, city) {
    (this.street = street),
      (this.name = name),
      (this.postalCode = postalCode),
      (this.city = city);
  }

  toString() {
    return `${this.street} ${this.name}, ${this.postalCode} ${this.city}`;
  }
}

export default Address;
