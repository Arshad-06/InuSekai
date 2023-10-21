document.addEventListener("DOMContentLoaded", function () {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const breedName = urlParams.get("breedName");
  const breedDescriptionJSON = urlParams.get("breedDescription");

  // Convert the JSON string back to an object
  const breedDescription = JSON.parse(breedDescriptionJSON);

  // Update the elements on the result page
  const breedNameElement = document.getElementById("breedName");
  const breedElement = document.getElementById("breed");
  console.log(breedDescription);

  // Select the .image element where you want to display the image
  const imageElement = document.querySelector(".image");

  // Check if the 'image_link' property exists in breedDescription
  if (breedDescription[0].hasOwnProperty("image_link")) {
    // Get the URL from the 'image_link' property
    const imageUrl = breedDescription[0].image_link;

    // Create a new <img> element
    const imgElement = new Image();
    imgElement.src = imageUrl;
    imgElement.alt = "Breed Image"; // You can set the 'alt' attribute as well

    // Apply the original CSS styles to the fetched image
    imgElement.style.width = "100%";
    imgElement.style.flex = "1 1 31rem"; // Apply the flex property
    imgElement.style.objectFit = "cover"; // Apply object-fit property

    // Replace the existing .image content with the new image
    imageElement.innerHTML = ""; // Remove the original <img>
    imageElement.appendChild(imgElement);
  } else {
    // Handle the case where 'image_link' is not present in the data
    imageElement.innerHTML = "<p>No image available</p>";
  }

  if (breedNameElement) {
    breedNameElement.textContent = "Your Dog Is A " + breedName + " !";
    breedElement.textContent = breedName;
    // Function to convert underscore_case to CamelCase
    function toCamelCase(str) {
      return str
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    // Function to create a property element
    function createPropertyElement(propertyName, propertyValue) {
      console.log(propertyName);
      console.log(propertyValue);
      const propertyElement = document.createElement("div");
      propertyElement.classList.add("property");

      // Convert property name to CamelCase and style it
      const propertyNameCamel = toCamelCase(propertyName);
      const propertyLabel = document.createElement("h4");
      propertyLabel.textContent = propertyNameCamel;
      propertyElement.appendChild(propertyLabel);

      // Check if property value is a rating (1 to 5)
      if (propertyValue >= 1 && propertyValue <= 5) {
        const stars = "★".repeat(propertyValue) + "☆".repeat(5 - propertyValue);
        const ratingElement = document.createElement("p");
        ratingElement.textContent = stars;
        propertyElement.appendChild(ratingElement);
      } else {
        const scaleElement = document.createElement("p");
        scaleElement.textContent = propertyValue;
        propertyElement.appendChild(scaleElement);
      }

      return propertyElement;
    }

    // Function to display properties in the result section
    function displayProperties() {
      const resultSection = document.querySelector(".result");
      const propertiesContainer = document.createElement("div");
      propertiesContainer.classList.add("properties");

      for (const key in breedDescription[0]) {
        if (key === "image_link" || key === "name") {
          continue;
        }

        const propertyElement = createPropertyElement(
          key,
          breedDescription[0][key]
        );
        propertiesContainer.appendChild(propertyElement);
      }

      resultSection.appendChild(propertiesContainer);
    }

    // Call the function to display properties
    displayProperties();
  }
});
