export default function handler(req, res) {
  fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.')
    })
    .then(data => res.status(200).json(data));
}

