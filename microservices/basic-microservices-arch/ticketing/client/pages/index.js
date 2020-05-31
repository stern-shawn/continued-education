import { buildClient } from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  console.log('currentUser: ', currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
