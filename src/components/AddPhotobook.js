import React, { useState } from "react";
import PhotobookDataService from "../services/PhotobookService";

const AddPhotobook = () => {
  const initialPhotobookState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [photobook, setPhotobook] = useState(initialPhotobookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPhotobook({ ...photobook, [name]: value });
  };

  const savePhotobook = () => {
    var data = {
      title: photobook.title,
      description: photobook.description
    };

    PhotobookDataService.create(data)
      .then(response => {
        setPhotobook({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPhotobook = () => {
    setPhotobook(initialPhotobookState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPhotobook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={photobook.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={photobook.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={savePhotobook} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPhotobook;