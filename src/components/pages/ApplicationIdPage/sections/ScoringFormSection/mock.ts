export const scoringFormOptions = {
    gender: [
      { id: 'hidden-gender', text: '', value: '', hidden: true },
      { id: 'male', text: 'Male', value: 'MALE' },
      { id: 'female', text: 'Female', value: 'FEMALE' },
    ],
    maritalStatus: [
      { id: 'hidden-marital-status', text: '', value: '', hidden: true },
      { id: 'married', text: 'Married', value: 'MARRIED' },
      { id: 'single', text: 'Single', value: 'SINGLE' },
      { id: 'divorced', text: 'Divorced', value: 'DIVORCED' },
      { id: 'widow-widower', text: 'Widow/widower', value: 'WIDOW_WIDOWER' },
    ],
    dependentAmount: [
      { id: 'hidden-dependent-amount', text: '', value: '', hidden: true },
      { id: '0', text: '0', value: '0' },
      { id: '1', text: '1', value: '1' },
      { id: '2', text: '2', value: '2' },
      { id: '3', text: '3', value: '3' },
      { id: '4', text: '4', value: '4' },
      { id: '5-or-more', text: '5 or more', value: '5' },
    ],
    employmentStatus: [
      { id: 'hidden-employment-status', text: '', value: '', hidden: true },
      { id: 'employed', text: 'Employed', value: 'EMPLOYED' },
      { id: 'self-employed', text: 'Self-employed', value: 'SELF_EMPLOYED' },
      { id: 'unemployed', text: 'Unemployed', value: 'UNEMPLOYED' },
      { id: 'business-owner', text: 'Business owner', value: 'BUSINESS_OWNER' },
    ],
    position: [
      { id: 'hidden-position', text: '', value: '', hidden: true },
      { id: 'mid-manager', text: 'Middle manager', value: 'MID_MANAGER' },
      { id: 'top-manager', text: 'Top manager', value: 'TOP_MANAGER' },
      { id: 'worker', text: 'Worker', value: 'WORKER' },
      { id: 'owner', text: 'Owner', value: 'OWNER' },
    ]
  }