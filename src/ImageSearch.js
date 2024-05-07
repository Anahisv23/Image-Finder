// React Challenge:
// Build a React app that fetches random images from an API
// (like Unsplash API) and displays them on the screen.
//  Each time the user clicks a button,
// a new random image should be fetched and displayed.
//You have 30 minutes to complete this challenge. Enjoy!

import { useState } from "react";

const ImageSearch = () => {
  const [buttonText, setButtonText] = useState("Start");
  const [clickCount, setClickCount] = useState(0);
  const [image, setImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleClick = async () => {
    try {
      if (clickCount === 0) {
        setClickCount((prev) => (prev += 1));
        setButtonText("Get a new image");
      }
      const randomImage = await fetchImagesFromApi();
      setAltText(randomImage.alt_description);
      setImage(randomImage.urls.full);
    } catch (error) {
      setAltText("Failed to fetch image");
      setImage("");
    }
  };

  const fetchImagesFromApi = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?&client_id=wKZPC0x7bEhXDUJNvUgrasdMn6lEgIXV2s8qgpLOQxE`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>Image Finder</h1>
      <p>Click button to view different images</p>
      <img src={image} alt={altText} />
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default ImageSearch;