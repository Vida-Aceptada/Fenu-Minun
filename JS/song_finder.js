/* exported checkParameters */

function checkParameters() {
  let song = document.getElementsByName('song search')[0].value;
  let artist = document.getElementsByName('artist search')[0].value;
  songSearch(song, artist);
}

function songSearch(song, artist) {
  let query = encodeURIComponent(`${song} ${artist}`);
  let Url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=AIzaSyD2YxCsNqQyeitu8PIhewyDF9ZabhuZevc`;
  fetch(Url)
  .then(res => {return res.json();})
  .then(json => {document.getElementById('SONG_RESULT').innerHTML = `<a id="YTLINK" href="https://youtu.be/${json.items[0].id.videoId}" target="_blank">Lyrics</a>`;});
  
  request.open('GET', `https://api.lyrics.ovh/v1/${artist}/${song}`);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      let lyrics = JSON.parse(this.responseText).lyrics;
      console.log(lyrics);
      document.getElementById('LYRICS_RESULT').textContent = lyrics;
    }
  };
  
  request.send();
}