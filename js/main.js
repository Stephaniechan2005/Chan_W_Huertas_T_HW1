(() => {
  const movieBox = document.querySelector("#movie-box");
  const reviewTemplate = document.querySelector("#review-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = "https://search.imdbot.workers.dev/";

  function getMovie() {
    fetch(`${baseUrl}?q=terminator`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);
        const movies = response.description;
        const ul = document.createElement("ul");
        movies.forEach((movie) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = movie["#TITLE"];
          a.dataset.review = movie["#IMDB_ID"];
          li.appendChild(a);
          ul.appendChild(li);
        });
        movieBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#movie-box li a");
        console.log(links);
        links.forEach(function (link) {
          link.addEventListener("click", getReview);
        });
      })
      .catch(function (err) {
        console.log(err);
        // need to add error handling for user
      });

    function getReview(e) {
      //console.log("getReviewed called"
      //console.log(e.currentTarget.dataset.review);
      const reviewID = e.currentTarget.dataset.review;
      fetch(`${baseUrl}?tt=${reviewID}`)
        .then((response) => response.json())
        .then(function (response) {
          reviewCon.innerHTML = "";
          console.log(response.short.review.reviewBody);
          const clone = reviewTemplate.content.cloneNode(true);
          const reviewDescription = clone.querySelector(".review-description");
          reviewDescription.innerHTML = response.short.review.reviewBody;
          const reviewHeading = clone.querySelector(".review-heading");
          reviewHeading.innerHTML = response.short.name;
          reviewCon.appendChild(clone);
        })
        .catch(function (err) {
          reviewCon.innerHTML = "<p>No review avaliable for this section</p>";
        });
    }
  }
  getMovie();
})();
