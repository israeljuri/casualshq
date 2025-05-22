import { AdjustmentItem, StaffMember } from '@/features/(dashboard)/types';

const staffs: StaffMember[] = [
  {
    id: '90ba07e5-1ac2-44f7-94ff-f9f19861224a',
    title: 'Mx.',
    firstName: 'Susan',
    otherNames: 'Deanna',
    lastName: 'Nunez',
    email: 'frios@sullivan.com',
    phoneNumber: '(578)980-2538',
    role: 'Software Engineer',
    team: 'Engineering',
    status: 'inactive',
    homeAddress: {
      line1: '08173 Shari Via Suite 367',
      streetName: 'Amy Shoals',
      city: 'North Kristinchester',
      postcode: '77197',
      state: 'OK',
      country: 'Haiti',
    },
    emergencyContact: {
      relationship: 'Frito',
      name: 'Jennifer Russo',
      phoneNumber: '001-841-030-1668x799',
      address: '785 Rhodes Glen Suite 627\nPort Matthewfort, NC 44688',
    },
    financialInformation: {
      taxFileNumber: '142-61-1965',
      bankBSB: '389-915',
      accountName: 'Bonnie Jarvis',
      accountNumber: 'GB04RZHQ11582400821695',
      superFundName: 'Hampton, Mann and Lewis',
      fundABN: '68 45 27 47',
      memberNumber: '1066695636244',
    },
    wageType: 'team_based',
    manualRatePerHour: undefined,
    teamBasedRate: 51,
    awardRate: undefined,
    timeLogs: [
      {
        id: 'b4d9bf6d-273d-4bdb-96a1-82553eb8807b',
        date: '2024-07-03',
        clockInTime: '2024-07-03T09:00:00',
        clockOutTime: '2024-07-03T19:00:00',
        breaks: [
          {
            id: '1',
            from: '2024-07-03 11:00:00',
            to: '2024-07-03 11:30:00',
            type: 'lunch',
          },
        ],
      },
      {
        id: '347f2392-61c5-4f60-b8cb-b0d2ba6d00dd',
        date: '2025-04-14',
        clockInTime: '2025-04-14T09:00:00',
        clockOutTime: '2025-04-14T16:00:00',
        breaks: [
          {
            id: '1',
            from: '2025-04-14 11:00:00',
            to: '2025-04-14 11:30:00',
            type: 'lunch',
          },
        ],
      },
      {
        id: '2d9de3a8-ddd3-49ff-b0b1-f5e016f1c637',
        date: '2024-06-30',
        clockInTime: '2024-06-30T07:00:00',
        clockOutTime: '2024-06-30T13:00:00',
        breaks: [
          {
            id: '1',
            from: '2024-06-30 09:00:00',
            to: '2024-06-30 09:30:00',
            type: 'lunch',
          },
        ],
      },
      {
        id: '6c6f64fa-c6e8-4912-8839-dafe1efabbbd',
        date: '2025-05-14',
        clockInTime: '2025-05-14T09:00:00',
        clockOutTime: '2025-05-14T19:00:00',
        breaks: [
          {
            id: '1',
            from: '2025-05-14 11:00:00',
            to: '2025-05-14 11:30:00',
            type: 'lunch',
          },
        ],
      },
      {
        id: '4ea477c6-7897-47a6-80b0-f437a01d1fe9',
        date: '2024-11-30',
        clockInTime: '2024-11-30T07:00:00',
        clockOutTime: '2024-11-30T15:00:00',
        breaks: [
          {
            id: '1',
            from: '2024-11-30 09:00:00',
            to: '2024-11-30 09:30:00',
            type: 'lunch',
          },
        ],
      },
      {
        id: '136eba37-0a9e-415a-97dd-211fff15ee23',
        date: '2024-09-07',
        clockInTime: '2024-09-07T08:00:00',
        clockOutTime: '2024-09-07T17:00:00',
        breaks: [
          {
            from: '2024-09-07 10:00:00',
            to: '2024-09-07 10:30:00',
          },
        ],
      },
      {
        id: '86a94940-6e32-4734-90f6-211b1ca2b167',
        date: '2024-06-17',
        clockInTime: '2024-06-17T09:00:00',
        clockOutTime: '2024-06-17T18:00:00',
        breaks: [
          {
            from: '2024-06-17 11:00:00',
            to: '2024-06-17 11:30:00',
          },
        ],
      },
      {
        id: 'fcb4d329-fffd-425a-bbfa-f27d93ec824a',
        date: '2024-07-12',
        clockInTime: '2024-07-12T08:00:00',
        clockOutTime: '2024-07-12T17:00:00',
        breaks: [
          {
            from: '2024-07-12 10:00:00',
            to: '2024-07-12 10:30:00',
          },
        ],
      },
      {
        id: 'daaab48d-05b8-4287-8a40-3cc648bb4c4e',
        date: '2024-11-28',
        clockInTime: '2024-11-28T09:00:00',
        clockOutTime: '2024-11-28T18:00:00',
        breaks: [
          {
            from: '2024-11-28 11:00:00',
            to: '2024-11-28 11:30:00',
          },
        ],
      },
      {
        id: 'aeb2441f-3f1f-4ca1-a99c-b59587405c13',
        date: '2024-07-24',
        clockInTime: '2024-07-24T07:00:00',
        clockOutTime: '2024-07-24T16:00:00',
        breaks: [
          {
            from: '2024-07-24 09:00:00',
            to: '2024-07-24 09:30:00',
          },
        ],
      },
      {
        id: '1e091b18-8660-4ea6-b481-c9b591b9429f',
        date: '2025-04-09',
        clockInTime: '2025-04-09T07:00:00',
        clockOutTime: '2025-04-09T17:00:00',
        breaks: [
          {
            from: '2025-04-09 09:00:00',
            to: '2025-04-09 09:30:00',
          },
        ],
      },
      {
        id: '4d89e7d4-114f-4748-9259-1d85c17caeca',
        date: '2024-05-28',
        clockInTime: '2024-05-28T09:00:00',
        clockOutTime: '2024-05-28T15:00:00',
        breaks: [
          {
            from: '2024-05-28 11:00:00',
            to: '2024-05-28 11:30:00',
          },
        ],
      },
      {
        id: '857eb0d6-c676-4109-9564-545826be89ce',
        date: '2025-02-28',
        clockInTime: '2025-02-28T08:00:00',
        clockOutTime: '2025-02-28T17:00:00',
        breaks: [
          {
            from: '2025-02-28 10:00:00',
            to: '2025-02-28 10:30:00',
          },
        ],
      },
    ],
  },
  {
    id: '7617ba75-f093-4ab7-ba36-3fdb839aff15',
    title: 'Mr.',
    firstName: 'Henry',
    otherNames: 'Natasha',
    lastName: 'Taylor',
    email: 'patrick61@gmail.com',
    phoneNumber: '802.151.1263x52899',
    role: 'QA Analyst',
    team: 'QA',
    status: 'inactive',
    homeAddress: {
      line1: '9636 Robert Villages Apt. 907',
      streetName: 'Rice Cove',
      city: 'Port Meganville',
      postcode: '05731',
      state: 'DC',
      country: 'Suriname',
    },
    emergencyContact: {
      relationship: 'Sibling',
      name: 'Keith Lowery',
      phoneNumber: '001-389-446-4677',
      address: '545 Frederick Rapids\nDorisfort, MA 44856',
    },
    financialInformation: {
      taxFileNumber: '477-61-9630',
      bankBSB: '280-547',
      accountName: 'Heather Austin',
      accountNumber: 'GB79KVDK53671810462493',
      superFundName: 'Smith Group',
      fundABN: '50 35 10 33',
      memberNumber: '9988614528930',
    },

    wageType: 'award_rate',
    manualRatePerHour: 59,
    teamBasedRate: undefined,
    awardRate: undefined,

    timeLogs: [
      {
        id: '59880eb2-83b0-4436-92ed-d1f317e7b610',
        date: '2024-12-05',
        clockInTime: '2024-12-05T08:00:00',
        clockOutTime: '2024-12-05T17:00:00',
        breaks: [
          {
            from: '2024-12-05 10:00:00',
            to: '2024-12-05 10:30:00',
          },
        ],
      },
      {
        id: '65f28c4b-7d7d-4dde-93c2-7219abadde1b',
        date: '2024-08-17',
        clockInTime: '2024-08-17T09:00:00',
        clockOutTime: '2024-08-17T19:00:00',
        breaks: [
          {
            from: '2024-08-17 11:00:00',
            to: '2024-08-17 11:30:00',
          },
        ],
      },
      {
        id: '6a0ad9b7-f176-4a9a-86f6-d1a892595a3e',
        date: '2025-01-19',
        clockInTime: '2025-01-19T07:00:00',
        clockOutTime: '2025-01-19T15:00:00',
        breaks: [
          {
            from: '2025-01-19 09:00:00',
            to: '2025-01-19 09:30:00',
          },
        ],
      },
      {
        id: '37499866-00a2-4697-9572-4a0a564f8418',
        date: '2024-10-10',
        clockInTime: '2024-10-10T10:00:00',
        clockOutTime: '2024-10-10T17:00:00',
        breaks: [
          {
            from: '2024-10-10 12:00:00',
            to: '2024-10-10 12:30:00',
          },
        ],
      },
      {
        id: '881ebaf1-541d-46f2-afd3-e68439dd607d',
        date: '2025-05-09',
        clockInTime: '2025-05-09T09:00:00',
        clockOutTime: '2025-05-09T17:00:00',
        breaks: [
          {
            from: '2025-05-09 11:00:00',
            to: '2025-05-09 11:30:00',
          },
        ],
      },
      {
        id: '9d81aea5-4db3-42a5-80a9-79e2640be6a5',
        date: '2024-12-03',
        clockInTime: '2024-12-03T08:00:00',
        clockOutTime: '2024-12-03T15:00:00',
        breaks: [
          {
            from: '2024-12-03 10:00:00',
            to: '2024-12-03 10:30:00',
          },
        ],
      },
      {
        id: 'e33af1dc-6e03-4994-b334-93d1d413ef9a',
        date: '2025-02-07',
        clockInTime: '2025-02-07T10:00:00',
        clockOutTime: '2025-02-07T17:00:00',
        breaks: [
          {
            from: '2025-02-07 12:00:00',
            to: '2025-02-07 12:30:00',
          },
        ],
      },
      {
        id: 'c790cebe-1777-4f66-9407-182a39b24da4',
        date: '2024-05-31',
        clockInTime: '2024-05-31T08:00:00',
        clockOutTime: '2024-05-31T18:00:00',
        breaks: [
          {
            from: '2024-05-31 10:00:00',
            to: '2024-05-31 10:30:00',
          },
        ],
      },
      {
        id: '245a2407-3636-4699-820c-33a8de4699e6',
        date: '2025-02-13',
        clockInTime: '2025-02-13T10:00:00',
        clockOutTime: '2025-02-13T20:00:00',
        breaks: [
          {
            from: '2025-02-13 12:00:00',
            to: '2025-02-13 12:30:00',
          },
        ],
      },
      {
        id: 'ab7f937c-b1b0-4ae0-83bd-0d7ab33b86dc',
        date: '2024-11-01',
        clockInTime: '2024-11-01T09:00:00',
        clockOutTime: '2024-11-01T17:00:00',
        breaks: [
          {
            from: '2024-11-01 11:00:00',
            to: '2024-11-01 11:30:00',
          },
        ],
      },
      {
        id: '386c5da2-b81a-4354-8434-4b2333d49ee4',
        date: '2024-11-02',
        clockInTime: '2024-11-02T10:00:00',
        clockOutTime: '2024-11-02T20:00:00',
        breaks: [
          {
            from: '2024-11-02 12:00:00',
            to: '2024-11-02 12:30:00',
          },
        ],
      },
      {
        id: '260ed930-3e11-4b90-811a-9327ff7206fa',
        date: '2025-01-23',
        clockInTime: '2025-01-23T09:00:00',
        clockOutTime: '2025-01-23T18:00:00',
        breaks: [
          {
            from: '2025-01-23 11:00:00',
            to: '2025-01-23 11:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'ce6d2af8-d7d7-46ac-8bdc-763e350dca7e',
    title: 'Dr.',
    firstName: 'Ricky',
    otherNames: 'Rebecca',
    lastName: 'Faulkner',
    email: 'amy27@yahoo.com',
    phoneNumber: '663-659-2389',
    role: 'UI/UX Designer',
    team: 'Marketing',
    status: 'inactive',
    homeAddress: {
      line1: '6142 Joan Plains',
      streetName: 'Patricia Dam',
      city: 'South Charlesshire',
      postcode: '07691',
      state: 'MA',
      country: 'Tokelau',
    },
    emergencyContact: {
      relationship: 'Spouse',
      name: 'Rebecca Edwards',
      phoneNumber: '+1-962-413-2702x8334',
      address: 'Unit 0797 Box 7950\nDPO AP 45037',
    },
    financialInformation: {
      taxFileNumber: '709-12-9667',
      bankBSB: '296-656',
      accountName: 'Joseph Kim',
      accountNumber: 'GB94LEHO49390333644916',
      superFundName: 'Hansen, Schneider and Fowler',
      fundABN: '45 14 24 26',
      memberNumber: '7339144186985',
    },
    wageType: 'team_based',
    manualRatePerHour: 33,
    teamBasedRate: undefined,
    awardRate: undefined,
    timeLogs: [
      {
        id: '6c23f351-7cd8-461e-aa61-0a3b208f55f8',
        date: '2024-06-27',
        clockInTime: '2024-06-27T09:00:00',
        clockOutTime: '2024-06-27T16:00:00',
        breaks: [
          {
            from: '2024-06-27 11:00:00',
            to: '2024-06-27 11:30:00',
          },
        ],
      },
      {
        id: 'af73280d-9316-4f16-b4ff-156ba13d8554',
        date: '2024-10-27',
        clockInTime: '2024-10-27T09:00:00',
        clockOutTime: '2024-10-27T18:00:00',
        breaks: [
          {
            from: '2024-10-27 11:00:00',
            to: '2024-10-27 11:30:00',
          },
        ],
      },
      {
        id: '9d9e9e6c-b7be-4a5d-ac02-3666730ba4d4',
        date: '2025-02-15',
        clockInTime: '2025-02-15T07:00:00',
        clockOutTime: '2025-02-15T13:00:00',
        breaks: [
          {
            from: '2025-02-15 09:00:00',
            to: '2025-02-15 09:30:00',
          },
        ],
      },
      {
        id: '74b2c16a-0cf0-46e4-b67b-4b841ef34d9c',
        date: '2024-07-30',
        clockInTime: '2024-07-30T07:00:00',
        clockOutTime: '2024-07-30T13:00:00',
        breaks: [
          {
            from: '2024-07-30 09:00:00',
            to: '2024-07-30 09:30:00',
          },
        ],
      },
      {
        id: '7efc29b5-71e8-4c58-9fcd-bcc5df80767f',
        date: '2024-07-11',
        clockInTime: '2024-07-11T09:00:00',
        clockOutTime: '2024-07-11T15:00:00',
        breaks: [
          {
            from: '2024-07-11 11:00:00',
            to: '2024-07-11 11:30:00',
          },
        ],
      },
      {
        id: 'bec7a480-9d04-4237-af6a-0eda9b72bf8d',
        date: '2024-11-03',
        clockInTime: '2024-11-03T09:00:00',
        clockOutTime: '2024-11-03T16:00:00',
        breaks: [
          {
            from: '2024-11-03 11:00:00',
            to: '2024-11-03 11:30:00',
          },
        ],
      },
      {
        id: 'e9f41ce5-f4f9-4e79-b8f9-1a4cfb5eb498',
        date: '2025-02-18',
        clockInTime: '2025-02-18T10:00:00',
        clockOutTime: '2025-02-18T20:00:00',
        breaks: [
          {
            from: '2025-02-18 12:00:00',
            to: '2025-02-18 12:30:00',
          },
        ],
      },
      {
        id: '58fd4553-256a-4b71-855d-56008a49ff69',
        date: '2024-07-01',
        clockInTime: '2024-07-01T08:00:00',
        clockOutTime: '2024-07-01T17:00:00',
        breaks: [
          {
            from: '2024-07-01 10:00:00',
            to: '2024-07-01 10:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'c9d0a82f-fc69-4a24-adb3-d9b5cd126e14',
    title: 'Miss',
    firstName: 'Megan',
    otherNames: 'Lynn',
    lastName: 'Taylor',
    email: 'mercedes58@gmail.com',
    phoneNumber: '+1-054-879-8435x75962',
    role: 'Data Analyst',
    team: 'Data Analysis',
    status: 'inactive',
    homeAddress: {
      line1: '7302 Ortega Rapid Suite 541',
      streetName: 'Lisa Isle',
      city: 'South Sabrinafort',
      postcode: '95155',
      state: 'KS',
      country: 'Jamaica',
    },
    emergencyContact: {
      relationship: 'Spouse',
      name: 'Christopher Flowers',
      phoneNumber: '085.062.9184x7651',
      address: '2307 Smith Orchard\nPort Ryantown, GA 72011',
    },
    financialInformation: {
      taxFileNumber: '621-38-7407',
      bankBSB: '990-450',
      accountName: 'Jill Barry',
      accountNumber: 'GB98ZSBL42967871495338',
      superFundName: 'Flores Ltd',
      fundABN: '95 47 24 45',
      memberNumber: '6576792030845',
    },
    wageType: 'manual',
    manualRatePerHour: 62,
    teamBasedRate: undefined,
    awardRate: undefined,
    timeLogs: [
      {
        id: '4352e9af-f918-48fb-baa8-c94a35ee42d4',
        date: '2024-12-19',
        clockInTime: '2024-12-19T08:00:00',
        clockOutTime: '2024-12-19T17:00:00',
        breaks: [
          {
            from: '2024-12-19 10:00:00',
            to: '2024-12-19 10:30:00',
          },
        ],
      },
      {
        id: 'cf07163d-60ff-49b4-a7ee-3ccf6173e834',
        date: '2024-07-24',
        clockInTime: '2024-07-24T07:00:00',
        clockOutTime: '2024-07-24T15:00:00',
        breaks: [
          {
            from: '2024-07-24 09:00:00',
            to: '2024-07-24 09:30:00',
          },
        ],
      },
      {
        id: 'a04a534c-ca37-4fa7-b2d2-96e0bbadf5cb',
        date: '2024-08-11',
        clockInTime: '2024-08-11T10:00:00',
        clockOutTime: '2024-08-11T16:00:00',
        breaks: [
          {
            from: '2024-08-11 12:00:00',
            to: '2024-08-11 12:30:00',
          },
        ],
      },
      {
        id: '271966d9-a5ae-4634-ac50-957757632cd2',
        date: '2024-09-29',
        clockInTime: '2024-09-29T08:00:00',
        clockOutTime: '2024-09-29T15:00:00',
        breaks: [
          {
            from: '2024-09-29 10:00:00',
            to: '2024-09-29 10:30:00',
          },
        ],
      },
      {
        id: 'af762ae2-99b2-43fd-8c51-71e46c8ae335',
        date: '2025-03-24',
        clockInTime: '2025-03-24T09:00:00',
        clockOutTime: '2025-03-24T16:00:00',
        breaks: [
          {
            from: '2025-03-24 11:00:00',
            to: '2025-03-24 11:30:00',
          },
        ],
      },
      {
        id: '7b578979-fd79-4cfd-b35b-75d57a349398',
        date: '2025-04-29',
        clockInTime: '2025-04-29T08:00:00',
        clockOutTime: '2025-04-29T14:00:00',
        breaks: [
          {
            from: '2025-04-29 10:00:00',
            to: '2025-04-29 10:30:00',
          },
        ],
      },
      {
        id: '08ab3606-f941-4757-9289-81281f4490f5',
        date: '2024-08-23',
        clockInTime: '2024-08-23T07:00:00',
        clockOutTime: '2024-08-23T15:00:00',
        breaks: [
          {
            from: '2024-08-23 09:00:00',
            to: '2024-08-23 09:30:00',
          },
        ],
      },
      {
        id: '261b0b45-ec32-42fd-a9df-33165879d0f8',
        date: '2024-10-23',
        clockInTime: '2024-10-23T10:00:00',
        clockOutTime: '2024-10-23T16:00:00',
        breaks: [
          {
            from: '2024-10-23 12:00:00',
            to: '2024-10-23 12:30:00',
          },
        ],
      },
      {
        id: 'bf283c2d-8f5e-4f48-b69c-188a05094a91',
        date: '2024-06-02',
        clockInTime: '2024-06-02T08:00:00',
        clockOutTime: '2024-06-02T15:00:00',
        breaks: [
          {
            from: '2024-06-02 10:00:00',
            to: '2024-06-02 10:30:00',
          },
        ],
      },
      {
        id: '5e436283-2d99-422a-9931-3e3f0a0565df',
        date: '2024-09-16',
        clockInTime: '2024-09-16T07:00:00',
        clockOutTime: '2024-09-16T14:00:00',
        breaks: [
          {
            from: '2024-09-16 09:00:00',
            to: '2024-09-16 09:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'febee65a-6171-4f19-84be-305ab7a17184',
    title: 'Mrs.',
    firstName: 'David',
    otherNames: 'Tiffany',
    lastName: 'Ortiz',
    email: 'sharon52@bailey-perez.com',
    phoneNumber: '+1-524-994-7433x92552',
    role: 'DevOps Engineer',
    team: 'DevOps',
    status: 'active',
    homeAddress: {
      line1: '646 White Oval Apt. 730',
      streetName: 'White Crest',
      city: 'New Steven',
      postcode: '92299',
      state: 'MN',
      country: 'Timor-Leste',
    },
    emergencyContact: {
      relationship: 'Frito',
      name: 'Lindsey Alvarado',
      phoneNumber: '001-133-290-6353x47909',
      address: '4064 Linda Plain Apt. 561\nPorterbury, OR 07498',
    },
    financialInformation: {
      taxFileNumber: '146-43-5777',
      bankBSB: '783-263',
      accountName: 'Jacqueline Lopez',
      accountNumber: 'GB87YHQM87601636551526',
      superFundName: 'Contreras, Elliott and Webster',
      fundABN: '66 38 54 54',
      memberNumber: '7639356192164',
    },
    wageType: 'award_rate',
    manualRatePerHour: 66,
    teamBasedRate: undefined,
    awardRate: undefined,
    timeLogs: [
      {
        id: '54b06684-9d18-4a25-b365-ea4273fca0d4',
        date: '2025-03-22',
        clockInTime: '2025-03-22T09:00:00',
        clockOutTime: '2025-03-22T17:00:00',
        breaks: [
          {
            from: '2025-03-22 11:00:00',
            to: '2025-03-22 11:30:00',
          },
        ],
      },
      {
        id: '07268097-4b50-43b9-a7b7-8a666a6f1692',
        date: '2024-12-02',
        clockInTime: '2024-12-02T10:00:00',
        clockOutTime: '2024-12-02T18:00:00',
        breaks: [
          {
            from: '2024-12-02 12:00:00',
            to: '2024-12-02 12:30:00',
          },
        ],
      },
      {
        id: '56f1b2f2-ebca-4dd6-83f9-35172f9547f7',
        date: '2025-04-05',
        clockInTime: '2025-04-05T09:00:00',
        clockOutTime: '2025-04-05T19:00:00',
        breaks: [
          {
            from: '2025-04-05 11:00:00',
            to: '2025-04-05 11:30:00',
          },
        ],
      },
      {
        id: '1f56c305-fdb8-4b4a-ae0a-7092592eef01',
        date: '2024-09-25',
        clockInTime: '2024-09-25T10:00:00',
        clockOutTime: '2024-09-25T20:00:00',
        breaks: [
          {
            from: '2024-09-25 12:00:00',
            to: '2024-09-25 12:30:00',
          },
        ],
      },
      {
        id: '249b302a-574a-414d-92c1-bef72a00b632',
        date: '2025-02-25',
        clockInTime: '2025-02-25T08:00:00',
        clockOutTime: '2025-02-25T18:00:00',
        breaks: [
          {
            from: '2025-02-25 10:00:00',
            to: '2025-02-25 10:30:00',
          },
        ],
      },
      {
        id: '8472b705-c2d8-4975-86f5-e09a185d708a',
        date: '2024-09-12',
        clockInTime: '2024-09-12T09:00:00',
        clockOutTime: '2024-09-12T15:00:00',
        breaks: [
          {
            from: '2024-09-12 11:00:00',
            to: '2024-09-12 11:30:00',
          },
        ],
      },
    ],
  },
  {
    id: '78158890-d1fb-4c4b-a999-c084b6f44858',
    title: 'Dr.',
    firstName: 'Richard',
    otherNames: 'Christopher',
    lastName: 'Cole',
    email: 'anndavidson@evans-guerra.com',
    phoneNumber: '755.682.8183x95081',
    role: 'Software Engineer',
    team: 'Software Development',
    status: 'active',
    homeAddress: {
      line1: '49910 Kelly Cliffs Apt. 188',
      streetName: 'Meyers Plain',
      city: 'Acostaton',
      postcode: '13713',
      state: 'DC',
      country: 'Tanzania',
    },
    emergencyContact: {
      relationship: 'Parent',
      name: 'Christy Chavez',
      phoneNumber: '001-999-938-8395',
      address: 'PSC 8980, Box 1150\nAPO AP 48273',
    },
    financialInformation: {
      taxFileNumber: '292-21-5189',
      bankBSB: '387-489',
      accountName: 'Scott Barajas',
      accountNumber: 'GB06MOFC36622031611323',
      superFundName: 'Jordan, Hernandez and Gardner',
      fundABN: '70 23 51 51',
      memberNumber: '0690608687446',
    },
    wageType: 'manual',
    manualRatePerHour: 65,
    teamBasedRate: undefined,
    awardRate: undefined,
    timeLogs: [
      {
        id: 'bf3bedca-039e-435a-bea6-8f9027733bdc',
        date: '2025-01-26',
        clockInTime: '2025-01-26T07:00:00',
        clockOutTime: '2025-01-26T14:00:00',
        breaks: [
          {
            from: '2025-01-26 09:00:00',
            to: '2025-01-26 09:30:00',
          },
        ],
      },
      {
        id: '0997c700-5256-4f1d-ad24-318d4d144c47',
        date: '2025-03-30',
        clockInTime: '2025-03-30T08:00:00',
        clockOutTime: '2025-03-30T15:00:00',
        breaks: [
          {
            from: '2025-03-30 10:00:00',
            to: '2025-03-30 10:30:00',
          },
        ],
      },
      {
        id: 'ba97c4e4-032e-413a-8f40-2289d90d55b0',
        date: '2025-02-20',
        clockInTime: '2025-02-20T09:00:00',
        clockOutTime: '2025-02-20T15:00:00',
        breaks: [
          {
            from: '2025-02-20 11:00:00',
            to: '2025-02-20 11:30:00',
          },
        ],
      },
      {
        id: 'a245fb07-b40e-40fb-89d4-e9ea2dc86ebb',
        date: '2024-05-25',
        clockInTime: '2024-05-25T10:00:00',
        clockOutTime: '2024-05-25T19:00:00',
        breaks: [
          {
            from: '2024-05-25 12:00:00',
            to: '2024-05-25 12:30:00',
          },
        ],
      },
      {
        id: '2c3982eb-2e70-4c77-9a89-b3fcfb3f3fc0',
        date: '2024-12-02',
        clockInTime: '2024-12-02T08:00:00',
        clockOutTime: '2024-12-02T18:00:00',
        breaks: [
          {
            from: '2024-12-02 10:00:00',
            to: '2024-12-02 10:30:00',
          },
        ],
      },
      {
        id: '22b1f029-7926-4e3b-a305-e0094dc0424d',
        date: '2024-08-15',
        clockInTime: '2024-08-15T07:00:00',
        clockOutTime: '2024-08-15T16:00:00',
        breaks: [
          {
            from: '2024-08-15 09:00:00',
            to: '2024-08-15 09:30:00',
          },
        ],
      },
      {
        id: 'cbf08a70-f7c7-4b27-981c-5e68c2430502',
        date: '2025-03-15',
        clockInTime: '2025-03-15T08:00:00',
        clockOutTime: '2025-03-15T14:00:00',
        breaks: [
          {
            from: '2025-03-15 10:00:00',
            to: '2025-03-15 10:30:00',
          },
        ],
      },
      {
        id: '0418012d-d8a5-4a37-8f83-3bfdbaaf32c4',
        date: '2024-12-11',
        clockInTime: '2024-12-11T08:00:00',
        clockOutTime: '2024-12-11T17:00:00',
        breaks: [
          {
            from: '2024-12-11 10:00:00',
            to: '2024-12-11 10:30:00',
          },
        ],
      },
      {
        id: 'cbbdc0f7-2b23-47bc-a14a-81d3c890aad9',
        date: '2024-08-04',
        clockInTime: '2024-08-04T09:00:00',
        clockOutTime: '2024-08-04T16:00:00',
        breaks: [
          {
            from: '2024-08-04 11:00:00',
            to: '2024-08-04 11:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'f9581c65-c615-4879-ab42-94af92e02bee',
    title: 'Mr.',
    firstName: 'Lindsay',
    otherNames: 'Kenneth',
    lastName: 'Johnson',
    email: 'imyers@powers-ramirez.com',
    phoneNumber: '001-128-489-1959x9928',
    role: 'Product Manager',
    team: 'Product',
    status: 'active',
    homeAddress: {
      line1: '22500 Scott Canyon',
      streetName: 'Stephanie Extensions',
      city: 'East Rebeccashire',
      postcode: '33070',
      state: 'MS',
      country: 'Djibouti',
    },
    emergencyContact: {
      relationship: 'Spouse',
      name: 'Tracy Sanchez',
      phoneNumber: '4891349424',
      address: '718 Heather Mission Suite 913\nNorth Michael, MO 15968',
    },
    financialInformation: {
      taxFileNumber: '320-12-6486',
      bankBSB: '758-828',
      accountName: 'Jenny Cooper',
      accountNumber: 'GB81DSKL43164231336748',
      superFundName: 'Orr, Brown and Baker',
      fundABN: '26 95 97 58',
      memberNumber: '8786764530060',
    },
    wageType: 'team_based',
    manualRatePerHour: undefined,
    teamBasedRate: 67,
    awardRate: undefined,
    timeLogs: [
      {
        id: 'fe1deb95-4a8b-4c46-99d6-154efc2df1b9',
        date: '2024-11-28',
        clockInTime: '2024-11-28T08:00:00',
        clockOutTime: '2024-11-28T16:00:00',
        breaks: [
          {
            from: '2024-11-28 10:00:00',
            to: '2024-11-28 10:30:00',
          },
        ],
      },
      {
        id: 'e600d947-7327-46d7-a4df-486630010063',
        date: '2024-11-28',
        clockInTime: '2024-11-28T10:00:00',
        clockOutTime: '2024-11-28T16:00:00',
        breaks: [
          {
            from: '2024-11-28 12:00:00',
            to: '2024-11-28 12:30:00',
          },
        ],
      },
      {
        id: 'b226f834-50e3-4573-acdf-abc8ebc33c0a',
        date: '2025-04-17',
        clockInTime: '2025-04-17T09:00:00',
        clockOutTime: '2025-04-17T15:00:00',
        breaks: [
          {
            from: '2025-04-17 11:00:00',
            to: '2025-04-17 11:30:00',
          },
        ],
      },
      {
        id: '0b3c906e-e0e2-43c1-865b-0b5c46c7d521',
        date: '2024-11-12',
        clockInTime: '2024-11-12T07:00:00',
        clockOutTime: '2024-11-12T13:00:00',
        breaks: [
          {
            from: '2024-11-12 09:00:00',
            to: '2024-11-12 09:30:00',
          },
        ],
      },
      {
        id: 'e99a61eb-a943-48de-b688-35a8ac99deca',
        date: '2024-06-15',
        clockInTime: '2024-06-15T10:00:00',
        clockOutTime: '2024-06-15T17:00:00',
        breaks: [
          {
            from: '2024-06-15 12:00:00',
            to: '2024-06-15 12:30:00',
          },
        ],
      },
      {
        id: 'd47116bf-7f35-466d-9934-59e4e9ee38eb',
        date: '2025-03-06',
        clockInTime: '2025-03-06T07:00:00',
        clockOutTime: '2025-03-06T15:00:00',
        breaks: [
          {
            from: '2025-03-06 09:00:00',
            to: '2025-03-06 09:30:00',
          },
        ],
      },
      {
        id: '0dc5f963-ddca-4dad-89bd-781c9d622ed6',
        date: '2024-12-21',
        clockInTime: '2024-12-21T08:00:00',
        clockOutTime: '2024-12-21T14:00:00',
        breaks: [
          {
            from: '2024-12-21 10:00:00',
            to: '2024-12-21 10:30:00',
          },
        ],
      },
      {
        id: 'b7479af4-7c32-4484-a195-18a72bc90abf',
        date: '2025-01-07',
        clockInTime: '2025-01-07T08:00:00',
        clockOutTime: '2025-01-07T15:00:00',
        breaks: [
          {
            from: '2025-01-07 10:00:00',
            to: '2025-01-07 10:30:00',
          },
        ],
      },
      {
        id: 'ff2e63ff-0063-4df2-b0c7-330b50fa8e78',
        date: '2024-10-08',
        clockInTime: '2024-10-08T10:00:00',
        clockOutTime: '2024-10-08T18:00:00',
        breaks: [
          {
            from: '2024-10-08 12:00:00',
            to: '2024-10-08 12:30:00',
          },
        ],
      },
      {
        id: 'd2643fed-e37b-4789-a1f3-db3e13632d10',
        date: '2024-10-13',
        clockInTime: '2024-10-13T09:00:00',
        clockOutTime: '2024-10-13T19:00:00',
        breaks: [
          {
            from: '2024-10-13 11:00:00',
            to: '2024-10-13 11:30:00',
          },
        ],
      },
      {
        id: '099ae1c1-a6dd-45ea-82d3-fedf84ed54c3',
        date: '2024-10-10',
        clockInTime: '2024-10-10T07:00:00',
        clockOutTime: '2024-10-10T15:00:00',
        breaks: [
          {
            from: '2024-10-10 09:00:00',
            to: '2024-10-10 09:30:00',
          },
        ],
      },
      {
        id: '2c76d390-cdbe-427f-8c2e-3b38e2af0c00',
        date: '2025-02-19',
        clockInTime: '2025-02-19T07:00:00',
        clockOutTime: '2025-02-19T14:00:00',
        breaks: [
          {
            from: '2025-02-19 09:00:00',
            to: '2025-02-19 09:30:00',
          },
        ],
      },
      {
        id: 'a0cfde39-67fc-44e5-b242-f66c3dd08994',
        date: '2024-07-29',
        clockInTime: '2024-07-29T08:00:00',
        clockOutTime: '2024-07-29T18:00:00',
        breaks: [
          {
            from: '2024-07-29 10:00:00',
            to: '2024-07-29 10:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'feea5cf8-cf5c-4884-8c21-fdc7bb431e3f',
    title: 'Mx.',
    firstName: 'Tyler',
    otherNames: 'Emma',
    lastName: 'Moore',
    email: 'hcoffey@gmail.com',
    phoneNumber: '9469749778',
    role: 'QA Analyst',
    team: 'QA',
    status: 'active',
    homeAddress: {
      line1: '86742 Ktora Forge Suite 434',
      streetName: 'Gray Roads',
      city: 'Joshuaside',
      postcode: '73678',
      state: 'IA',
      country: 'Oman',
    },
    emergencyContact: {
      relationship: 'Spouse',
      name: 'Jessica Brady',
      phoneNumber: '+1-483-906-4138',
      address: '90575 Juan Throughway Suite 301\nWest Karaborough, UT 52443',
    },
    financialInformation: {
      taxFileNumber: '669-29-2017',
      bankBSB: '758-251',
      accountName: 'Troy Zavala',
      accountNumber: 'GB86MFVS61200144967024',
      superFundName: 'Hoffman, Singleton and Nash',
      fundABN: '26 93 18 79',
      memberNumber: '0407520861850',
    },
    wageType: 'team_based',
    manualRatePerHour: undefined,
    teamBasedRate: 34,
    awardRate: undefined,
    timeLogs: [
      {
        id: 'd9b60ec5-9706-4223-9723-7e92c809a785',
        date: '2025-01-16',
        clockInTime: '2025-01-16T10:00:00',
        clockOutTime: '2025-01-16T19:00:00',
        breaks: [
          {
            from: '2025-01-16 12:00:00',
            to: '2025-01-16 12:30:00',
          },
        ],
      },
      {
        id: '67999453-db30-4f80-b318-0df422d3e38e',
        date: '2024-09-01',
        clockInTime: '2024-09-01T10:00:00',
        clockOutTime: '2024-09-01T19:00:00',
        breaks: [
          {
            from: '2024-09-01 12:00:00',
            to: '2024-09-01 12:30:00',
          },
        ],
      },
      {
        id: '89922104-4971-41c6-b21c-cbebed7602a4',
        date: '2025-03-14',
        clockInTime: '2025-03-14T09:00:00',
        clockOutTime: '2025-03-14T17:00:00',
        breaks: [
          {
            from: '2025-03-14 11:00:00',
            to: '2025-03-14 11:30:00',
          },
        ],
      },
      {
        id: 'f88fc8a9-7c37-4eca-a2b3-f05b4db912e9',
        date: '2024-05-23',
        clockInTime: '2024-05-23T07:00:00',
        clockOutTime: '2024-05-23T17:00:00',
        breaks: [
          {
            from: '2024-05-23 09:00:00',
            to: '2024-05-23 09:30:00',
          },
        ],
      },
      {
        id: 'f8d0b352-4181-4820-af5c-5873bf44fe9b',
        date: '2025-01-04',
        clockInTime: '2025-01-04T08:00:00',
        clockOutTime: '2025-01-04T16:00:00',
        breaks: [
          {
            from: '2025-01-04 10:00:00',
            to: '2025-01-04 10:30:00',
          },
        ],
      },
      {
        id: '83ef1485-f8b1-4923-9c64-c35aa3882b80',
        date: '2024-07-12',
        clockInTime: '2024-07-12T10:00:00',
        clockOutTime: '2024-07-12T20:00:00',
        breaks: [
          {
            from: '2024-07-12 12:00:00',
            to: '2024-07-12 12:30:00',
          },
        ],
      },
      {
        id: '1b81dac7-c02c-4d18-bd33-791426d5d232',
        date: '2025-02-17',
        clockInTime: '2025-02-17T07:00:00',
        clockOutTime: '2025-02-17T14:00:00',
        breaks: [
          {
            from: '2025-02-17 09:00:00',
            to: '2025-02-17 09:30:00',
          },
        ],
      },
      {
        id: 'acf8d1e9-7143-4299-9759-7f79e4ed1541',
        date: '2024-12-07',
        clockInTime: '2024-12-07T09:00:00',
        clockOutTime: '2024-12-07T17:00:00',
        breaks: [
          {
            from: '2024-12-07 11:00:00',
            to: '2024-12-07 11:30:00',
          },
        ],
      },
      {
        id: '4e5f3d75-a16b-4d4d-b8ca-2761698e119a',
        date: '2024-11-03',
        clockInTime: '2024-11-03T09:00:00',
        clockOutTime: '2024-11-03T17:00:00',
        breaks: [
          {
            from: '2024-11-03 11:00:00',
            to: '2024-11-03 11:30:00',
          },
        ],
      },
      {
        id: '3b3ee413-f2ff-47da-8001-33a831e5138c',
        date: '2025-02-24',
        clockInTime: '2025-02-24T07:00:00',
        clockOutTime: '2025-02-24T17:00:00',
        breaks: [
          {
            from: '2025-02-24 09:00:00',
            to: '2025-02-24 09:30:00',
          },
        ],
      },
      {
        id: '23a0b14f-95ea-47b7-b67d-9e0f646b61f0',
        date: '2024-12-22',
        clockInTime: '2024-12-22T08:00:00',
        clockOutTime: '2024-12-22T17:00:00',
        breaks: [
          {
            from: '2024-12-22 10:00:00',
            to: '2024-12-22 10:30:00',
          },
        ],
      },
      {
        id: 'a3977336-c8f6-4321-ac0f-a11a0566c3cb',
        date: '2025-04-29',
        clockInTime: '2025-04-29T07:00:00',
        clockOutTime: '2025-04-29T16:00:00',
        breaks: [
          {
            from: '2025-04-29 09:00:00',
            to: '2025-04-29 09:30:00',
          },
        ],
      },
      {
        id: 'bc26aaaa-9705-482c-b0b8-c6b4ff88eb1d',
        date: '2025-02-27',
        clockInTime: '2025-02-27T09:00:00',
        clockOutTime: '2025-02-27T16:00:00',
        breaks: [
          {
            from: '2025-02-27 11:00:00',
            to: '2025-02-27 11:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'e45538da-146c-4c7a-857d-b5abb2ad2312',
    title: 'Mr.',
    firstName: 'April',
    otherNames: 'Michael',
    lastName: 'Todd',
    email: 'jonesjohn@sharp.com',
    phoneNumber: '708-059-4291',
    role: 'Software Engineer',
    team: 'Engineering',
    status: 'active',
    homeAddress: {
      line1: '9622 Collin Pine',
      streetName: 'Jessica Turnpike',
      city: 'Carolmouth',
      postcode: '79850',
      state: 'MN',
      country: 'Luxembourg',
    },
    emergencyContact: {
      relationship: 'Spouse',
      name: 'James Werner',
      phoneNumber: '001-200-043-0408x45485',
      address: '3158 Melanie Overpass Apt. 761\nThomasstad, OK 77626',
    },
    financialInformation: {
      taxFileNumber: '782-98-1324',
      bankBSB: '351-655',
      accountName: 'Sara Sims',
      accountNumber: 'GB70ETFD49692846626253',
      superFundName: 'Jones-Smith',
      fundABN: '66 11 14 77',
      memberNumber: '1924464054623',
    },
    wageType: 'award_rate',
    manualRatePerHour: undefined,
    teamBasedRate: undefined,
    awardRate: 60,
    timeLogs: [
      {
        id: '98c5cfb7-0720-4938-98b2-af8b3274d7dd',
        date: '2024-06-17',
        clockInTime: '2024-06-17T10:00:00',
        clockOutTime: '2024-06-17T18:00:00',
        breaks: [
          {
            from: '2024-06-17 12:00:00',
            to: '2024-06-17 12:30:00',
          },
        ],
      },
      {
        id: 'f1f37884-5f3e-49eb-9842-33597daccb56',
        date: '2025-04-22',
        clockInTime: '2025-04-22T10:00:00',
        clockOutTime: '2025-04-22T19:00:00',
        breaks: [
          {
            from: '2025-04-22 12:00:00',
            to: '2025-04-22 12:30:00',
          },
        ],
      },
      {
        id: '7c006842-20c6-4d6a-a256-c8c875459b1a',
        date: '2025-01-27',
        clockInTime: '2025-01-27T08:00:00',
        clockOutTime: '2025-01-27T17:00:00',
        breaks: [
          {
            from: '2025-01-27 10:00:00',
            to: '2025-01-27 10:30:00',
          },
        ],
      },
      {
        id: '579197fc-b33a-4732-896b-33fb6571895b',
        date: '2024-06-05',
        clockInTime: '2024-06-05T10:00:00',
        clockOutTime: '2024-06-05T20:00:00',
        breaks: [
          {
            from: '2024-06-05 12:00:00',
            to: '2024-06-05 12:30:00',
          },
        ],
      },
      {
        id: '3ae4a7b0-c5a0-4c7e-ad93-8924374e2b15',
        date: '2025-01-10',
        clockInTime: '2025-01-10T10:00:00',
        clockOutTime: '2025-01-10T20:00:00',
        breaks: [
          {
            from: '2025-01-10 12:00:00',
            to: '2025-01-10 12:30:00',
          },
        ],
      },
      {
        id: '3738ec2c-0f17-477d-8f9d-000c1edacf3e',
        date: '2024-07-27',
        clockInTime: '2024-07-27T08:00:00',
        clockOutTime: '2024-07-27T18:00:00',
        breaks: [
          {
            from: '2024-07-27 10:00:00',
            to: '2024-07-27 10:30:00',
          },
        ],
      },
      {
        id: 'b9809a1c-9c52-4f6d-831d-1b0d88b62484',
        date: '2025-03-30',
        clockInTime: '2025-03-30T09:00:00',
        clockOutTime: '2025-03-30T19:00:00',
        breaks: [
          {
            from: '2025-03-30 11:00:00',
            to: '2025-03-30 11:30:00',
          },
        ],
      },
      {
        id: '93077b7e-903b-45d5-ab20-519a94a1a3a0',
        date: '2024-12-08',
        clockInTime: '2024-12-08T08:00:00',
        clockOutTime: '2024-12-08T14:00:00',
        breaks: [
          {
            from: '2024-12-08 10:00:00',
            to: '2024-12-08 10:30:00',
          },
        ],
      },
      {
        id: '90c18f43-84dc-4b73-989f-b9cfbf9ce7ba',
        date: '2024-12-07',
        clockInTime: '2024-12-07T10:00:00',
        clockOutTime: '2024-12-07T16:00:00',
        breaks: [
          {
            from: '2024-12-07 12:00:00',
            to: '2024-12-07 12:30:00',
          },
        ],
      },
      {
        id: '630834c0-8a12-4999-bd0d-6437eae61139',
        date: '2025-03-20',
        clockInTime: '2025-03-20T10:00:00',
        clockOutTime: '2025-03-20T16:00:00',
        breaks: [
          {
            from: '2025-03-20 12:00:00',
            to: '2025-03-20 12:30:00',
          },
        ],
      },
      {
        id: 'c203277c-d510-4441-b7bc-f0684b40fae1',
        date: '2025-03-22',
        clockInTime: '2025-03-22T09:00:00',
        clockOutTime: '2025-03-22T19:00:00',
        breaks: [
          {
            from: '2025-03-22 11:00:00',
            to: '2025-03-22 11:30:00',
          },
        ],
      },
      {
        id: 'e793a5cb-7a05-453d-a366-d565d111dba8',
        date: '2024-10-19',
        clockInTime: '2024-10-19T09:00:00',
        clockOutTime: '2024-10-19T16:00:00',
        breaks: [
          {
            from: '2024-10-19 11:00:00',
            to: '2024-10-19 11:30:00',
          },
        ],
      },
      {
        id: '5724b9a8-ba2d-4e54-897d-b54a73eafa9c',
        date: '2025-02-21',
        clockInTime: '2025-02-21T08:00:00',
        clockOutTime: '2025-02-21T18:00:00',
        breaks: [
          {
            from: '2025-02-21 10:00:00',
            to: '2025-02-21 10:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 'ec7653fe-c27d-44d8-9e48-e3c032375390',
    title: 'Mrs.',
    firstName: 'John',
    otherNames: 'Lisa',
    lastName: 'Harris',
    email: 'melissamedina@gmail.com',
    phoneNumber: '482-232-2510',
    role: 'Software Engineer',
    team: 'Operations',
    status: 'active',
    homeAddress: {
      line1: '1962 Oneill Landing',
      streetName: 'Jessica Villages',
      city: 'Robertschester',
      postcode: '36845',
      state: 'ID',
      country: 'Tajikistan',
    },
    emergencyContact: {
      relationship: 'Sibling',
      name: 'Jerry Sullivan',
      phoneNumber: '131.715.6511x66163',
      address: '283 Roberts Trafficway\nStonefurt, HI 81252',
    },
    financialInformation: {
      taxFileNumber: '222-24-7608',
      bankBSB: '649-971',
      accountName: 'William Cunningham',
      accountNumber: 'GB81HCVP89232174036414',
      superFundName: 'Beard PLC',
      fundABN: '39 69 87 58',
      memberNumber: '6673901688680',
    },
    wageType: 'manual',
    manualRatePerHour: 49,
    teamBasedRate: undefined,
    awardRate: undefined,
    timeLogs: [
      {
        id: '48aa9f83-f375-4f56-a47b-6a91cc576bbd',
        date: '2024-08-10',
        clockInTime: '2024-08-10T09:00:00',
        clockOutTime: '2024-08-10T18:00:00',
        breaks: [
          {
            from: '2024-08-10 11:00:00',
            to: '2024-08-10 11:30:00',
          },
        ],
      },
      {
        id: '0a5f4592-bbfe-480a-8edc-4d6967f2d8b9',
        date: '2024-12-06',
        clockInTime: '2024-12-06T10:00:00',
        clockOutTime: '2024-12-06T18:00:00',
        breaks: [
          {
            from: '2024-12-06 12:00:00',
            to: '2024-12-06 12:30:00',
          },
        ],
      },
      {
        id: '9052402f-69e4-49db-a9a3-f2c4d68ebaae',
        date: '2024-12-29',
        clockInTime: '2024-12-29T09:00:00',
        clockOutTime: '2024-12-29T15:00:00',
        breaks: [
          {
            from: '2024-12-29 11:00:00',
            to: '2024-12-29 11:30:00',
          },
        ],
      },
      {
        id: '8181c015-c17d-469e-8cf9-09800b6acbdd',
        date: '2025-02-25',
        clockInTime: '2025-02-25T09:00:00',
        clockOutTime: '2025-02-25T18:00:00',
        breaks: [
          {
            from: '2025-02-25 11:00:00',
            to: '2025-02-25 11:30:00',
          },
        ],
      },
      {
        id: 'bbadcd75-c149-497e-a6eb-6d0294b73966',
        date: '2024-10-17',
        clockInTime: '2024-10-17T10:00:00',
        clockOutTime: '2024-10-17T20:00:00',
        breaks: [
          {
            from: '2024-10-17 12:00:00',
            to: '2024-10-17 12:30:00',
          },
        ],
      },
      {
        id: 'f126528c-f6bb-4ab5-adb3-78f73d32e95a',
        date: '2024-07-23',
        clockInTime: '2024-07-23T09:00:00',
        clockOutTime: '2024-07-23T18:00:00',
        breaks: [
          {
            from: '2024-07-23 11:00:00',
            to: '2024-07-23 11:30:00',
          },
        ],
      },
      {
        id: 'c9d19787-0828-4c90-9587-0c43f1937712',
        date: '2024-12-23',
        clockInTime: '2024-12-23T10:00:00',
        clockOutTime: '2024-12-23T18:00:00',
        breaks: [
          {
            from: '2024-12-23 12:00:00',
            to: '2024-12-23 12:30:00',
          },
        ],
      },
    ],
  },
];

export const getDashboardStatsMockData = () => {
  let isLoading = false;

  const stats = {
    totalActiveStaff: {
      value: 128,
      percentageChange: 10,
      positiveChange: false,
    },
    hoursWorkedThisWeek: {
      value: 5_460,
      percentageChange: 5,
      positiveChange: true,
    },
    grossWagesThisWeek: {
      value: 42_300,
      percentageChange: 4,
      positiveChange: true,
    },
    pendingAdjustments: {
      value: 12,
      percentageChange: 4,
      positiveChange: false,
    },
  };

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  return {
    isLoading,
    stats,
  };
};

export const getHoursWorkedMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const now = new Date();

  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getLast12Months = () => {
    const dataPoints = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      dataPoints.push({
        name: date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        }),
        label: date.toLocaleString('default', { month: 'short' }),
        value: random(300, 500),
      });
    }
    return {
      totalHoursWorked: dataPoints.reduce((acc, cur) => acc + cur.value, 0),
      dataPoints,
    };
  };

  const getLast30Days = () => {
    const dataPoints = Array.from({ length: 4 }, (_, i) => ({
      label: `Week ${i + 1}`,
      name: `Week ${i + 1}`,
      value: random(1000, 1400),
    }));
    return {
      totalHoursWorked: dataPoints.reduce((acc, cur) => acc + cur.value, 0),
      dataPoints,
    };
  };

  const getLast7Days = () => {
    const dataPoints = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      dataPoints.push({
        label: date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
        name: date.toLocaleDateString(undefined, { weekday: 'short' }),
        value: random(100, 200),
      });
    }
    return {
      totalHoursWorked: dataPoints.reduce((acc, cur) => acc + cur.value, 0),
      dataPoints,
    };
  };

  const getLast24Hours = () => {
    const dataPoints = [];
    for (let i = 23; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(now.getHours() - i);
      dataPoints.push({
        label: date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
        name: date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
        value: random(10, 50),
      });
    }
    return {
      totalHoursWorked: dataPoints.reduce((acc, cur) => acc + cur.value, 0),
      dataPoints,
    };
  };

  return {
    isLoading,
    data: {
      last12Months: getLast12Months(),
      last30Days: getLast30Days(),
      last7Days: getLast7Days(),
      last24Hours: getLast24Hours(),
    },
  };
};

export const getWageDistributionMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const data = [
    { name: 'Design', value: 12000 },
    { name: 'Engineering', value: 8000 },
    { name: 'Product', value: 6000 },
    { name: 'Sales', value: 4000 },
    { name: 'Marketing', value: 2000 },
  ];

  return {
    isLoading,
    data,
  };
};

export const getAdjustmentsMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const data: AdjustmentItem[] = [
    {
      id: '1',
      staffName: 'John Doe',
      staffId: '1',
      date: '2025-05-22',
      reason:
        'I stayed back to meet a client deadline for the marketing campaign.',
      overtime: '2 hours',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      staffName: 'Jane Doe',
      staffId: '2',
      date: '2025-05-22',
      reason:
        'Handled after-hours system updates as part of the engineering team.',
      overtime: '2 hours',
      email: 'jane.doe@example.com',
    },
    {
      id: '3',
      staffName: 'Mark Doe',
      staffId: '3',
      date: '2025-05-22',
      reason: 'Stayed past my shift to resolve a high-priority customer issue.',
      overtime: '2 hours',
      email: 'mark.doe@example.com',
    },
  ];

  return {
    isLoading,
    data,
  };
};

export const getRoleOptionsMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const data = [
    { value: 'software-engineer', label: 'Software Engineer', id: '1' },
    { value: 'product-manager', label: 'Product Manager', id: '2' },
    { value: 'ux-designer', label: 'UX Designer', id: '3' },
    { value: 'qa-analyst', label: 'QA Analyst', id: '4' },
    { value: 'devops-engineer', label: 'DevOps Engineer', id: '5' },
    { value: 'data-scientist', label: 'Data Scientist', id: '6' },
  ];

  return {
    isLoading,
    data,
  };
};

export const getTeamOptionsMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const data = [
    { value: 'engineering', label: 'Engineering', id: '1' },
    { value: 'product', label: 'Product', id: '2' },
    { value: 'design', label: 'Design', id: '3' },
    { value: 'qa', label: 'QA', id: '4' },
    { value: 'operations', label: 'Operations', id: '5' },
  ];

  return {
    isLoading,
    data,
  };
};

export const searchMockData = (searchTerm: string) => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const teams = [
    { value: 'engineering', label: 'Engineering', id: '1' },
    { value: 'product', label: 'Product', id: '2' },
    { value: 'design', label: 'Design', id: '3' },
    { value: 'qa', label: 'QA', id: '4' },
    { value: 'operations', label: 'Operations', id: '5' },
  ];

  const filteredTeams = teams
    .filter((team) =>
      team.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((team) => ({
      id: team.id,
      label: team.label,
      value: team.value,
      type: 'team',
      url: `/teams/${team.id}`,
    }));

  const filteredStaff = staffs
    .filter((staff) =>
      `${staff.firstName} ${staff.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .map((staff) => ({
      id: staff.id,
      label: `${staff.firstName} ${staff.lastName}`,
      value: `${staff.firstName} ${staff.lastName}`,
      type: 'staff',
      url: `/staff/${staff.id}`,
    }));

  const filteredData = [...filteredTeams, ...filteredStaff];

  return {
    isLoading,
    data: filteredData,
  };
};

export const getStaffMockData = () => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  return {
    isLoading,
    data: staffs,
  };
};
