export default function handler(req, res) {
  const { pid } = req.query
  fetch(`https://itunes.apple.com/lookup?id=${pid}&media=podcast&entity=podcastEpisode&limit=20`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.')
    })
    .then(data => res.status(200).json(data));
}

