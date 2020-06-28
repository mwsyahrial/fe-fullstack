import React, { useState, useEffect } from "react";
import PhotobookDataService from "../services/PhotobookService";

const Photobook = props => {
  const initialPhotobookState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentPhotobook, setCurrentPhotobook] = useState(initialPhotobookState);
  const [message, setMessage] = useState("");

  const getPhotobook = id => {
    PhotobookDataService.get(id)
      .then(response => {
        setCurrentPhotobook(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPhotobook(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPhotobook({ ...currentPhotobook, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentPhotobook.id,
      title: currentPhotobook.title,
      description: currentPhotobook.description,
      published: status
    };

    PhotobookDataService.update(currentPhotobook.id, data)
      .then(response => {
        setCurrentPhotobook({ ...currentPhotobook, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePhotobook = () => {
    PhotobookDataService.update(currentPhotobook.id, currentPhotobook)
      .then(response => {
        console.log(response.data);
        setMessage("The photobook was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePhotobook = () => {
    PhotobookDataService.remove(currentPhotobook.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/photobooks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPhotobook ? (
        <div className="edit-form">
          <h4>Photobook</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPhotobook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPhotobook.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPhotobook.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPhotobook.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePhotobook}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePhotobook}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Photobook...</p>
        </div>
      )}
    </div>
  );
};

export default Photobook;