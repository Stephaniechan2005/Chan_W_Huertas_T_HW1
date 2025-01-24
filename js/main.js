(() => {
  const charBox = document.querySelector("#char-box");
  const movieTemplate = document.querySelector("#movie-template");
  const movieCon = document.querySelector("#movie-con");
  const baseUrl = "https://search.imdbot.workers.dev/";
  const loader = document.querySelector("#loader");
  const loader2 = document.querySelector("#loader2");

  function getChar() {
    loader.classList.toggle("hidden");
    fetch(`${baseUrl}?q=terminator`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);
        const chars = response.description;
        const ul = document.createElement("ul");
        chars.forEach((char) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = char["#TITLE"];
          a.dataset.movie = char["#IMDB_ID"];
          li.appendChild(a);
          ul.appendChild(li);
        });
        charBox.appendChild(ul);
        loader.classList.toggle("hidden");
      })
      .then(function () {
        const links = document.querySelectorAll("#char-box li a");
        console.log(links);
        links.forEach(function (link) {
          link.addEventListener("click", getMovie);
        });
      })
      .catch(function (err) {
        console.log(err);
        charBox.innerHTML = "<p>No character avaliable for this section</p>";
      });

    function getMovie(e) {
      loader2.classList.toggle("hidden");
      //console.log("getmovieed called"
      //console.log(e.currentTarget.dataset.movie);
      const movieID = e.currentTarget.dataset.movie;
      fetch(`${baseUrl}?tt=${movieID}`)
        .then((response) => response.json())
        .then(function (response) {
          movieCon.innerHTML = "";
          console.log(response.short.review.reviewBody);
          const clone = movieTemplate.content.cloneNode(true);
          const movieDescription = clone.querySelector(".movie-description");
          movieDescription.innerHTML = response.short.review.reviewBody;
          const movieHeading = clone.querySelector(".movie-heading");
          movieHeading.innerHTML = response.short.name;
          movieCon.appendChild(clone);
          loader2.classList.toggle("hidden");
        })
        .catch(function (err) {
          movieCon.innerHTML = "<p>No movie avaliable for this section</p>";
        });
    }
  }
  getChar();
})();
