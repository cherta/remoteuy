import fetch from "node-fetch";

export default async (req, res) => {
  // Handle challenge
  if (req.body && req.body.challenge) {
    res.send(req.body.challenge);
    return;
  }

  const { event } = req.body;

  // Handle events
  if (event.channel !== process.env.JOBS_CHANNEL) {
    res.status(422).send("");
    return;
  }

  const matcher = /[#]+[A-Za-z0-9-_]+/g;
  const matches = event.text.match(matcher);

  if (!matches || !matches.includes("#job-offer")) {
    res.status(422).send("");
    return;
  }

  try {
    const { user } = await fetch(
      `https://slack.com/api/users.info?token=${process.env.SLACK_OAUTH_ACCESS_TOKEN}&user=${event.user}`
    ).then((r) => r.json());

    const payload = {
      user,
      message: event,
    };

    // Here we need to call FaunaDB to store the "job post"
    console.log(payload);

    res.status(201).send("");
  } catch (e) {
    console.error(e);
    res.status(500).send("");
  }
};
