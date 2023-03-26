var links = documents.querySelectorAll(".link")

//for loop click listener event 

links.forEach(link => {

    link.addEventListener('click', (event) => {
      // Prevent the default link behavior
      event.preventDefault();

      const href= link.getAttribute("href");

      window.location.href=href 
    

    }
    );
}
);


