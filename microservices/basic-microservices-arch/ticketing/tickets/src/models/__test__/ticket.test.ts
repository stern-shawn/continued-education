import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // Create a ticket and save it
  const ticket = Ticket.build({
    title: 'concert',
    price: 1,
    userId: 'abc',
  });
  await ticket.save();
  // Fetch the ticket twice (so we have two instances with the same version number)
  const [first, second] = await Promise.all([Ticket.findById(ticket.id), Ticket.findById(ticket.id)]);

  // Make multiple edits
  first!.set({ price: 10 });
  second!.set({ price: 15 });

  // Save the first
  await first!.save();

  // Save the second and expect a versioning error (use try catch + done since expect.toThrow doesn't work)
  try {
    await second!.save();
  } catch (e) {
    return done();
  }

  throw new Error('Should not reach this point if OCC is working');
});

it('increments the version on multiple saves', async () => {
  // Create a ticket and save it
  const ticket = Ticket.build({
    title: 'concert',
    price: 1,
    userId: 'abc',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
