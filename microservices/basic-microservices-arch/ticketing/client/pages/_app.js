import 'bootstrap/dist/css/bootstrap.css';

import { buildClient } from '../api/buildClient';
import { Header } from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

// App getInitialProps.context = { Component, ctx: { req, res }, Router, ...}
// Component's `getInitialProps` is accessible from Component!
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  const pageProps =
    (await appContext.Component.getInitialProps?.(appContext.ctx, client, data.currentUser)) ?? {};

  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default AppComponent;
