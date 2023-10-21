let login = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  login.classList.toggle("active");
  navbar.classList.remove("active");
};

async function getBreedInfo(breedName) {
  const apiNinjasApiKey = "MwMXzeKuPLoIfgYgYDZX0Q==up8SKgl2NaE7SG93"; // Replace with your API key
  const apiNinjasUrl = `https://api.api-ninjas.com/v1/dogs?name=${breedName}`;
  const infoResponse = await fetch(apiNinjasUrl, {
    headers: {
      "X-Api-Key": apiNinjasApiKey,
    },
    contentType: "application/json",
  });

  if (infoResponse.ok) {
    const breedInfo = await infoResponse.json();
    const queryParams = new URLSearchParams();
    const breedDescriptionJSON = JSON.stringify(breedInfo);
    queryParams.append("breedName", breedName);
    queryParams.append("breedDescription", breedDescriptionJSON);
    const resultUrl = `result.html?${queryParams.toString()}`;
    window.location.href = resultUrl;
    console.log(breedInfo);
  } else {
    console.error("Error fetching breed info:", infoResponse.status);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Get references to the button and file input
  const uploadButton = document.getElementById("uploadButton");
  const imageInput = document.getElementById("imageInput");

  // Add a click event listener to the button
  uploadButton.addEventListener("click", function () {
    // Trigger a click event on the hidden file input
    imageInput.click();
    console.log("Clicked");
  });

  // Add an event listener to handle form submission
  imageInput.addEventListener("change", async function (e) {
    // Send the image to the server using the fetch API
    e.preventDefault();
    console.log("Form Data Created");
    // Handle image prediction here using the provided model URL
    const modelUrl = "https://inusekai-sdwn2zjcua-el.a.run.app/predict"; // Replace with the actual model URL
    try {
      const formData = new FormData();
      formData.append("file", imageInput.files[0]);
      uploadButton.textContent = "Predicting Breed ...";
      const response = await fetch(modelUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        data = await response.json();
        breedName = data.breed;
        console.log(data);
        console.log(breedName);

        // Use the predicted breed to fetch information from the Dogs API
        getBreedInfo(breedName);
      } else {
        console.error("Error predicting breed:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});

document
  .getElementById("animalbtn1")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const breedName = document
      .querySelector("#animalbtn1")
      .closest(".box")
      .querySelector("h3").textContent;
    getBreedInfo(breedName);
  });

document
  .getElementById("animalbtn2")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const breedName = document
      .querySelector("#animalbtn2")
      .closest(".box")
      .querySelector("h3").textContent;
    getBreedInfo(breedName);
  });

document
  .getElementById("animalbtn3")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const breedName = document
      .querySelector("#animalbtn3")
      .closest(".box")
      .querySelector("h3").textContent;
    getBreedInfo(breedName);
  });

document
  .getElementById("animalbtn4")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const breedName = document
      .querySelector("#animalbtn4")
      .closest(".box")
      .querySelector("h3").textContent;
    getBreedInfo(breedName);
  });

let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  login.classList.remove("active");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  login.classList.remove("active");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".gallery-slider", {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
  },
});
