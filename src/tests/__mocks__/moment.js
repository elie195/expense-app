const moment = require.requireActual('moment');

const Moment = (timestamp = 0) => {
  return moment(timestamp);
};

export default Moment;
