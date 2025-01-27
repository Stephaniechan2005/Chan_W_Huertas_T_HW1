(() => {
  gsap.registerPlugin(ScrollToPlugin);

  const charBox = document.querySelector("#char-box");
  const movieTemplate = document.querySelector("#movie-template");
  const movieCon = document.querySelector("#movie-con");
  const baseUrl = "https://swapi.dev/api/";
  const loader = document.querySelector("#loader");
  const loader2 = document.querySelector("#loader2");

  // const links = document.querySelectorAll("#char-box li a");
  // console.log(links);
  // links.forEach(function (link) {
  //   link.addEventListener("click", () => {
  //     gsap.to(window, {
  //       duration: 2,
  //       scrollTo: { y: "#movie-con", offsetY: 200 },
  //     });
  //   });
  // });

  // constdocument.querySelectorAll("li").forEach((li, index) => {
  //   li.addEventListener("click", () => {
  //     gsap.registerPlugin(ScrollToPlugin);
  //     gsap.to(window, {
  //       duration: 2,
  //       scrollTo: { y: "#movie-con" + (index + 1), offsetY: 200 },
  //     });
  //   });
  // });

  function getChar() {
    loader.classList.toggle("hidden");
    // Mapping of character names to image URLs
    const characterImages = {
      "Luke Skywalker": "../images/luke-skywalker.png",
      "Darth Vader": "../images/darth-vader.png",
      "Leia Organa": "../images/leia-organa.png",
      "Owen Lars": "../images/owen-lars.png",
      "Beru Whitesun lars": "../images/beru-whitesun-lars.png",
      "R5-D4": "../images/R5-D4.png",
      "Biggs Darklighter": "../images/biggs-darklighter.png",
      "Obi-Wan Kenobi": "../images/obi-wan-kenobi.png",
      "C-3PO": "../images/C-3po.png",
      "R2-D2": "../images/R2-D2.png",
    };

    fetch(`${baseUrl}people`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);
        const chars = response.results;
        const ul = document.createElement("ul");
        chars.forEach((char) => {
          const li = document.createElement("li");

          const a = document.createElement("a");
          a.dataset.movie = char["films"];

          // Create and append the image element
          const img = document.createElement("img");
          img.src = characterImages[char["name"]];
          a.appendChild(img);

          // Append the text content after the image
          const text = document.createTextNode(char["name"]);
          a.appendChild(text);

          li.appendChild(a);
          ul.appendChild(li);
        });
        charBox.appendChild(ul);
        loader.classList.toggle("hidden");
        setupSlider(); // Move this line here
      })
      .then(function () {
        const links = document.querySelectorAll("#char-box li a");
        console.log(links);
        links.forEach(function (link) {
          link.addEventListener("click", (e) => {
            // Remove highlight from all characters
            links.forEach((link) =>
              link.parentElement.classList.remove("highlight")
            );
            // Highlight the clicked character
            e.currentTarget.parentElement.classList.add("highlight");
            getMovie(e);
          });
        });
      })
      .catch(function (err) {
        console.log(err);
        charBox.innerHTML = "<p>No character avaliable for this section</p>";
      });

    function getMovie(e) {
      // Mapping of movie titles to image URLs
      const movieImages = {
        "A New Hope": "../images/new-hope.png",
        "The Empire Strikes Back": "../images/empire-strikes-back.png",
        "Return of the Jedi": "../images/return-of-the-jedi.png",
        "The Phantom Menace": "../images/the-phantom-menace.png",
        "Attack of the Clones": "../images/attack-of-the-clones.png",
        "Revenge of the Sith": "../images/revenge-of-the-sith.png",
        // "The Force Awakens": "../images/force-awakens.png",
        // "The Last Jedi": "../images/the-last-jedi.png",
        // "The Rise of Skywalker": "../images/the-rise-of-skywalker.png",
      };

      //console.log("getmovieed called"
      //console.log(e.currentTarget.dataset.movie);
      const movieIDs = e.currentTarget.dataset.movie.split(",");
      movieIDs.forEach((movieID, index) => {
        loader2.classList.toggle("hidden");
        movieCon.innerHTML = "";
        console.log(movieID);
        fetch(`${movieID}`)
          .then((response) => response.json())
          .then(function (response) {
            console.log(response.title);

            const clone = movieTemplate.content.cloneNode(true);

            // Create a container for the image and movie details
            const movieContainer = document.createElement("div");
            movieContainer.classList.add("movie-container");

            // Add movie image
            const movieImage = document.createElement("img");
            movieImage.src = movieImages[response["title"]];
            movieImage.classList.add("movie-image");
            movieContainer.appendChild(movieImage);

            // Add movie details to the container
            const movieDetails = document.createElement("div");
            movieDetails.classList.add("movie-details");

            const movieHeading = clone.querySelector(".movie-heading");
            movieHeading.innerHTML = response.title;
            movieDetails.appendChild(movieHeading);
            const movieDirector = clone.querySelector(".movie-director");
            movieDirector.innerHTML = `Director: ${response.director}`;
            movieDetails.appendChild(movieDirector);
            const movieEp = clone.querySelector(".movie-ep");
            movieEp.innerHTML = `Episode: ${response.episode_id}`;
            movieDetails.appendChild(movieEp);
            const movieDescription = clone.querySelector(".movie-description");
            movieDescription.innerHTML = response.opening_crawl;
            movieDetails.appendChild(movieDescription);

            movieContainer.appendChild(movieDetails);
            movieCon.appendChild(movieContainer);

            // Animate the movie container
            gsap.to(window, {
              duration: 3,
              ease: "power2.out",
              scrollTo: { y: "#movie-con", offsetY: 0 },
            });
            gsap.from(movieContainer, {
              opacity: 0,
              y: 50,
              duration: 3,
              ease: "power2.out",
              delay: index * 0.4, // Add a 0.5 second delay for each movie
            });
            // gsap.from(movieContainer, {
            //   opacity: 0,
            //   y: 100, // Move the movie container up
            //   ease: "power3.out",
            //   duration: 0.5,
            //   stagger: 0.5,
            //   // delay: index * 0.5, // Delay the animation of each movie by 0.5 seconds
            //   scrollTrigger: {
            //     trigger: "#movie-con",
            //     toggleActions: "play none none none",
            //     start: "top center",
            //     end: "bottom center",
            //     markers: true,
            //   },
            // });
            loader2.classList.toggle("hidden");
          })
          .catch(function (err) {
            movieCon.innerHTML = "<p>No movie avaliable for this section</p>";
          });
      });
    }
  }

  //slider function
  function setupSlider() {
    const ul = document.querySelector("#char-box ul");
    let isDown = false;
    let startX;
    let scrollLeft;

    ul.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
      isDown = true;
      ul.classList.add("active");
      startX = e.pageX - ul.offsetLeft;
      scrollLeft = ul.scrollLeft;
    });

    ul.addEventListener("mouseleave", () => {
      isDown = false;
      ul.classList.remove("active");
    });

    ul.addEventListener("mouseup", () => {
      isDown = false;
      ul.classList.remove("active");
    });

    ul.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ul.offsetLeft;
      const walk = (x - startX) * 1; // Scroll-slow
      ul.scrollLeft = scrollLeft - walk;
    });

    // Add smooth scrolling
    ul.style.scrollBehavior = "smooth";
  }

  getChar();
})();
