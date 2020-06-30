const LandingPage = ({ currentUser, tickets }) => {
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Component getInitialProps.context = { req, res }
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data: tickets } = await client.get('/api/tickets');

  return { tickets };
};

export default LandingPage;
