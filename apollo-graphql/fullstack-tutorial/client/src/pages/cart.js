import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default () => (
  <Query query={GET_CART_ITEMS}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR: {error.message}</p>;

      return (
        <>
          <Header>My Cart</Header>
          {!data.cartItems || !data.cartItems.length ? (
            <p data-testid="empty-message">No items in your cart</p>
          ) : (
            <>
              {data.cartItems.map(launchId => (
                <CartItem key={launchId} launchId={launchId} />
              ))}
              <BookTrips cartItems={data.cartItems} />
            </>
          )}
        </>
      );
    }}
  </Query>
);
