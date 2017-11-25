const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to get the weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);

axios
  .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`)
  .then(({ data }) => {
    console.log(`Address: ${data.results[0].formatted_address}`);
    console.log(`Address: ${data.results[0].geometry.location.lat}`);
    console.log(`Address: ${data.results[0].geometry.location.lng}`);    
  })
  .catch((err) => console.error(err));
