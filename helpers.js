// Time for the console, to see when changes have been done
exports.getTime = function() {
  const currentdate = new Date();
  return (currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds());
};