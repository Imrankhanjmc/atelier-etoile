export const deliveryPincodes = {
  '110001': { city: 'New Delhi', state: 'Delhi', days: '1-2 Days', cod: true, express: true },
  '110020': { city: 'Okhla, New Delhi', state: 'Delhi', days: '1-2 Days', cod: true, express: true },
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: '2-3 Days', cod: true, express: true },
  '400050': { city: 'Bandra, Mumbai', state: 'Maharashtra', days: '2-3 Days', cod: true, express: true },
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: '2-3 Days', cod: true, express: true },
  '560034': { city: 'Koramangala, Bengaluru', state: 'Karnataka', days: '2-3 Days', cod: true, express: true },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: '2-4 Days', cod: true, express: true },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: '2-4 Days', cod: true, express: false },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: '2-3 Days', cod: true, express: true },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', days: '2-3 Days', cod: true, express: true },
  '411001': { city: 'Pune', state: 'Maharashtra', days: '2-3 Days', cod: true, express: true },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: '2-4 Days', cod: true, express: false },
  '682001': { city: 'Kochi', state: 'Kerala', days: '3-4 Days', cod: true, express: false },
  '160017': { city: 'Chandigarh', state: 'Punjab / Haryana', days: '2-3 Days', cod: true, express: true },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', days: '3-4 Days', cod: true, express: false },
  '781001': { city: 'Guwahati', state: 'Assam', days: '4-5 Days', cod: false, express: false },
  '462001': { city: 'Bhopal', state: 'Madhya Pradesh', days: '3-4 Days', cod: true, express: false }
};

export const checkPincodeDelivery = (pincode) => {
  const pin = String(pincode).trim();
  if (deliveryPincodes[pin]) {
    return {
      serviceable: true,
      ...deliveryPincodes[pin]
    };
  }

  // General fallback for valid 6-digit Indian pincode:
  if (/^[1-9][0-9]{5}$/.test(pin)) {
    return {
      serviceable: true,
      city: 'Standard Delivery Hub',
      state: 'India',
      days: '3-5 Business Days',
      cod: true,
      express: false
    };
  }

  return {
    serviceable: false,
    message: 'Please enter a valid 6-digit Indian PIN code.'
  };
};
