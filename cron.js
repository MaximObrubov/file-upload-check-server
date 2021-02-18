const cron = require('node-cron');
const axios = require('axios');

const URL_LIST = {
  ID: "http://localhost:1337/huntflow/company-id",
  SYNC: "http://localhost:1337/huntflow/sync-candidate",
  APPLY: "http://localhost:1337/huntflow/apply-candidate",
}

module.exports = {
  start: () => {
    cron.schedule('*/40 * * * * *', () => {
      console.log(`Cron jon at ${Date()}`);
      
      axios.patch(URL_LIST.SYNC, null, {
        headers: {
          'Authorization': 'Bearer test-value'
        }
      }).then((res) => {
        console.log("RESPONSE IS");
        console.log(res.data);
        console.log("========================================");
      }).catch((err) => {
        console.log("ERROR IS");
        console.log(err.response);
        console.log("========================================");
      });

    });
    
    cron.schedule('*/40 * * * * *', () => {
      console.log(`Apply cron job at ${Date()}`);
    
      axios.patch(URL_LIST.APPLY, null, {
        headers: {
          'Authorization': 'Bearer test-value'
        }
      }).then((res) => {
        console.log("RESPONSE IS");
        console.log(res.data);
        console.log("========================================");
      }).catch((err) => {
        console.log("ERROR IS");
        console.log(err.response);
        console.log("========================================");
      });
    
    });
  }
}
