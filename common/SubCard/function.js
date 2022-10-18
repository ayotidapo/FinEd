export const configureFW = (data) => {
  const { subscriptionID, payPlan, amount, user, host, plan } = data;

  return {
    public_key: process.env.FLUTTERWAVE_KEY,
    tx_ref: subscriptionID,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    payment_plan: payPlan,
    redirect_url: `${host}/verify-payment`,
    customer: {
      email: `${user?.email}`,
      phonenumber: `${user?.phone}`,
      name: `${user?.firstName} ${user?.lastName}`,
    },
    customizations: {
      title: 'MONEY AFRICA',
      description: `Subscription plan ${plan?.name}`,
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
};

export const initConfig = {
  public_key: process.env.FLUTTERWAVE_KEY,
  tx_ref: '',
  amount: 0,
  currency: 'NGN',
  payment_options: 'card,mobilemoney,ussd',
  payment_plan: '',
  customer: {
    email: ``,
    phonenumber: ``,
    name: ``,
  },
  customizations: {
    title: 'MONEY AFRICA',
    description: `Subscription plan `,
    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  },
};
