export const coupons = [
  {
    code: 'ATELIER20',
    discountPercent: 20,
    minOrderAmount: 2999,
    maxDiscount: 1500,
    description: 'Get 20% off on premium orders above ₹2,999'
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minOrderAmount: 999,
    maxDiscount: 1000,
    description: '10% off on your first atelier order'
  },
  {
    code: 'SUMMER15',
    discountPercent: 15,
    minOrderAmount: 2499,
    maxDiscount: 1200,
    description: '15% off across Summer & Resort collections'
  },
  {
    code: 'FESTIVE25',
    discountPercent: 25,
    minOrderAmount: 4999,
    maxDiscount: 2500,
    description: '25% festive curation savings on orders over ₹4,999'
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minOrderAmount: 499,
    description: 'Complimentary expedited white-glove shipping'
  }
];

export const calculateCouponDiscount = (couponCode, subtotal) => {
  if (!couponCode) return { valid: false, discount: 0, message: '' };
  
  const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
  
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code.' };
  }

  if (subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ₹${coupon.minOrderAmount} required for ${coupon.code}.`
    };
  }

  if (coupon.freeShipping) {
    return {
      valid: true,
      freeShipping: true,
      discount: 0,
      coupon,
      message: 'Complimentary shipping applied!'
    };
  }

  let discount = Math.round((subtotal * coupon.discountPercent) / 100);
  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

  return {
    valid: true,
    discount,
    coupon,
    message: `Applied ${coupon.code} (-₹${discount})`
  };
};
