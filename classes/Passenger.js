import AdditionalCost from "./AdditionalCost";

class Passenger{
    constructor(name, mileage, fuelCost = 0, additionalCosts = []){
      this.id = 'P' + Math.random().toString();
      this.name = name,
      this.mileage = mileage,
      this.fuelCost = fuelCost,
      this.additionalCosts = additionalCosts;
    }
  
    addAdditionalCost(name, price){
      this.additionalCosts.push(new AdditionalCost(name, price));
    }

    calculateFuelCost(fuelPrice, combustion){
      this.fuelCost = this.mileage ? this.mileage *  (fuelPrice * combustion / 100) : 0;
    }
}

export default Passenger;