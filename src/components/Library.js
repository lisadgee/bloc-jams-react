import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
  render() {

    return (
      // All content will go in one Bootstrap column
      <div ClassName="col-md-12">
        <section className='library'>
          {
            this.state.albums.map((album, index) =>

              <Link to={`/album/${album.slug}`} key={index}>



                <div className="row  album-placement">
                  <img className="album-covers" src={album.albumCover} alt={album.title} />
                </div>
                <div className="row  album-placement">
                  <p>{album.title}</p>
                </div>
                <div className="row  album-placement">
                  <p>{album.artist}</p>
                </div>
                <div className="row  album-placement">
                  <p>{album.songs.length} songs</p>
                </div>

              </Link>
            )
          }
        </section>

        {/* Button linking user back to Landing page in this col. */}
        <div className="col-md-12">
          <div className="row library-button">
            <a href="http://localhost:3000" className="btn btn-primary btn-lg active content" role="button" aria-pressed="true">Landing Page</a>
          </div>

        </div>

      </div>










    );
  }
}

export default Library;