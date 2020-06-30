import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';

const OrderDetails = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      const roundedTime = Math.round(msLeft / 1000);

      setTimeLeft(roundedTime > 0 ? roundedTime : 0);
    };

    findTimeLeft();
    const interval = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Order</h1>
      <p>Time left to purchase: {timeLeft} seconds</p>
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
