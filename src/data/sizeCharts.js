export const sizeGuides = {
  men: {
    title: "Men's Apparel Size Guide",
    description: 'Measurements refer to body size, not garment dimensions. When between sizes, order the larger size for a relaxed fit.',
    measurements: ['Size', 'Chest (in / cm)', 'Waist (in / cm)', 'Shoulder (in / cm)', 'Sleeve (in / cm)', 'Neck (in / cm)'],
    rows: [
      { size: 'XS', chest: '34-36 / 86-91', waist: '28-30 / 71-76', shoulder: '16.5 / 42', sleeve: '32.5 / 82', neck: '14.5 / 37' },
      { size: 'S', chest: '36-38 / 91-96', waist: '30-32 / 76-81', shoulder: '17.2 / 44', sleeve: '33.5 / 85', neck: '15 / 38' },
      { size: 'M', chest: '38-40 / 96-101', waist: '32-34 / 81-86', shoulder: '18.0 / 46', sleeve: '34.5 / 88', neck: '15.5 / 39' },
      { size: 'L', chest: '41-43 / 104-109', waist: '35-37 / 89-94', shoulder: '18.8 / 48', sleeve: '35.5 / 90', neck: '16.5 / 42' },
      { size: 'XL', chest: '44-46 / 112-117', waist: '38-40 / 96-101', shoulder: '19.6 / 50', sleeve: '36.5 / 93', neck: '17.5 / 44' },
      { size: 'XXL', chest: '47-49 / 119-124', waist: '41-43 / 104-109', shoulder: '20.4 / 52', sleeve: '37.5 / 95', neck: '18.5 / 47' },
      { size: '3XL', chest: '50-52 / 127-132', waist: '44-46 / 112-117', shoulder: '21.2 / 54', sleeve: '38.5 / 98', neck: '19.5 / 49' }
    ]
  },
  women: {
    title: "Women's Apparel Size Guide",
    description: 'Designed according to international standard luxury sizing. Bust, waist, and hips indicate body measurements.',
    measurements: ['Size', 'Bust (in / cm)', 'Waist (in / cm)', 'Hips (in / cm)', 'Length (in / cm)'],
    rows: [
      { size: 'XS', bust: '31-33 / 79-84', waist: '24-26 / 61-66', hips: '34-36 / 86-91', length: '44 / 112' },
      { size: 'S', bust: '33-35 / 84-89', waist: '26-28 / 66-71', hips: '36-38 / 91-96', length: '45 / 114' },
      { size: 'M', bust: '35-37 / 89-94', waist: '28-30 / 71-76', hips: '38-40 / 96-101', length: '46 / 117' },
      { size: 'L', bust: '38-40 / 96-101', waist: '31-33 / 79-84', hips: '41-43 / 104-109', length: '47 / 119' },
      { size: 'XL', bust: '41-43 / 104-109', waist: '34-36 / 86-91', hips: '44-46 / 112-117', length: '48 / 122' },
      { size: 'XXL', bust: '44-46 / 112-117', waist: '37-39 / 94-99', hips: '47-49 / 119-124', length: '49 / 124' },
      { size: '3XL', bust: '47-49 / 119-124', waist: '40-42 / 102-107', hips: '50-52 / 127-132', length: '50 / 127' }
    ]
  },
  kids: {
    title: "Kids' Size Guide",
    description: 'Sized by age and height. If child is tall for their age, we advise choosing one size up.',
    measurements: ['Age / Size', 'Height (in / cm)', 'Chest (in / cm)', 'Waist (in / cm)'],
    rows: [
      { size: '2-3Y', height: '36-38 / 92-98', chest: '20-21 / 51-53', waist: '19-20 / 48-50' },
      { size: '3-4Y', height: '39-41 / 99-104', chest: '21-22 / 53-56', waist: '20-21 / 50-53' },
      { size: '5-6Y', height: '43-46 / 110-116', chest: '23-24 / 58-61', waist: '21-22 / 53-56' },
      { size: '7-8Y', height: '48-50 / 122-128', chest: '25-26 / 63-66', waist: '22-23 / 56-58' },
      { size: '9-10Y', height: '53-55 / 134-140', chest: '27-28 / 68-71', waist: '24-25 / 61-63' },
      { size: '11-12Y', height: '58-60 / 146-152', chest: '29-31 / 74-78', waist: '25-26 / 63-66' }
    ]
  },
  footwear: {
    title: 'Footwear Sizing Chart',
    description: 'Footwear is true to international sizing. For wide feet, choose one half or full size larger.',
    measurements: ['EU Size', 'UK Size', 'US Men', 'US Women', 'Foot Length (cm / in)'],
    rows: [
      { size: 'EU 38', uk: '5', usMen: '5.5', usWomen: '7.5', length: '24.0 / 9.4' },
      { size: 'EU 39', uk: '6', usMen: '6.5', usWomen: '8.5', length: '24.7 / 9.7' },
      { size: 'EU 40', uk: '6.5', usMen: '7.0', usWomen: '9.0', length: '25.3 / 10.0' },
      { size: 'EU 41', uk: '7.5', usMen: '8.0', usWomen: '10.0', length: '26.0 / 10.2' },
      { size: 'EU 42', uk: '8', usMen: '8.5', usWomen: '10.5', length: '26.7 / 10.5' },
      { size: 'EU 43', uk: '9', usMen: '9.5', usWomen: '11.5', length: '27.3 / 10.7' },
      { size: 'EU 44', uk: '9.5', usMen: '10.0', usWomen: '12.0', length: '28.0 / 11.0' },
      { size: 'EU 45', uk: '10.5', usMen: '11.0', usWomen: '13.0', length: '28.7 / 11.3' }
    ]
  }
};
