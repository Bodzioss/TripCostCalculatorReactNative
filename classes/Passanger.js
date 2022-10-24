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

    calculateFuelCost(fuelPrice, combustion){
      this.fuelCost = this.mileage && fuelPrice ? this.mileage *  (fuelPrice * combustion/100) : 0;
    }
  
}

export default Passenger;