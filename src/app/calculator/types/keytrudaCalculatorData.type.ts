export type TKeytrudaCalculatorData = {
  page: 'HOSPITALES' | 'CENTROS ONCOLÓGICOS TOP PREMIUM' | 'CENTROS ONCOLÓGICOS TIER 1' | 'CENTROS ONCOLÓGICOS TIER 2' | 'CENTROS ONCOLÓGICOS TIER 3' | string;
  unitsPerProduct: string;
  pmp: number;
  comertialOfferDiscount: number;
  priceWithInitialOffer: number;
  units: number;
  stepOne: number;
  stepTwo: number;
  benefitPerStepOne: number;
  benefitPerStepTwo: number;
  comertialOfferPercentage: number;
  comertialPlan: number;
  sugestedPriceWithComertialPlan: number;
  rentabilityPerPiece: number;
  rentabilityPerCycle: number;
  benefitOnfourteenCycles: number;
};
