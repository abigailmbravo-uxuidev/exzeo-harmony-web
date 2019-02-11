const quoteConfig = {
  // coverageDetails in documentConfiguration
  configForForm: [
    {
      name: 'sinkholePerilCoverage',
      displayText: 'Sinkhole Peril Coverage',
      default: '${it.zipCodeSettings.coverageOptions.sinkholePerilCoverage.defaultAnswer || false}'
    },
    {
      name: 'propertyIncidentalOccupanciesOtherStructures',
      displayText: 'Property Permitted Incidental Occupancies Other Structures',
      default: false

    },
    {
      name: 'liabilityIncidentalOccupancies',
      displayText: 'Liability Permitted Incidental Occupancies',
      default: false
    },
    {
      name: 'personalPropertyReplacementCost',
      displayText: 'Personal Property Replacement Cost',
      default: '${it.zipCodeSettings.coverageOptions.personalPropertyReplacementCost.defaultAnswer}'
    },
    {
      name: 'propertyIncidentalOccupanciesMainDwelling',
      displayText: 'Property Permitted Incidental Occupancies Main Dwelling',
      default: false
    },
    {
      name: 'dwelling',
      required: true,
      amount: '${it.coverageLimits.dwelling.amount}',
      letterDesignation: 'A',
      maxAmount: '${Math.min(Math.max(Math.round(it.coverageLimits.dwelling.amount * 1.3/1000) * 1000, 125000), 1200000)}',
      minAmount: '${Math.min(Math.max(Math.round(it.coverageLimits.dwelling.amount * 0.9/1000) * 1000, 125000), 1200000)}',
      initialValue: '${Math.round(it.property.coverageLimits.dwelling.amount/1000) * 1000}',
      displayText: 'Dwelling'
    },
    {
      name: 'lossOfUse',
      required: true,
      amount: '${(it.coverageLimits.lossOfUse.amount / 100) * it.coverageLimits.dwelling.amount}',
      letterDesignation: 'D',
      initialValue: '${it.coverageLimits.dwelling.value * 0.1}',
      displayText: 'Loss of Use'
    },
    {
      name: 'personalProperty',
      amount: '${(it.coverageLimits.personalProperty.amount / 100) * it.coverageLimits.dwelling.amount}',
    },
    {
      name: 'otherStructures',
      amount: '${(it.coverageLimits.otherStructures.amount / 100) * it.coverageLimits.dwelling.amount}',
    },
    {
      name: 'medicalPayments',
      required: true,
      amount: '${it.coverageLimits.medicalPayments.value}',
      letterDesignation: 'F',
      initialValue: 2000,
      displayText: 'Medical Payments'
    },
    {
      name: 'moldProperty',
      required: true,
      amount: '${it.coverageLimits.moldProperty.value}',
      initialValue: 10000,
      displayText: 'Mold Property'
    },
    {
      name: 'ordinanceOrLaw',
      required: true,
      amount: '${it.coverageLimits.ordinanceOrLaw.value / 100 * it.coverageLimits.dwelling.value}',
      initialValue: 25,
      displayText: 'Ordinance or Law'
    },
    {
      name: 'personalLiability',
      required: true,
      amount: '${it.coverageLimits.personalLiability.value}',
      letterDesignation: 'E',
      initialValue: '${it.zipCodeSettings.coverageLimits.personalLiability.defaultAmount}',
      displayText: 'Personal Liability'
    },
    {
      name: 'moldLiability',
      required: true,
      amount: '${it.coverageLimits.moldLiability.value}',
      initialValue: 50000,
      displayText: 'Mold Liability'
    },
    {
      name: 'hurricane',
      required: true,
      amount: '${it.deductibles.hurricane.value / 100 * it.coverageLimits.dwelling.value}',
      displayText: 'Hurricane',
      initialValue: 2
    },
    {
      name: 'allOtherPerils',
      required: true,
      amount: '${it.deductibles.allOtherPerils.value}',
      displayText: 'All Other Perils',
      initialValue: 1000
    },
    {
      name: 'sinkhole',
      required: '${it.coverageOptions.sinkholePerilCoverage.answer}',
      amount: '${it.deductibles.sinkhole.value / 100 * it.coverageLimits.dwelling.value}',
      displayText: 'Sinkhole',
      initialValue: 10
    }
  ]
};

export default quoteConfig;
