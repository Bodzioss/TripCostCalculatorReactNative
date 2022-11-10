class AdditionalCost{
    constructor(name, price=0){
      this.id = 'AC' + Math.random().toString();
      this.name = name,
      this.price = price
    }
}

export default AdditionalCost;
