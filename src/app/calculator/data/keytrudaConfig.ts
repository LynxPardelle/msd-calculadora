export const KeytrudaConfig = {
segmento: [
  {
    title: 'HOSPITALES',
    pmp: 99234.43,
    comertialOffer: function(){return this.pmp * .04},
    initialOfferPrice: function(){return this.pmp * 0.96},
    comertialOfferPercentage: 4,
    comertialPlan: 4,
    comertialPlanFinalPrice: function() {return this.pmp * 0.92},
    rentabilityPerPiece: function() {return this.pmp * 0.08},
    rentabilityPerCycle: function() {return this.rentabilityPerPiece() * 2},
    fourteenCyclesBenefit: function() {return this.rentabilityPerCycle() * 14},
    units: 80,
    stepOne: 80,
    stepTwo: 85,
    benefitPerStepOne: function() {return this.stepOne * 0.02 * this.pmp},
    benefitPerStepTwo: function() {return this.stepTwo * 0.04 * this.pmp},
  },
  {
    title: 'CENTROS ONCOLÓGICOS TOP PREMIUM',
    pmp: 99234.43,
    comertialOffer: function(){return this.pmp * .10},
    initialOfferPrice: function(){return this.pmp * 0.90},
    comertialOfferPercentage: 10,
    comertialPlan: 6,
    comertialPlanFinalPrice: function() {return this.pmp * 0.84},
    rentabilityPerPiece: function() {return this.pmp * 0.16},
    rentabilityPerCycle: function() {return this.rentabilityPerPiece() * 2},
    fourteenCyclesBenefit: function() {return this.rentabilityPerCycle() * 14},
    units: 80,
    stepOne: 80,
    stepTwo: 90,
    benefitPerStepOne: function() {return this.stepOne * 0.03 * this.pmp},
    benefitPerStepTwo: function() {return this.stepTwo * 0.06 * this.pmp},
  },
  {
    title: 'CENTROS ONCOLÓGICOS TIER 1',
    pmp: 99234.43,
    comertialOffer: function(){return this.pmp * 0.10},
    initialOfferPrice: function(){return this.pmp * 0.90},
    comertialOfferPercentage: 10,
    comertialPlan: 4,
    comertialPlanFinalPrice: function() {return this.pmp * 0.86},
    rentabilityPerPiece: function() {return this.pmp * 0.14},
    rentabilityPerCycle: function() {return this.rentabilityPerPiece() * 2},
    fourteenCyclesBenefit: function() {return this.rentabilityPerCycle() * 14},
    units: 80,
    stepOne: 80,
    stepTwo: 85,
    benefitPerStepOne: function() {return this.stepOne * 0.02 * this.pmp},
    benefitPerStepTwo: function() {return this.stepTwo * 0.04 * this.pmp},
  },
  {
    title: 'CENTROS ONCOLÓGICOS TIER 2',
    pmp: 99234.43,
    comertialOffer: function(){return this.pmp * 0.08},
    initialOfferPrice: function(){return this.pmp * 0.92},
    comertialOfferPercentage: 8,
    comertialPlan: 4,
    comertialPlanFinalPrice: function() {return this.pmp * 0.88},
    rentabilityPerPiece: function() {return this.pmp * 0.12},
    rentabilityPerCycle: function() {return this.rentabilityPerPiece() * 2},
    fourteenCyclesBenefit: function() {return this.rentabilityPerCycle() * 14},
    units: 80,
    stepOne: 80,
    stepTwo: 85,
    benefitPerStepOne: function() {return this.stepOne * 0.02 * this.pmp},
    benefitPerStepTwo: function() {return this.stepTwo * 0.04 * this.pmp},
  },
  {
    title: 'CENTROS ONCOLÓGICOS TIER 3',
    pmp: 99234.43,
    comertialOffer: function(){return this.pmp * 0.08},
    initialOfferPrice: function(){return this.pmp * 0.92},
    comertialOfferPercentage: 8,
    comertialPlan: 2,
    comertialPlanFinalPrice: function() {return this.pmp * 0.90},
    rentabilityPerPiece: function() {return this.pmp * 0.10},
    rentabilityPerCycle: function() {return this.rentabilityPerPiece() * 2},
    fourteenCyclesBenefit: function() {return this.rentabilityPerCycle() * 14},
    units: 80,
    stepOne: 80,
    stepTwo: 85,
    benefitPerStepOne: function() {return this.stepOne * 0.01 * this.pmp},
    benefitPerStepTwo: function() {return this.stepTwo * 0.02 * this.pmp},
  }
]
};
