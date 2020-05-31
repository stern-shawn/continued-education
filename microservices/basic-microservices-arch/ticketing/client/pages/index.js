import { buildClient } from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  return <h1>{`You are ${currentUser == null ? 'NOT' : ''} signed in`}</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
