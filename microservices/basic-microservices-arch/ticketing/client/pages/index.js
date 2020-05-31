import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log('currentUser: ', currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        // Passes along host: 'ticketing.dev' as well as our cookie header :D. This is necessary so
        // that inside k8s, ingress sees a request to ticketing.dev and can apply its routing rules
        // since we're using a radically different path to hit the ingress LB...
        headers: req.headers,
      }
    );
    return data;
  } else {
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
