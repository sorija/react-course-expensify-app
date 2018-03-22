//cant simply import moment because it will import THIS file and cause stack overflow
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};