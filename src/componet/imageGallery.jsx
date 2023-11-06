import 'font-awesome/css/font-awesome.css';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './image-gallery.css';


const ImageGallery = ({ images, featuredImageIndex, setImages }) => {
  const [checkedImageIds, setCheckedImageIds] = useState([]);

  const handleCheckboxChange = (imageId) => {
    setCheckedImageIds((prevCheckedImageIds) =>
      prevCheckedImageIds.includes(imageId)
        ? prevCheckedImageIds.filter((id) => id !== imageId)
        : [...prevCheckedImageIds, imageId]
    );
  };


// Function to delete selected images
const deleteSelectedImages = () => {
  const newImages = images.filter((image) => !checkedImageIds.includes(image.id));
  setImages(newImages);
  // Reset the checked IDs after deleting the images
  setCheckedImageIds([]);
};

const onDragEnd = (result) => {
  const { destination, source } = result;
  if (!destination || destination.index === source.index) {
    return;
  }

  const newImages = Array.from(images);
  const [removed] = newImages.splice(source.index, 1);
  newImages.splice(destination.index, 0, removed);

  setImages(newImages);
};

const numberOfSelectedFiles = checkedImageIds.length;

  return (
    <section className='wrapper'>
      <div className='header'>
        {/* Conditional rendering inside file-count div */}
        <div className="file-count">
          {numberOfSelectedFiles > 0 ? (
            // Render this div when files are selected
            <>
              <div className='file-checked'>
                <input
                  type="checkbox"
                  checked={numberOfSelectedFiles > 0}
                  readOnly
                />
              </div>
              <div className='file-selected'>{numberOfSelectedFiles} Files Selected</div>
            </>
          ) : (
            // Render Gallery text when no files are selected
            <div className='gallery-text'>Gallery</div>
          )}
        </div>
        
        <button 
          onClick={deleteSelectedImages} 
          className='delete-button'
          style={{ display: numberOfSelectedFiles > 0 ? 'block' : 'none' }}
        >
          Delete Files
        </button>
      </div>

    <hr/>


    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableGallery">
          {(provided) => (
            <div 
              className="image-gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={String(image.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={image.id === featuredImageIndex ? 'featured-image' : 'regular-image'}
                    >
                      <input
                        type='checkbox'
                        checked={checkedImageIds.includes(image.id)}
                        onChange={() => handleCheckboxChange(image.id)}
                      />
                      <img src={image.img} alt={`Image ${image.id}`} className='image' /> 
                      <div className={checkedImageIds.includes(image.id) ? 'is-checked' : 'hover-overlay'}></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {/* Leave the add-image section out of the Draggable context */}
              <div className='add-image'>
                <i className="fa fa-image fa-2x"></i>
                <p>Add Images</p>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}

export default ImageGallery