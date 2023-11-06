import React, { useState } from 'react';
import './App.css';
import ImageGallery from './componet/imageGallery';
import productImages from './constants/images';


function App() {

  const [images, setImages] = useState(productImages);
  
  const featuredImageIndex = images.length-1; // Set the index of the featured image
  return (
    <div className="App">
       
      <ImageGallery images={images} setImages={setImages} featuredImageIndex={featuredImageIndex}/>
      
    </div>
  );
}

export default App;
