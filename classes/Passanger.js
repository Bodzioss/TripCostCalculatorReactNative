import AdditionalCost from "./AdditionalCost";

class Passenger{
    constructor(name, mileage){
      this.id = 'P' + Math.random().toString();
      this.name = name,
      this.mileage = mileage,
      this.fuelCost = 0,
      this.additionalCosts = [];
    }
  
    addAdditionalCost(name, price){
      this.additionalCosts.push(new AdditionalCost(name, price));
    }
  
}

export default Passenger;