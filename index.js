function createAndAppend(elType, className, appendTo, text) {
      let newEl = document.createElement(elType);
      newEl.classList.add(className);
      if (text) {
        newEl.textContent = text;
      }
      appendTo.appendChild(newEl);
      return newEl;
    }

fetch("https://remoteok.io/api")
  .then(resp => resp.json())
  .then(data => {           
    data.shift();
    console.log(data)
  
    const mainDiv = document.createElement('div');
    document.body.insertAdjacentElement('beforeend', mainDiv);

    for(let i =0; i < data.length; i++) {
      const divRow= createAndAppend('div', 'row', mainDiv);

      const logosDiv = createAndAppend('div', 'logo-div', divRow);
      
      const logoLink = createAndAppend('a', 'logo-link', logosDiv);
      logoLink.href = data[i].url;
      
      function showImg() {
          if(data[i].company_logo == '') {
            const defaultLogoDiv = createAndAppend('div', 'logo-company', logoLink);

            const defaultLogo = createAndAppend('p', 'img-no-logo-text', defaultLogoDiv);
            
            const logoAbbrev = data[i].company.toUpperCase().split(' ');
            if(logoAbbrev.length > 1) {
              defaultLogo.textContent = logoAbbrev[0][0] + logoAbbrev[1][0];
            } else {
              defaultLogo.textContent = data[i].company.toUpperCase().split(' ')[0][0] ;
            }
          } else {
            const img = createAndAppend('img', 'logo-company', logoLink);
            img.src = data[i].company_logo;
          }
        }
      showImg();  

      const positionInfo = createAndAppend('div', 'row-position-info', divRow);
      
      const companyLink = createAndAppend('a', 'company-link', positionInfo);
      companyLink.href = data[i].url; 
      
      createAndAppend('h3', 'company-name', companyLink, data[i].company);
      
      createAndAppend('h2', 'position', companyLink, data[i].position);

      function showLocation() {
        if(data[i].location === '') {
          return null;
        } else {
          let location = createAndAppend('div', 'location', positionInfo, data[i].location); 
        }
      } 
      showLocation();
    

    const tagsContainer = createAndAppend('div', 'tags-container', divRow);

    for(let tag of data[i].tags) {
      createAndAppend('div', 'tag', tagsContainer, tag);
    }

    const buttonContainer = createAndAppend('a', 'button-container', divRow);
    buttonContainer.href = data[i].url;

    const buttonApply = createAndAppend('button', 'button-apply', buttonContainer, 'Apply');
  }
  })
