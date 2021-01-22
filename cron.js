const cron = require('node-cron');
const axios = require('axios');

const URL_LIST = {
  ID: "http://localhost:1337/huntflow/company-id",
  SYNC: "http://localhost:1337/huntflow/sync-candidate",
}

module.exports = {
  start: () => {
    cron.schedule('*/30 * * * * *', () => {
      console.log(`Cron jon at ${Date()}`);
      
      axios.get(URL_LIST.SYNC).then((res) => {
        console.log("RESPONSE IS");
        console.log(res.data);
        console.log("========================================");
      }).catch((err) => {
        console.log("ERROR IS");
        console.log(err);
        console.log("========================================");
      });

    });
  }
}
