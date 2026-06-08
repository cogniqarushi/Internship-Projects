import https from 'https';
import fs from 'fs';

https.get('https://lh3.googleusercontent.com/d/1fWCG2m7utI6m8MO_KIYYbSe8KmXnmmMF', (res) => {
  let chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    let buffer = Buffer.concat(chunks);
    let base64 = buffer.toString('base64');
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
  </defs>
  <image width="115" height="115" x="-7.5" y="-7.5" href="data:image/png;base64,${base64}" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
    fs.writeFileSync('public/favicon.svg', svg);
    console.log('done');
  });
});
