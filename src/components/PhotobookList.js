import React, { useState, useEffect } from "react";
import PhotobookDataService from "../services/PhotobookService";
import { Link } from "react-router-dom";

const PhotobooksList = () => {
  const [photobooks, setPhotobooks] = useState([]);
  const [currentPhotobook, setCurrentPhotobook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePhotobooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePhotobooks = () => {
    PhotobookDataService.getAll()
      .then(response => {
        setPhotobooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePhotobooks();
    setCurrentPhotobook(null);
    setCurrentIndex(-1);
  };

  const setActivePhotobook = (photobook, index) => {
    setCurrentPhotobook(photobook);
    setCurrentIndex(index);
  };

  const removeAllPhotobooks = () => {
    PhotobookDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PhotobookDataService.findByTitle(searchTitle)
      .then(response => {
        setPhotobooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Photobooks List</h4>

        <ul className="list-group">
          {photobooks &&
            photobooks.map((photobook, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePhotobook(photobook, index)}
                key={index}
              >
                {photobook.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPhotobooks}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPhotobook ? (
          <div>
            <h4>Photobook</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPhotobook.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPhotobook.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPhotobook.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/photobooks/" + currentPhotobook.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Photobook...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotobooksList;