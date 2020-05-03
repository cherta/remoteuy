export default (req, res) => {
  // Handle challenge
  if (req.body && req.body.challenge) {
    res.send(req.body.challenge);
    return;
  }

  // Handle events
};
