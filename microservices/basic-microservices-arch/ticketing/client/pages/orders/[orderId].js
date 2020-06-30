import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderDetails = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();

      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const interval = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (timeLeft < 0)
    return (
      <div>
        <h1>Order Expired</h1>
      </div>
    );

  return (
    <div>
      <h1>Order</h1>
      <p>Time left to purchase: {timeLeft} seconds</p>
      <StripeCheckout
        amount={order.ticket.price * 100}
        email={currentUser.email}
        stripeKey="pk_test_zocXJDydz3EqYJxc3JGDn8eh"
        token={(token) => console.log(token)}
      />
    </div>
  );
};

OrderDetails.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data: order } = await client.get(`/api/orders/${orderId}`);
  console.log('order: ', order);

  return { order };
};

export default OrderDetails;
