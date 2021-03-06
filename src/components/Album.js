import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: "--:--",
      currentVolume: 0.3,
      duration: album.songs[0].duration,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = 0.3;


  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  formatTime(timeInSeconds) {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) {
      return "--:--";
    } else {
      let minutes = Math.floor(timeInSeconds / 60);
      //let seconds = Number.parseFloat(timeInSeconds - (minutes * 60)).toPrecision(2);
      let seconds = Math.trunc(timeInSeconds - (minutes * 60));
      if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
      }
      let resultString = minutes + ":" + seconds;
      return resultString;  
    }
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.formatTime(this.audioElement.currentTime) });
      },
      durationchange: e => {
        this.setState({ duration: this.formatTime(this.audioElement.duration) });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleMouseOver(index) {

    let iconSpan = document.querySelector("#table-body").childNodes[index].childNodes[0].childNodes[0];
    let numberSpan = document.querySelector("#table-body").childNodes[index].childNodes[0].childNodes[1];
    iconSpan.style.display = 'inline';
    numberSpan.style.display = 'none';
  }

  handleMouseLeave(index) {

    let iconSpan = document.querySelector("#table-body").childNodes[index].childNodes[0].childNodes[0];
    let numberSpan = document.querySelector("#table-body").childNodes[index].childNodes[0].childNodes[1];
    iconSpan.style.display = 'none';
    numberSpan.style.display = 'inline';
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    let newVolume = parseFloat(e.target.value);
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume});
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody id="table-body">
            {
              this.state.album.songs.map((song, index) =>
                <tr className="song" key={index}
                  onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.handleMouseOver(index)}
                  onMouseLeave={() => this.handleMouseLeave(index)}>
                  <td>
                    <span className={this.state.isPlaying && (this.state.currentSong === song) ? 'icon ion-md-pause' : 'icon ion-md-play'}
                      style={{ display: 'none' }}></span>
                    <span style={{ display: 'inline' }}>{index + 1}</span>
                  </td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(song.duration)}</td>
                </tr>)

            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.state.currentTime}
          currentVolume={this.state.currentVolume}
          duration={this.state.duration}
          formatTime={() => this.formatTime()}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;