export const customizeList = {
	uiQuestions: {
		coverageLimits: [],
		dwellingAmount: [],
		otherStructuresAmount: [
			{
				answer: 0,
				label: '0%'
			},
			{
				answer: 2,
				label: '2%'
			},
			{
				answer: 5,
				label: '5%'
			},
			{
				answer: 10,
				label: '10%'
			}
		],
		personalPropertyAmount: [
			{
				answer: 0,
				label: '0%'
			},
			{
				answer: 25,
				label: '25%'
			},
			{
				answer: 35,
				label: '35%'
			},
			{
				answer: 50,
				label: '50%'
			}
		],
		personalPropertyReplacementCostCoverage: [],
		lossOfUseAmount: [],
		personalLiability: [
			{
				answer: 100000,
				label: '$ 100,000'
			},
			{
				answer: 300000,
				label: '$ 300,000'
			}
		],
		medicalPayments: [],
		moldProperty: [
			{
				answer: 10000,
				label: '$ 10,000'
			},
			{
				answer: 25000,
				label: '$ 25,000'
			},
			{
				answer: 50000,
				label: '$ 50,000'
			}
		],
		moldLiability: [
			{
				answer: 50000,
				label: '$ 50,000'
			},
			{
				answer: 100000,
				label: '$ 100,000'
			}
		],
		ordinanceOrLaw: [
			{
				answer: 25,
				label: '25% of Dwelling Limit'
			},
			{
				answer: 50,
				label: '50% of Dwelling Limit'
			}
		],
		coverageOptions: [],
		propertyIncidentalOccupancies: [
			{
				answer: 'Main Dwelling'
			},
			{
				answer: 'Other Structures'
			},
			{
				answer: 'None'
			}
		],
		sinkholePerilCoverage: [],
		deductibles: [],
		allOtherPerils: [
			{
				answer: 500,
				label: '$ 500'
			},
			{
				answer: 1000,
				label: '$ 1,000'
			},
			{
				answer: 2500,
				label: '$ 2,500'
			}
		],
		hurricane: [
			{
				answer: 2,
				label: '2% of Dwelling Limit'
			},
			{
				answer: 5,
				label: '5% of Dwelling Limit'
			},
			{
				answer: 10,
				label: '10% of Dwelling Limit'
			}
		],
		sinkhole: [
			{
				answer: 10,
				label: '10% of Dwelling Limit'
			}
		],
		windMitigation: [],
		roofCovering: [
			{
				answer: 'Non-FBC'
			},
			{
				answer: 'FBC'
			},
			{
				answer: 'Other'
			}
		],
		roofDeckAttachment: [
			{
				answer: 'A'
			},
			{
				answer: 'B'
			},
			{
				answer: 'C'
			},
			{
				answer: 'D'
			},
			{
				answer: 'Concrete'
			},
			{
				answer: 'Other'
			}
		],
		roofToWallConnection: [
			{
				answer: 'Toe Nails'
			},
			{
				answer: 'Clips'
			},
			{
				answer: 'Single Wraps'
			},
			{
				answer: 'Double Wraps'
			},
			{
				answer: 'Other'
			}
		],
		roofGeometry: [
			{
				answer: 'Flat'
			},
			{
				answer: 'Gable'
			},
			{
				answer: 'Hip'
			},
			{
				answer: 'Other'
			}
		],
		secondaryWaterResistance: [
			{
				answer: 'Yes'
			},
			{
				answer: 'No'
			},
			{
				answer: 'Other'
			}
		],
		openingProtection: [
			{
				answer: 'None'
			},
			{
				answer: 'Basic'
			},
			{
				answer: 'Hurricane'
			},
			{
				answer: 'Other'
			}
		],
		floridaBuildingCodeWindSpeed: [],
		floridaBuildingCodeWindSpeedDesign: [],
		windBorneDebrisRegion: [
			{
				answer: 'Yes'
			},
			{
				answer: 'No'
			},
			{
				answer: 'Other'
			}
		],
		internalPressureDesign: [
			{
				answer: 'Enclosed'
			},
			{
				answer: 'Partial'
			},
			{
				answer: 'Other'
			}
		],
		terrain: [
			{
				answer: 'B'
			},
			{
				answer: 'C'
			},
			{
				answer: 'HVHZ'
			},
			{
				answer: 'Other'
			}
		],
		discounts: [],
		burglarAlarm: [],
		fireAlarm: [],
		sprinkler: [
			{
				answer: 'N'
			},
			{
				answer: 'A'
			},
			{
				answer: 'B'
			}
		]
	}
};

export const mailingBillingList = {
	billingConfig: {
		defaultBillToId: '5cab592e08bb5f0014863877',
		billToConfig: {
			'5cab592e08bb5f0014863877': {
				billToType: 'Policyholder',
				availablePlans: ['Annual', 'Semi-Annual', 'Quarterly'],
				payPlanOptions: [
					{ label: 'Annual', answer: 'Annual' },
					{ label: 'Semi-Annual', answer: 'Semi-Annual' },
					{ label: 'Quarterly', answer: 'Quarterly' }
				]
			}
		},
		billingOptions: [
			{ answer: "5cab592e08bb5f0014863877", label: "Policyholder" }
		],
		paymentPlans: {
			annual: {
				amount: 2667,
				dueDate: '2019-05-08T04:00:00.000Z'
			},
			quarterly: {
				q1: {
					amount: 1096,
					dueDate: '2019-05-08T04:00:00.000Z'
				},
				q2: {
					amount: 531,
					dueDate: '2019-08-06T04:00:00.000Z'
				},
				q3: {
					amount: 531,
					dueDate: '2019-11-04T05:00:00.000Z'
				},
				q4: {
					amount: 531,
					dueDate: '2020-02-02T05:00:00.000Z'
				}
			},
			semiAnnual: {
				s1: {
					amount: 1624,
					dueDate: '2019-05-08T04:00:00.000Z'
				},
				s2: {
					amount: 1059,
					dueDate: '2019-11-04T05:00:00.000Z'
				}
			}
		}
	},
	uiQuestions: {
		address1: [], address2: [], city: [], state: [], zip: []
	}
};

export const underwritingList = {
	uiQuestions: {
		rented: [
			{
				answer: 'Yes'
			},
			{
				answer: 'Occasionally'
			},
			{
				answer: 'Never'
			}
		],
		previousClaims: [
			{
				answer: '0',
				label: 'No claims in the last 5 years.'
			},
			{
				answer: '1'
			},
			{
				answer: '2'
			},
			{
				answer: '3+'
			},
			{
				answer: 'Unknown'
			}
		],
		monthsOccupied: [
			{
				answer: '0-3'
			},
			{
				answer: '4-6'
			},
			{
				answer: '7-9'
			},
			{
				answer: '10+'
			}
		],
		fourPointUpdates: [
			{
				answer: 'Yes'
			},
			{
				answer: 'No'
			},
			{
				answer: 'Unknown'
			}
		],
		floodCoverage: [
			{
				answer: 'Yes'
			},
			{
				answer: 'No'
			},
			{
				answer: 'Unsure'
			}
		]
	},
	underwritingQuestions: [
		{
			name: 'rented',
			hidden: false,
			label: 'Is the home or any structures on the property ever rented?',
			defaultValue: '',
			validation: [
				'isRequired'
			],
			options: [
				{
					answer: 'Yes',
					label: 'Yes'
				},
				{
					answer: 'Occasionally',
					label: 'Occasionally'
				},
				{
					answer: 'Never',
					label: 'Never'
				}
			]
		},
		{
			name: 'previousClaims',
			hidden: false,
			label: 'When was the last claim filed?',
			defaultValue: '',
			validation: [
				'isRequired'
			],
			options: [
				{
					answer: 'No claims ever filed',
					label: 'No claims ever filed'
				},
				{
					answer: 'Less than 3 Years',
					label: 'Less than 3 Years'
				},
				{
					answer: '3-5 Years',
					label: '3-5 Years'
				},
				{
					answer: 'Over 5 Years',
					label: 'Over 5 Years'
				},
				{
					answer: 'Unknown',
					label: 'Unknown'
				}
			]
		},
		{
			name: 'monthsOccupied',
			hidden: false,
			label: 'How many months a year does the owner live in the home?',
			defaultValue: '',
			validation: [
				'isRequired'
			],
			options: [
				{
					answer: '0-3',
					label: '0-3'
				},
				{
					answer: '4-6',
					label: '4-6'
				},
				{
					answer: '7-9',
					label: '7-9'
				},
				{
					answer: '10+',
					label: '10+'
				}
			]
		},
		{
			name: 'fourPointUpdates',
			hidden: false,
			label: 'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
			defaultValue: 'Yes',
			validation: [
				'isRequired'
			],
			options: [
				{
					answer: 'Yes',
					label: 'Yes'
				},
				{
					answer: 'No',
					label: 'No'
				},
				{
					answer: 'Unknown',
					label: 'Unknown'
				}
			]
		},
		{
			name: 'business',
			hidden: false,
			label: 'Is a business conducted on the property?',
			defaultValue: '',
			validation: [
				'isRequired'
			],
			options: [
				{
					answer: 'Yes',
					label: 'Yes'
				},
				{
					answer: 'No',
					label: 'No'
				}
			]
		}
	],
};
