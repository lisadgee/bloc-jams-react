import React from 'react';

const Landing = () => (
  // All content will be in one bootstrap row with multiple columns.
  // Note:  Because this is React, "class" needs to be changed to "ClassName".

  <div className="row">
    {/* Content (text) goes in this column. */}
    <div className=".col-md-8">
      <div className="row">
        <p className="main_title">Bloc Jams</p>
      </div>
      <div className="row">
        <h3 className="content">Turn the music up!</h3>
      </div>
      <div className="row">
        <h3 className="content">Choose your music</h3>
      </div>
      <div className="row">
        <p className="indent">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="row">
        <h3 className="content">Unlimited, streaming, ad-free</h3>
      </div>
      <div className="row">
        <h4 className="content">No arbitrary limits. No distractions.</h4>
      </div>
      <div className="row">
        <h3 className="content">Mobile enabled</h3>
      </div>
      <div className="row">
        <p className="indent">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </div>

    {/* Image goes in this column.  */}
    <div className="col-md-4 image">
      <div className="text-center"><img src="http://res.cloudinary.com/dafrxcavi/image/upload/v1528473006/pink_headphones_dlusc9.jpg" className="rounded" alt="girl with pink headphones" /></div>
    </div>

    {/*Music library button in this column.*/}
    <div className="col-md-12">
      <div className="row library-button">
        {/* Bootstrap for music library button.  */}
        <a href="http://localhost:3000/library" className="btn btn-primary btn-lg active content" role="button" aria-pressed="true">Music Library</a>
      </div>

    </div>



  </div>



);


export default Landing;