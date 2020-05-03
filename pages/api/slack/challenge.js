export default (req, res) => {
  console.log(Object.keys(req.body));
  res.send(req.body.challenge);
};
