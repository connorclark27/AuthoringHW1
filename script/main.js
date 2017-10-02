(function() {
  var theImages = document.querySelectorAll('.image-holder'),
      theHeading = document.querySelector('.heading'),
      theSubheading = document.querySelector('.main-copy h2'),
      theSeasonText = document.querySelector('.main-copy p'),
      appliedClass;

      //I want to change all the content on the page
      function changeElements(){
        //debugger; // this is a special term that stops code execution
        let subImages = document.querySelector('.subImagesContainer');
        let objectIndex = dynamicContent[this.id];

        //remove duplicate images
        while (subImages.firstChild) {
          subImages.removeChild(subImages.firstChild);
        }

        //add the images to the bottom of the page
        objectIndex.images.forEach(function(image, index) {
          //create an image element
          let newSubImg = document.createElement('img');
          //add a css class to it
          newSubImg.classList.add('thumb');
          //set the src
          newSubImg.src = "images/" + objectIndex.images[index];

          //add event handler to trigger a lightbox
          newSubImg.addEventListener('click', function() { popLightbox(index, objectIndex); }, false);


          //add it to the page
          subImages.appendChild(newSubImg);
        });

        //remove the colours we applied on the last click
        theSubheading.classList.remove(appliedClass);
        theHeading.classList.remove(appliedClass);

        //change the text using the properties in the object
        theSubheading.firstChild.nodeValue = objectIndex.headline;
        theSeasonText.firstChild.nodeValue = objectIndex.text;

        //add the colour that corresponds to the season we clicked on
        theSubheading.classList.add(this.id);
        theHeading.classList.add(this.id);

        appliedClass = this.id;
      }

    theImages.forEach(function(image, index){
      //add an event handler to each image
      image.addEventListener('click', changeElements, false);
    });

    //trigger the lightbox
    function popLightbox(currentIndex, currentObject) {
      //debugger;
      //move the window to the top everytime we click - quick bug fix
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      //trigger the lightbox overlay so that we can see it
      let lightbox = document.querySelector('.lightbox');
      let lightboxImg = lightbox.querySelector('img');
      let lightboxDesc = lightbox.querySelector('p');
      let lightBoxClose = document.querySelector('.close-lightbox');

      lightbox.style.display = 'block';
      lightboxImg.src = "images/" + currentObject.images[currentIndex];
      lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];

      lightBoxClose.addEventListener('click', closeLightbox, false);
    }

    function closeLightbox() {
      //reset everything, close lightbox
      //debugger;
      let lightbox = document.querySelector('.lightbox');
      let lightboxImg = lightbox.querySelector('img');
      let lightboxDesc = lightbox.querySelector('p');
      let lightBoxClose = document.querySelector('.close-lightbox');
      lightbox.style.display = 'none';
      document.body.style.overflow = "scroll";
      lightboxImg.src = "";
      lightboxDesc.innerHTML = "";
    }

    changeElements.call(document.querySelector('#spring'));
})();
