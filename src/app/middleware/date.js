/* 
  Returns the number of seconds since epoch in UTC.
*/
exports.getEpochSecond = () => {
  const now = new Date();
  return Math.round(now.getTime() / 1000);
};
