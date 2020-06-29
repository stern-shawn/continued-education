export const stripe = {
  charges: {
    // Real Stripe creat fn returns a promise, mock that using using the resolved value fn
    create: jest.fn().mockResolvedValue({ id: 'mockChargeId' }),
  },
};
