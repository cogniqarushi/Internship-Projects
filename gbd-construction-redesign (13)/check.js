(async () => {
  try {
    const res = await fetch('https://cdn.pixabay.com/video/2021/08/25/86367-593641261_large.mp4', { method: 'HEAD' });
    console.log("Status:", res.status);
  } catch(e) {
    console.error(e);
  }
})();
