export interface Plan {
  id: string;
  name: string;
  capacity: string;
  price: number;
  features: string[];
}

export interface Cluster {
  slug: string;
  name: string;
  location: string;
  cityState: string;
  capacityRequired: string;
  financingRequired: number;
  fundingProgress: number;
  caretakerName: string;
  caretakerPhone: string;
  caretakerInitials: string;
  plans: Plan[];
}

export const CLUSTERS: Cluster[] = [
  {
    slug: 'ojota-residential-block',
    name: 'Ojota Residential Block',
    location: 'Ojota, Lagos',
    cityState: 'Ojota · Lagos',
    capacityRequired: '4.2 kW',
    financingRequired: 3150000,
    fundingProgress: 64,
    caretakerName: 'Mr. Babajide',
    caretakerPhone: '2348031234567',
    caretakerInitials: 'MB',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        capacity: '~300W typical',
        price: 5000,
        features: ['Fan', 'Bulb, one or two rooms', 'Phone charging']
      },
      {
        id: 'comfort',
        name: 'Comfort',
        capacity: '~600W typical',
        price: 9000,
        features: ['Everything in Basic', 'Television', 'Iron, used occasionally']
      },
      {
        id: 'full',
        name: 'Full Power',
        capacity: '~1kW+ typical',
        price: 15000,
        features: ['Fridge, running all day', 'Everything in Comfort', 'Small appliances as needed']
      }
    ]
  },
  {
    slug: 'bodija-student-hostel',
    name: 'Bodija Student Hostel',
    location: 'Bodija, Ibadan',
    cityState: 'Bodija · Ibadan',
    capacityRequired: '6.8 kW',
    financingRequired: 4900000,
    fundingProgress: 31,
    caretakerName: 'Mrs. Adebayo',
    caretakerPhone: '2348057654321',
    caretakerInitials: 'MA',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        capacity: '~300W typical',
        price: 4000,
        features: ['Fan', 'Bulb, one or two rooms', 'Phone charging']
      },
      {
        id: 'comfort',
        name: 'Comfort',
        capacity: '~600W typical',
        price: 7500,
        features: ['Everything in Basic', 'Television', 'Iron, used occasionally']
      },
      {
        id: 'full',
        name: 'Full Power',
        capacity: '~1kW+ typical',
        price: 12000,
        features: ['Fridge, running all day', 'Everything in Comfort', 'Small appliances as needed']
      }
    ]
  },
  {
    slug: 'lugbe-estate-wing-c',
    name: 'Lugbe Estate Wing C',
    location: 'Lugbe, Abuja',
    cityState: 'Lugbe · Abuja',
    capacityRequired: '3.5 kW',
    financingRequired: 2600000,
    fundingProgress: 88,
    caretakerName: 'Mr. Tunde',
    caretakerPhone: '2348123456789',
    caretakerInitials: 'TA',
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        capacity: '~300W typical',
        price: 4500,
        features: ['Fan', 'Bulb, one or two rooms', 'Phone charging']
      },
      {
        id: 'comfort',
        name: 'Comfort',
        capacity: '~600W typical',
        price: 8000,
        features: ['Everything in Basic', 'Television', 'Iron, used occasionally']
      },
      {
        id: 'full',
        name: 'Full Power',
        capacity: '~1kW+ typical',
        price: 13500,
        features: ['Fridge, running all day', 'Everything in Comfort', 'Small appliances as needed']
      }
    ]
  }
];

export function getClusters(): Cluster[] {
  return CLUSTERS;
}

export function getClusterBySlug(slug: string): Cluster | undefined {
  return CLUSTERS.find(c => c.slug === slug || c.slug.replace(/-/g, '') === slug.replace(/-/g, ''));
}
