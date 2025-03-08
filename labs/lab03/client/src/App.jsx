import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css'

const App = () => {
  // what do we need to track
  // setters for saving
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);

  // getters for displaying
  const [displayImage, setDisplayImage] = useState(null); // Display single image
  const [displayImages, setDisplayImages] = useState([]); // Display multiple image
  const [displayDogImage, setDisplayDogImage] = useState(null);

  const [message, setMessage] = useState("");

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
      setMessage("Please select a file before uploading");
      return;
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      // The information we get is images in the format called blob not JSON

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();

    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple [TODO]
  // fetch functions -> fetch multiple [TODO]
  const fetchMultiple = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data);

      setMultipleFiles(data);

      const filePromises = data.map(async (filename) => {
        const fetchFilenameData =
          await fetch(`http://localhost:8000/fetch/file/${filename}`);
        const fileBlob = await fetchFilenameData.blob();
        return URL.createObjectURL(fileBlob);
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);

    } catch (error) {
      console.log(error);
    };

  }

  // fetch functions -> fetch dog image [TODO]
  const fetchDogImage = async () => {

    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();

      setDisplayDogImage(data.message);

    } catch (error) {
      console.log(error);
    }
  }
  // fetch functions -> save dog image [TODO]
  const saveDogImage = async (e) => {
    e.preventDefault();

    // Error handling - check if the image is there
    try {

      // fetch the dog image, get the blob
      const response = await fetch(displayDogImage);
      const blob = await response.blob();

      // save the blob in form data
      const formData = new FormData();
      formData.append("file", blob, "dog-image.jpg");

      // upload formData
      const uploadResponse = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData
      });

      const data = uploadResponse.json();
      setMessage(data.message);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="center-align">
      <h1>Image Upload Service</h1>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <Button variant="primary" onClick={fetchSingleFile}>Fetch Single File</Button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <div className="file-input-wrapper">
          <button className="button">Choose File</button>
          <input type="file" onChange={handleSingleFileChange} />
        </div>
      </form>
      <h2>Fetch Multiple Images</h2>
      <Button variant="primary" onClick={fetchMultiple}>Grab multiple files</Button>
      {/* Conditional rendering
      {condition ? (true) : (false)} */}
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
            />
          </div>
        ))
      ) : (
        <p>No image to display</p>
      )}
      <h2>Fetch Dog Image</h2>
      <Button variant="primary" onClick={fetchDogImage}>Fetch a dog image</Button>
      {displayDogImage && (
        <div>
          <img
            src={displayDogImage}
            style={{ width: "200px", margin: "10px" }}
          />
          <br />
          <Button variant="primary" onClick={saveDogImage}>Save for later</Button>
        </div>
      )}
    </div>
  );
};

export default App;
