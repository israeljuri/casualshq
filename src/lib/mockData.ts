import { AdjustmentItem } from '@/features/(dashboard)/types/dashboard.type';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import { Team, TeamFormData } from '@/features/(dashboard)/types/teams.type';

export const staffsMockData: Staff[] = [
  {
    id: '78d4e9c1-804f-4b06-9102-2e19617fd2cf',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    team: 'Marketing',
    role: 'Marketer',
    wageType: 'award_rate',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: 32,
    title: 'others',
    otherNames: undefined,
    phoneNumber: '0435183977',
    status: 'pending_onboarding',
    homeAddress: {
      line: 'Unit 1',
      streetName: '25 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0432795265',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '424770615',
      bankBSB: '741-423',
      accountName: 'Alice Smith',
      accountNumber: '51855923',
      superFundName: 'SuperFund Co',
      fundABN: '51374799535',
      memberNumber: '178583',
    },
    timeLogs: [
      {
        id: '36026fb7-08c6-40e9-9d7e-07d819b01ae7',
        date: '2025-05-07',
        clockInTime: '2025-05-07T09:00:00',
        clockOutTime: '2025-05-07T17:00:00',
        breaks: [
          {
            id: 'f20cfae1-db0a-47f9-b209-47608e68e3c6',
            from: '2025-05-07T14:04:03',
            to: '2025-05-07T14:14:03',
            type: 'recess',
          },
        ],
      },
      {
        id: '01e43b4b-8c81-4571-86f9-77d7d616ea6a',
        date: '2025-05-19',
        clockInTime: '2025-05-19T09:00:00',
        clockOutTime: '2025-05-19T17:00:00',
        breaks: [
          {
            id: '9076377f-37df-4df5-9c44-f735add33ac8',
            from: '2025-05-19T12:19:54',
            to: '2025-05-19T12:45:54',
            type: 'lunch',
          },
        ],
      },
      {
        id: '085f33b4-ec22-4ef6-9e87-04fad1c59479',
        date: '2025-05-22',
        clockInTime: '2025-05-22T09:00:00',
        clockOutTime: '2025-05-22T17:00:00',
        breaks: [
          {
            id: 'c2ba45f4-a224-46ce-b80e-d958787b991f',
            from: '2025-05-22T11:07:25',
            to: '2025-05-22T11:19:25',
            type: 'lunch',
          },
          {
            id: 'f217daf6-ebf0-4cd0-9c75-4110702c1101',
            from: '2025-05-22T14:34:23',
            to: '2025-05-22T14:58:23',
            type: 'lunch',
          },
        ],
      },
    ],
  },
  {
    id: '69fdebed-93f6-4d04-bc6f-4796e109c5cc',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    team: 'Sales',
    role: 'Sales Rep',
    wageType: 'manual',
    manualRatePerHour: 30,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: undefined,
    title: 'miss',
    otherNames: undefined,
    phoneNumber: '0457932040',
    status: 'pending_onboarding',
    homeAddress: {
      line: 'Unit 1',
      streetName: '78 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0420040937',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '796008065',
      bankBSB: '886-302',
      accountName: 'Bob Johnson',
      accountNumber: '24851062',
      superFundName: 'SuperFund Co',
      fundABN: '98877831458',
      memberNumber: '689789',
    },
    timeLogs: [
      {
        id: '4176cf29-91e1-45c2-bc64-afa5ebbda6dc',
        date: '2025-05-17',
        clockInTime: '2025-05-17T09:00:00',
        clockOutTime: '2025-05-17T17:00:00',
        breaks: [
          {
            id: '68a04d5f-0d59-4e32-98cf-8cb2b9d9d63b',
            from: '2025-05-17T12:20:18',
            to: '2025-05-17T12:39:18',
            type: 'recess',
          },
        ],
      },
      {
        id: '5f586997-3aa8-4754-b860-dd21b8fbd95e',
        date: '2025-04-26',
        clockInTime: '2025-04-26T09:00:00',
        clockOutTime: '2025-04-26T17:00:00',
        breaks: [
          {
            id: 'a0f59aa6-2601-45c7-81a1-c70b6b73ca44',
            from: '2025-04-26T14:53:44',
            to: '2025-04-26T15:06:44',
            type: 'recess',
          },
          {
            id: 'c807a179-924f-48f9-ac93-d0a2239f8956',
            from: '2025-04-26T09:48:57',
            to: '2025-04-26T10:05:57',
            type: 'recess',
          },
        ],
      },
      {
        id: '8788df64-da2a-4e0b-b34c-3805d06bf9b9',
        date: '2025-05-20',
        clockInTime: '2025-05-20T09:00:00',
        clockOutTime: '2025-05-20T17:00:00',
        breaks: [
          {
            id: 'e47cfb15-7059-4bc6-acd4-fd9927beec7d',
            from: '2025-05-20T14:54:51',
            to: '2025-05-20T15:09:51',
            type: 'recess',
          },
          {
            id: 'd0349046-bcdd-4a4d-84fb-8b3f5f8779f5',
            from: '2025-05-20T15:45:04',
            to: '2025-05-20T16:09:04',
            type: 'lunch',
          },
        ],
      },
    ],
  },
  {
    id: 'cb963988-8eb4-4086-8043-60e09c8c50ec',
    firstName: 'Charlie',
    lastName: 'Williams',
    email: 'charlie.williams@example.com',
    team: 'Marketing',
    role: 'Marketer',
    wageType: 'award_rate',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: 32,
    title: 'dr',
    otherNames: undefined,
    phoneNumber: '0460256763',
    status: 'pending_onboarding',
    homeAddress: {
      line: 'Unit 1',
      streetName: '73 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0482094985',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '898507899',
      bankBSB: '190-750',
      accountName: 'Charlie Williams',
      accountNumber: '61502533',
      superFundName: 'SuperFund Co',
      fundABN: '12786044348',
      memberNumber: '643268',
    },
    timeLogs: [
      {
        id: 'f7448082-9363-40d6-bf1c-bbb0fe51ca60',
        date: '2025-05-06',
        clockInTime: '2025-05-06T09:00:00',
        clockOutTime: '2025-05-06T17:00:00',
        breaks: [
          {
            id: '9edaaafd-c292-4a35-917f-a569d2bc1557',
            from: '2025-05-06T16:18:33',
            to: '2025-05-06T16:40:33',
            type: 'lunch',
          },
        ],
      },
      {
        id: '2c1aebd5-33a1-429d-8222-845dc76000a1',
        date: '2025-05-22',
        clockInTime: '2025-05-22T09:00:00',
        clockOutTime: '2025-05-22T17:00:00',
        breaks: [],
      },
      {
        id: 'a1cf2cf1-f2ff-48f6-84e0-0930e4e1ff11',
        date: '2025-05-01',
        clockInTime: '2025-05-01T09:00:00',
        clockOutTime: '2025-05-01T17:00:00',
        breaks: [],
      },
      {
        id: 'f6eca1fc-4533-4c25-b73d-b22217a71a17',
        date: '2025-05-04',
        clockInTime: '2025-05-04T09:00:00',
        clockOutTime: '2025-05-04T17:00:00',
        breaks: [
          {
            id: '1e202edd-f908-4f26-9a85-49ff69ab3773',
            from: '2025-05-04T10:49:07',
            to: '2025-05-04T11:03:07',
            type: 'lunch',
          },
          {
            id: '46c8c1e1-f82d-4eac-9398-b7a86dfffc86',
            from: '2025-05-04T09:55:39',
            to: '2025-05-04T10:07:39',
            type: 'recess',
          },
        ],
      },
    ],
  },
  {
    id: '7e04fbcf-4013-4b1d-8ece-9e135e338e63',
    firstName: 'Diana',
    lastName: 'Brown',
    email: 'diana.brown@example.com',
    team: 'Operations',
    role: 'Operator',
    wageType: 'award_rate',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: 32,
    title: 'others',
    otherNames: undefined,
    phoneNumber: '0488118164',
    status: 'clocked_out',
    homeAddress: {
      line: 'Unit 1',
      streetName: '19 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0452612559',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '821054557',
      bankBSB: '670-693',
      accountName: 'Diana Brown',
      accountNumber: '11251181',
      superFundName: 'SuperFund Co',
      fundABN: '72642391011',
      memberNumber: '788329',
    },
    timeLogs: [
      {
        id: 'c04ffe00-9afc-46f6-a54a-041912da1232',
        date: '2025-05-18',
        clockInTime: '2025-05-18T09:00:00',
        clockOutTime: '2025-05-18T17:00:00',
        breaks: [],
      },
      {
        id: 'cb8cdc0e-bd8d-4936-aa9d-85a16ea0098d',
        date: '2025-05-08',
        clockInTime: '2025-05-08T09:00:00',
        clockOutTime: '2025-05-08T17:00:00',
        breaks: [
          {
            id: '03b92d24-bd5f-4e1b-94e8-c83e8350778f',
            from: '2025-05-08T09:42:48',
            to: '2025-05-08T10:01:48',
            type: 'recess',
          },
        ],
      },
      {
        id: 'ec540278-b6b9-4dac-ab1b-94e00d5699c2',
        date: '2025-05-16',
        clockInTime: '2025-05-16T09:00:00',
        clockOutTime: '2025-05-16T17:00:00',
        breaks: [
          {
            id: 'fae51ab3-ee2f-410e-a67e-c8c5391b1270',
            from: '2025-05-16T10:38:52',
            to: '2025-05-16T10:52:52',
            type: 'lunch',
          },
        ],
      },
    ],
  },
  {
    id: '7d669c4d-4076-4dfc-bce3-2b358be7490c',
    firstName: 'Edward',
    lastName: 'Jones',
    email: 'edward.jones@example.com',
    team: 'Engineering',
    role: 'Engineer',
    wageType: 'manual',
    manualRatePerHour: 30,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: undefined,
    title: 'others',
    otherNames: undefined,
    phoneNumber: '0462588032',
    status: 'clocked_in',
    homeAddress: {
      line: 'Unit 1',
      streetName: '73 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0435122365',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '197099919',
      bankBSB: '570-890',
      accountName: 'Edward Jones',
      accountNumber: '15967912',
      superFundName: 'SuperFund Co',
      fundABN: '42403528142',
      memberNumber: '610011',
    },
    timeLogs: [
      {
        id: '4c1e5f0a-a65e-47fa-995a-623c43c2c389',
        date: '2025-05-05',
        clockInTime: '2025-05-05T09:00:00',
        clockOutTime: '2025-05-05T17:00:00',
        breaks: [
          {
            id: 'd5b33d09-b7dd-44a2-9d2b-65d10389d59c',
            from: '2025-05-05T14:36:43',
            to: '2025-05-05T14:52:43',
            type: 'recess',
          },
        ],
      },
      {
        id: 'a778844c-338d-49f3-92fc-661f410aff0b',
        date: '2025-05-16',
        clockInTime: '2025-05-16T09:00:00',
        clockOutTime: '2025-05-16T17:00:00',
        breaks: [],
      },
      {
        id: '3e6343dd-f79a-4310-b2ef-cd06dd0de216',
        date: '2025-05-18',
        clockInTime: '2025-05-18T09:00:00',
        clockOutTime: '2025-05-18T17:00:00',
        breaks: [],
      },
      {
        id: 'db6c4f2a-832d-486c-ac11-6d9579c0524e',
        date: '2025-05-16',
        clockInTime: '2025-05-16T09:00:00',
        clockOutTime: '2025-05-16T17:00:00',
        breaks: [
          {
            id: 'cac666dd-1eac-4720-b938-576bd16b19e2',
            from: '2025-05-16T11:45:03',
            to: '2025-05-16T12:11:03',
            type: 'lunch',
          },
        ],
      },
      {
        id: 'c06458c0-4455-457d-bfbf-438a4012f605',
        date: '2025-05-19',
        clockInTime: '2025-05-19T09:00:00',
        clockOutTime: '2025-05-19T17:00:00',
        breaks: [],
      },
    ],
  },
  {
    id: '23755757-a5a7-4ce2-9144-1df9fd156075',
    firstName: 'Fiona',
    lastName: 'Garcia',
    email: 'fiona.garcia@example.com',
    team: 'Operations',
    role: 'Operator',
    wageType: 'manual',
    manualRatePerHour: 30,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: undefined,
    title: 'mr',
    otherNames: undefined,
    phoneNumber: '0455193088',
    status: 'clocked_in',
    homeAddress: {
      line: 'Unit 1',
      streetName: '68 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0440324269',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '135565700',
      bankBSB: '410-341',
      accountName: 'Fiona Garcia',
      accountNumber: '50436225',
      superFundName: 'SuperFund Co',
      fundABN: '21639672451',
      memberNumber: '692738',
    },
    timeLogs: [
      {
        id: '51e36b3c-eb4c-4241-8a4f-41f45b3d763c',
        date: '2025-05-18',
        clockInTime: '2025-05-18T09:00:00',
        clockOutTime: '2025-05-18T17:00:00',
        breaks: [],
      },
      {
        id: '2f060d03-6e7f-47d2-abc6-e2e92f2aa6e0',
        date: '2025-05-18',
        clockInTime: '2025-05-18T09:00:00',
        clockOutTime: '2025-05-18T17:00:00',
        breaks: [
          {
            id: 'c81b4c7e-f589-4fa6-8e61-7d29073b3d2a',
            from: '2025-05-18T14:50:05',
            to: '2025-05-18T15:05:05',
            type: 'lunch',
          },
          {
            id: '8e0b3090-2b7d-49fb-b30d-95755fdab3a7',
            from: '2025-05-18T11:34:03',
            to: '2025-05-18T12:04:03',
            type: 'lunch',
          },
        ],
      },
      {
        id: 'b8353dfa-f981-4ca8-8198-cf6bdb914d37',
        date: '2025-05-12',
        clockInTime: '2025-05-12T09:00:00',
        clockOutTime: '2025-05-12T17:00:00',
        breaks: [
          {
            id: '70ca0b5b-f14b-4e54-9cf1-ac7e86d5b007',
            from: '2025-05-12T15:07:09',
            to: '2025-05-12T15:18:09',
            type: 'lunch',
          },
          {
            id: '181c0f26-c10f-4cb6-961b-d9aa7453ec7b',
            from: '2025-05-12T16:04:48',
            to: '2025-05-12T16:28:48',
            type: 'lunch',
          },
        ],
      },
      {
        id: '069e4c33-9c9c-49f4-88ac-0b05d7efae34',
        date: '2025-05-04',
        clockInTime: '2025-05-04T09:00:00',
        clockOutTime: '2025-05-04T17:00:00',
        breaks: [
          {
            id: 'a7e6dee6-e2a8-442e-ac6e-d65b92a0253e',
            from: '2025-05-04T15:33:01',
            to: '2025-05-04T15:58:01',
            type: 'recess',
          },
          {
            id: '3a3d9133-83cf-4798-85e8-984b34621aec',
            from: '2025-05-04T09:41:03',
            to: '2025-05-04T10:07:03',
            type: 'lunch',
          },
        ],
      },
    ],
  },
  {
    id: '0181f9ac-c23e-4417-b0fa-fe2dc07c222e',
    firstName: 'George',
    lastName: 'Miller',
    email: 'george.miller@example.com',
    team: 'Product',
    role: 'Product Manager',
    wageType: 'team_based',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: 35,
    awardBasedRatePerHour: undefined,
    title: 'mrs',
    otherNames: undefined,
    phoneNumber: '0423681269',
    status: 'clocked_out',
    homeAddress: {
      line: 'Unit 1',
      streetName: '53 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0448290174',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '931430134',
      bankBSB: '124-705',
      accountName: 'George Miller',
      accountNumber: '60147647',
      superFundName: 'SuperFund Co',
      fundABN: '79201695193',
      memberNumber: '212942',
    },
    timeLogs: [
      {
        id: 'a18d5177-a908-4068-bb06-decbdf7e4703',
        date: '2025-05-07',
        clockInTime: '2025-05-07T09:00:00',
        clockOutTime: '2025-05-07T17:00:00',
        breaks: [
          {
            id: '63674e82-0954-4332-a530-7e7500790352',
            from: '2025-05-07T15:29:35',
            to: '2025-05-07T15:55:35',
            type: 'recess',
          },
          {
            id: '9c75fe09-5187-4bc1-8263-d106f99fd5b1',
            from: '2025-05-07T12:04:18',
            to: '2025-05-07T12:14:18',
            type: 'recess',
          },
        ],
      },
      {
        id: '1eb8bfd1-b03f-42ce-9bdc-7d503bf1d910',
        date: '2025-05-15',
        clockInTime: '2025-05-15T09:00:00',
        clockOutTime: '2025-05-15T17:00:00',
        breaks: [],
      },
      {
        id: 'a70b525e-efa1-4093-8d50-bfc9057b6fc5',
        date: '2025-05-01',
        clockInTime: '2025-05-01T09:00:00',
        clockOutTime: '2025-05-01T17:00:00',
        breaks: [
          {
            id: 'a54a2b4a-3c6e-4391-b359-1b0467f472df',
            from: '2025-05-01T14:09:46',
            to: '2025-05-01T14:24:46',
            type: 'lunch',
          },
          {
            id: '61d66f1e-5337-403a-b22e-afec190bc3e7',
            from: '2025-05-01T12:22:49',
            to: '2025-05-01T12:52:49',
            type: 'recess',
          },
        ],
      },
    ],
  },
  {
    id: '3cbf028a-c386-4a2a-9b92-80a6e0548834',
    firstName: 'Hannah',
    lastName: 'Davis',
    email: 'hannah.davis@example.com',
    team: 'Sales',
    role: 'Sales Rep',
    wageType: 'manual',
    manualRatePerHour: 30,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: undefined,
    title: 'miss',
    otherNames: undefined,
    phoneNumber: '0475092229',
    status: 'clocked_out',
    homeAddress: {
      line: 'Unit 1',
      streetName: '32 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0494136972',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '714724576',
      bankBSB: '820-813',
      accountName: 'Hannah Davis',
      accountNumber: '90960425',
      superFundName: 'SuperFund Co',
      fundABN: '36343630753',
      memberNumber: '230387',
    },
    timeLogs: [
      {
        id: 'f59614b3-6a56-47ea-90d7-e0dc3ea436e1',
        date: '2025-05-08',
        clockInTime: '2025-05-08T09:00:00',
        clockOutTime: '2025-05-08T17:00:00',
        breaks: [
          {
            id: '31401bac-00cc-415a-8067-7dc6638db1f7',
            from: '2025-05-08T12:02:53',
            to: '2025-05-08T12:26:53',
            type: 'recess',
          },
          {
            id: '18585a3d-83f1-4b59-8303-d8c6e0712b27',
            from: '2025-05-08T09:19:16',
            to: '2025-05-08T09:47:16',
            type: 'recess',
          },
        ],
      },
      {
        id: 'e06d453c-66d7-4e17-a8c3-0e69bd24acf3',
        date: '2025-04-28',
        clockInTime: '2025-04-28T09:00:00',
        clockOutTime: '2025-04-28T17:00:00',
        breaks: [
          {
            id: '983bee98-8d21-4b22-9275-8a87fe6d74a9',
            from: '2025-04-28T11:24:38',
            to: '2025-04-28T11:47:38',
            type: 'recess',
          },
          {
            id: 'f93383b2-9df1-4268-8118-a6bd6f18419a',
            from: '2025-04-28T11:58:15',
            to: '2025-04-28T12:14:15',
            type: 'recess',
          },
        ],
      },
      {
        id: 'b0f7cec3-79c6-43a6-b43c-795a67e853c3',
        date: '2025-04-30',
        clockInTime: '2025-04-30T09:00:00',
        clockOutTime: '2025-04-30T17:00:00',
        breaks: [],
      },
      {
        id: 'b454a7f9-eb9b-4c42-8270-b846e32fc02d',
        date: '2025-05-12',
        clockInTime: '2025-05-12T09:00:00',
        clockOutTime: '2025-05-12T17:00:00',
        breaks: [],
      },
      {
        id: '53c04b9d-93fb-499d-91c8-0335baf46c64',
        date: '2025-05-05',
        clockInTime: '2025-05-05T09:00:00',
        clockOutTime: '2025-05-05T17:00:00',
        breaks: [
          {
            id: '914f5886-b6f5-49e7-aac1-14d47e4f4307',
            from: '2025-05-05T10:20:52',
            to: '2025-05-05T10:42:52',
            type: 'recess',
          },
        ],
      },
    ],
  },
  {
    id: '5be82f91-6fa5-49ad-9d50-c2b6080de2a5',
    firstName: 'Ian',
    lastName: 'Lopez',
    email: 'ian.lopez@example.com',
    team: 'Operations',
    role: 'Operator',
    wageType: 'award_rate',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: undefined,
    awardBasedRatePerHour: 32,
    title: 'mr',
    otherNames: undefined,
    phoneNumber: '0468629092',
    status: 'pending_onboarding',
    homeAddress: {
      line: 'Unit 1',
      streetName: '31 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0410928576',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '640766256',
      bankBSB: '274-568',
      accountName: 'Ian Lopez',
      accountNumber: '82360457',
      superFundName: 'SuperFund Co',
      fundABN: '13600590821',
      memberNumber: '137266',
    },
    timeLogs: [
      {
        id: '42081ebe-c62f-41a6-90f5-455c986542bd',
        date: '2025-05-13',
        clockInTime: '2025-05-13T09:00:00',
        clockOutTime: '2025-05-13T17:00:00',
        breaks: [],
      },
      {
        id: '9a157322-607e-40df-8bce-82da68cb577d',
        date: '2025-05-24',
        clockInTime: '2025-05-24T09:00:00',
        clockOutTime: '2025-05-24T17:00:00',
        breaks: [
          {
            id: '0f6b2353-9c4f-457d-9811-a90dfce81bf5',
            from: '2025-05-24T15:41:57',
            to: '2025-05-24T15:54:57',
            type: 'lunch',
          },
          {
            id: 'a19b8be2-c52f-44e4-9376-61bc9eb131d2',
            from: '2025-05-24T15:33:04',
            to: '2025-05-24T15:49:04',
            type: 'recess',
          },
        ],
      },
      {
        id: 'bf7f1c00-7622-466d-90a8-b9d2208dfd66',
        date: '2025-05-08',
        clockInTime: '2025-05-08T09:00:00',
        clockOutTime: '2025-05-08T17:00:00',
        breaks: [],
      },
      {
        id: 'd27e5055-bc02-40a3-a751-1bf6ac0baa83',
        date: '2025-05-14',
        clockInTime: '2025-05-14T09:00:00',
        clockOutTime: '2025-05-14T17:00:00',
        breaks: [
          {
            id: 'd492500c-7a36-4ec6-a37f-1ea1aea27d9d',
            from: '2025-05-14T09:09:30',
            to: '2025-05-14T09:26:30',
            type: 'lunch',
          },
        ],
      },
    ],
  },
  {
    id: '6db5c322-97f4-475f-bdf3-e08d9aeafd2d',
    firstName: 'Jane',
    lastName: 'Wilson',
    email: 'jane.wilson@example.com',
    team: 'Product',
    role: 'Product Manager',
    wageType: 'team_based',
    manualRatePerHour: undefined,
    teamBasedRatePerHour: 35,
    awardBasedRatePerHour: undefined,
    title: 'ms',
    otherNames: undefined,
    phoneNumber: '0437991536',
    status: 'pending_onboarding',
    homeAddress: {
      line: 'Unit 1',
      streetName: '67 Main Street',
      city: 'Melbourne',
      postcode: '3000',
    },
    emergencyContactInformation: {
      relationship: 'Spouse',
      name: 'Alex Smith',
      phoneNumber: '0471133488',
      address: '123 Emergency St, Melbourne VIC',
    },
    financialInformation: {
      taxFileNumber: '293207923',
      bankBSB: '516-256',
      accountName: 'Jane Wilson',
      accountNumber: '96574007',
      superFundName: 'SuperFund Co',
      fundABN: '52012404795',
      memberNumber: '277375',
    },
    timeLogs: [
      {
        id: 'd5650d8b-bddc-4c97-b26d-42bfd8ba0ae9',
        date: '2025-05-14',
        clockInTime: '2025-05-14T09:00:00',
        clockOutTime: '2025-05-14T17:00:00',
        breaks: [
          {
            id: '24e54c56-d0bd-4328-8425-2147f89022e3',
            from: '2025-05-14T11:17:35',
            to: '2025-05-14T11:27:35',
            type: 'recess',
          },
        ],
      },
      {
        id: 'f4d28a56-c7c1-4c23-abd6-5c49ae654791',
        date: '2025-05-21',
        clockInTime: '2025-05-21T09:00:00',
        clockOutTime: '2025-05-21T17:00:00',
        breaks: [
          {
            id: 'cd9e3a55-9dfb-4b14-8e9f-1f9085a01e84',
            from: '2025-05-21T09:26:23',
            to: '2025-05-21T09:48:23',
            type: 'recess',
          },
          {
            id: 'caf7a5d9-5f1c-4b12-be63-cf40c54258f9',
            from: '2025-05-21T09:46:43',
            to: '2025-05-21T09:58:43',
            type: 'recess',
          },
        ],
      },
      {
        id: '6550b204-852a-4688-9f15-f5a9d3c7be78',
        date: '2025-05-06',
        clockInTime: '2025-05-06T09:00:00',
        clockOutTime: '2025-05-06T17:00:00',
        breaks: [],
      },
      {
        id: 'e5d379fc-42da-458f-a81b-152cd9e25898',
        date: '2025-05-10',
        clockInTime: '2025-05-10T09:00:00',
        clockOutTime: '2025-05-10T17:00:00',
        breaks: [
          {
            id: '3808983a-a8db-4ffa-934f-93cd35abac59',
            from: '2025-05-10T13:00:23',
            to: '2025-05-10T13:23:23',
            type: 'lunch',
          },
          {
            id: '1775d106-9e3a-4f4d-b8fa-ce3b819c8c7a',
            from: '2025-05-10T13:55:07',
            to: '2025-05-10T14:08:07',
            type: 'recess',
          },
        ],
      },
      {
        id: 'c8bcdb29-7f13-4806-9bda-6bc5a16e86d2',
        date: '2025-05-10',
        clockInTime: '2025-05-10T09:00:00',
        clockOutTime: '2025-05-10T17:00:00',
        breaks: [
          {
            id: '5052d3d0-817a-40e8-a593-8afd779db360',
            from: '2025-05-10T10:52:04',
            to: '2025-05-10T11:02:04',
            type: 'recess',
          },
        ],
      },
    ],
  },
];

export const teamsMockData: Team[] = [
  {
    id: 'team-design-001',
    name: 'Design',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Design')
      .map((s) => s.id),
    teamWage: 30,
  },
  {
    id: 'team-eng-001',
    name: 'Engineering',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Engineering')
      .map((s) => s.id),
    teamWage: 35,
  },
  {
    id: 'team-ops-001',
    name: 'Operations',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Operations')
      .map((s) => s.id),
    teamWage: 28,
  },
  {
    id: 'team-sales-001',
    name: 'Sales',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Sales')
      .map((s) => s.id),
  },
  {
    id: 'team-marketing-001',
    name: 'Marketing',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Marketing')
      .map((s) => s.id),
    teamWage: 32,
  },
  {
    id: 'team-product-001',
    name: 'Product',
    memberIds: staffsMockData
      .filter((staff) => staff.team === 'Product')
      .map((s) => s.id),
    teamWage: 40,
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

  const filteredStaff = staffsMockData
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

export const searchStaffByTeamMockData = (searchTerm: string, teamId: string ) => {
  let isLoading = false;

  setTimeout(() => {
    isLoading = true;
  }, 2000);

  const team = teamsMockData.find((team) => team.id === teamId);

  const filteredStaff = staffsMockData.filter((staff) => staff.team === team?.name)
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

  return {
    isLoading,
    data: filteredStaff,
  };
};

// Helper to get staff members for a team
const getTeamMembers = (memberIds: string[]): Staff[] => {
  return staffsMockData.filter((staff) => memberIds.includes(staff.id));
};

export const getTeams = (): Team[] => {
  return teamsMockData.map((team) => ({
    ...team,
    members: getTeamMembers(team.memberIds), // Optionally include full member objects or just count
  }));
};

export const getTeamById = (teamId: string): Team => {
  const team = teamsMockData.find((t) => t.id === teamId);
  if (team) {
    return {
      ...team,
      members: getTeamMembers(team.memberIds),
    };
  }

  throw new Error('Team not found!');
};

export const addTeam = (data: TeamFormData): Team => {
  const newTeam: Team = {
    id: `team-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: data.name,
    memberIds: data.memberIds || [],
    teamWage: data.teamWage,
  };
  teamsMockData.push(newTeam);

  // Update staff members
  (data.memberIds || []).forEach((staffId) => {
    const staffIndex = staffsMockData.findIndex((s) => s.id === staffId);
    if (staffIndex !== -1) {
      staffsMockData[staffIndex].team = newTeam.name; // Or newTeam.id if preferred
      if (
        staffsMockData[staffIndex].wageType === 'team_based' &&
        newTeam.teamWage
      ) {
        staffsMockData[staffIndex].teamBasedRatePerHour = newTeam.teamWage;
      }
    }
  });
  return newTeam;
};

export const updateTeam = (teamId: string, data: TeamFormData): Team => {
  const teamIndex = teamsMockData.findIndex((t) => t.id === teamId);
  if (teamIndex === -1) throw new Error('Team not found!');

  const oldTeam = teamsMockData[teamIndex];
  const updatedTeam: Team = { ...oldTeam, ...data };
  teamsMockData[teamIndex] = updatedTeam;

  // Naive update of staff members:
  // 1. Remove team from staff who are no longer in the team
  const removedMemberIds = oldTeam.memberIds.filter(
    (id) => !(updatedTeam.memberIds || []).includes(id)
  );
  removedMemberIds.forEach((staffId) => {
    const staffIdx = staffsMockData.findIndex((s) => s.id === staffId);
    if (staffIdx !== -1 && staffsMockData[staffIdx].team === oldTeam.name) {
      // or oldTeam.id
      staffsMockData[staffIdx].team = undefined; // Or assign to a default/unassigned team
      staffsMockData[staffIdx].teamBasedRatePerHour = undefined;
    }
  });

  // 2. Add team to new members / update existing ones
  (updatedTeam.memberIds || []).forEach((staffId) => {
    const staffIdx = staffsMockData.findIndex((s) => s.id === staffId);
    if (staffIdx !== -1) {
      staffsMockData[staffIdx].team = updatedTeam.name; // Or updatedTeam.id
      if (
        staffsMockData[staffIdx].wageType === 'team_based' &&
        updatedTeam.teamWage
      ) {
        staffsMockData[staffIdx].teamBasedRatePerHour = updatedTeam.teamWage;
      }
    }
  });

  return updatedTeam;
};

export const deleteTeam = (teamId: string) => {
  const teamIndex = teamsMockData.findIndex((t) => t.id === teamId);
  if (teamIndex === -1) return false;

  const teamToDelete = teamsMockData[teamIndex];
  // Update staff members who were in this team
  teamToDelete.memberIds.forEach((staffId) => {
    const staffIdx = staffsMockData.findIndex((s) => s.id === staffId);
    if (
      staffIdx !== -1 &&
      staffsMockData[staffIdx].team === teamToDelete.name
    ) {
      // or teamToDelete.id
      staffsMockData[staffIdx].team = undefined; // Or assign to a default/unassigned team
      staffsMockData[staffIdx].teamBasedRatePerHour = undefined;
    }
  });

  teamsMockData.splice(teamIndex, 1);
  return true;
};

export const getStaffOptionsForSelect = () => {
  return staffsMockData.map((staff) => ({
    value: staff.id,
    label: `${staff.firstName} ${staff.lastName} (${staff.role || 'No role'})`,
  }));
};


