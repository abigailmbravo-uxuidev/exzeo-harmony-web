export default {
	__v: 0,
	_id: '5ca744928001ef001258b375',
	additionalInterests:[],
	agencyCode: 20000,
	agentCode: 60000,
	companyCode: 'TTIC',
	coverageLimits: {
		dwelling: {
			amount: 314000,
			displayText: 'Dwelling',
			format: 'Currency',
			letterDesignation: 'A',
			maxAmount: 408000,
			minAmount: 283000,
			value: 314000
		},
		lossOfUse: {
			amount: 31400,
			displayText: 'Loss of Use',
			format: 'Percentage',
			letterDesignation: 'D',
			ofCoverageLimit: 'dwelling',
			value: 10
		},
		medicalPayments: {
			amount: 2000,
			displayText: 'Medical Payments',
			format: 'Currency',
			letterDesignation: 'F',
			value: 2000
		},
		moldLiability: {
			amount: 50000,
			displayText: 'Mold Liability',
			format: 'Currency',
			value: 50000
		},
		moldProperty: {
			amount: 10000,
			displayText: 'Mold Property',
			format: 'Currency',
			value: 10000
		},
		ordinanceOrLaw: {
			amount: 25,
			calculatedAmount: 78500,
			displayText: 'Ordinance or Law',
			format: 'Percentage',
			ofCoverageLimit: 'dwelling',
			value: 25
		},
		otherStructures: {
			amount: 6280,
			displayText: 'Other Structures',
			format: 'Currency',
			letterDesignation: 'B',
			value: 2
		},
		personalLiability: {
			amount: 300000,
			displayText: 'Personal Liability',
			format: 'Currency',
			letterDesignation: 'E',
			value: 300000
		},
		personalProperty: {
			amount: 78500,
			displayText: 'Personal Property',
			format: 'Currency',
			letterDesignation: 'C',
			value: 25
		}
	},
	coverageOptions: {
		liabilityIncidentalOccupancies: {
			answer: false,
			displayText: 'Liability Permitted Incidental Occupancies'
		},
		personalPropertyReplacementCost: {
			answer: true,
			displayText: 'Personal Property Replacement Cost'
		},
		propertyIncidentalOccupanciesMainDwelling: {
			answer: false,
			displayText: 'Property Permitted Incidental Occupancies Main Dwelling'
		},
		propertyIncidentalOccupanciesOtherStructures: {
			answer: false,
			displayText: 'Property Permitted Incidental Occupancies Other Structures'
		},
		sinkholePerilCoverage: {
			answer: true,
			displayText: 'Sinkhole Peril Coverage'
		}
	},
	createdAt: '2019-04-05T12:05:38.742Z',
	createdBy: {
		_id: '5ca744928001ef001258b376',
		userId: 'auth0|59419e3a43e76f16f68c3349',
		userName: 'tticcsr'
	},
	deductibles: {
		allOtherPerils: {
			amount: 1000,
			displayText: 'All Other Perils',
			format: 'Currency',
			value: 1000
		},
		hurricane: {
			amount: 2,
			calculatedAmount: 6280,
			displayText: 'Hurricane',
			format: 'Percentage',
			value: 2
		},
		sinkhole: {
			amount: 10,
			calculatedAmount: 31400,
			displayText: 'Sinkhole',
			format: 'Percentage',
			ofCoverageLimit: 'dwelling',
			value: 10
		}
	},
	effectiveDate: '2019-05-05',
	endDate: '2020-05-05T04:00:00.000Z',
	policyHolders: [],
	product: 'HO3',
	property: {
		townhouseRowhouse: false,
		pool: false,
		poolSecured: false,
		divingBoard: false,
		trampoline: false,
		fireAlarm: false,
		burglarAlarm: false,
		gatedCommunity: false,
		_id: '5ca744928001ef001258b378',
		buildingCodeEffectivenessGrading: 3,
		constructionType: 'MASONRY',
		distanceToFireHydrant: 264.052744,
		distanceToFireStation: 0.79,
		distanceToTidalWater: 17740.8,
		familyUnits: '1-2',
		floodZone: 'X',
		id: '12000000000000001',
		physicalAddress: {
			_id: '5ca744928001ef001258b379',
			address1: '4131 TEST ADDRESS',
			address2: '',
			city: 'SARASOTA',
			county: 'SARASOTA',
			latitude: 27.27967,
			longitude: -82.47786,
			state: 'FL',
			zip: '00001'
		},
		protectionClass: 3,
		residenceType: 'SINGLE FAMILY',
		source: 'CasaClue',
		sprinkler: 'N',
		squareFeet: 2640,
		territory: '715-51',
		timezone: 'America/New_York',
		windMitigation: {
			_id: '5ca744928001ef001258b37a',
			floridaBuildingCodeWindSpeed: 130,
			floridaBuildingCodeWindSpeedDesign: 130,
			internalPressureDesign: 'Other',
			openingProtection: 'Other',
			roofCovering: 'Other',
			roofDeckAttachment: 'Other',
			roofGeometry: 'Other',
			roofToWallConnection: 'Other',
			secondaryWaterResistance: 'Other',
			terrain: 'B',
			windBorneDebrisRegion: 'Yes'
		},
		yearBuilt: 1998,
		yearOfRoof: null
	},
	quoteInputState: 'Initial Data',
	quoteNumber: '12-5162296-01',
	quoteState: 'Quote Started',
	state: 'FL',
	underwritingAnswers: {
		business: {
			answer: 'No',
			question: 'Is a business conducted on the property?',
			source: 'Customer'
		},
		floodCoverage: {
			answer: 'Yes',
			question: 'Does this property have a separate insurance policy covering flood losses?',
			source: 'Default'
		},
		fourPointUpdates: {
			answer: 'Yes',
			question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
			source: 'Customer'
		},
		monthsOccupied: {
			answer: '10+',
			question: 'How many months a year does the owner live in the home?',
			source: 'Customer'
		},
		noPriorInsuranceSurcharge: {
			answer: 'No',
			question: 'If not new purchase, please provide proof of prior insurance.',
			source: 'Default'
		},
		previousClaims: {
			answer: 'No claims ever filed',
			question: 'How many claims in the past 5 years?',
			source: 'Customer'
		},
		rented: {
			answer: 'Never',
			question: 'Is the home or any structures on the property ever rented?',
			source: 'Customer'
		}
	},
	underwritingExceptions: [], 
	updatedAt: '2019-04-05T12:06:01.159Z',
	updatedBy: {
		_id: '5ca744a98001ef001258b421',
		userId: 'auth0|59419e3a43e76f16f68c3349',
		userName: 'tticcsr'
	}
};
