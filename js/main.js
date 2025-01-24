(() => {
  const charBox = document.querySelector("#char-box");
  const movieTemplate = document.querySelector("#movie-template");
  const movieCon = document.querySelector("#movie-con");
  const baseUrl = "https://swapi.dev/api/";
  const loader = document.querySelector("#loader");
  const loader2 = document.querySelector("#loader2");

  function getChar() {
    loader.classList.toggle("hidden");
    fetch(`${baseUrl}people`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);
        const chars = response.results;
        const ul = document.createElement("ul");
        chars.forEach((char) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = char["name"];
          a.dataset.movie = char["films"];
          // console.log(a.dataset.movie[1]);
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
      //console.log("getmovieed called"
      //console.log(e.currentTarget.dataset.movie);
      const movieIDs = e.currentTarget.dataset.movie.split(",");
      movieIDs.forEach((movieID) => {
        loader2.classList.toggle("hidden");
        movieCon.innerHTML = "";
        console.log(movieID);
        fetch(`${movieID}`)
          .then((response) => response.json())
          .then(function (response) {
            console.log(response.title);
            const clone = movieTemplate.content.cloneNode(true);
            const movieDescription = clone.querySelector(".movie-description");
            movieDescription.innerHTML = response.opening_crawl;
            const movieHeading = clone.querySelector(".movie-heading");
            movieHeading.innerHTML = response.title;
            const movieEp = clone.querySelector(".movie-ep");
            movieEp.innerHTML = `Episode: ${response.episode_id}`;
            const movieDirector = clone.querySelector(".movie-director");
            movieDirector.innerHTML = `Director: ${response.director}`;
            movieCon.appendChild(clone);
            loader2.classList.toggle("hidden");
          })
          .catch(function (err) {
            movieCon.innerHTML = "<p>No movie avaliable for this section</p>";
          });
      });
    }
  }
  getChar();
})();
