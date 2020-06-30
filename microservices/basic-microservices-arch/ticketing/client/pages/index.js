const LandingPage = ({ currentUser }) => {
  return <h1>{`You are ${currentUser == null ? 'NOT' : ''} signed in`}</h1>;
};

// Component getInitialProps.context = { req, res }
LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
