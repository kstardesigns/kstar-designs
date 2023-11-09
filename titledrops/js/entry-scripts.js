const entries = document.querySelectorAll('.entry'),
      yeps = document.querySelectorAll('.entry.yep'),
      tagsTrigger = document.querySelector('.nav-icon-tags-button'),
      mobileSearchTrigger = document.querySelector('.nav-icon-search-mobile-button'),
      searchTrigger = document.querySelector('.nav-icon-search-button'),
      searchBar = document.querySelector('.search-bar'),
      searchBarMobile = document.querySelector('.search-bar-mobile'),
      searchSubmitButton = document.querySelector('.nav-icon-submit-button'),
      searchSubmitButtonMobile = document.querySelector('.nav-icon-submit-mobile-button'),
      searchForm = document.querySelector('#search-form'),
      searchFormMobile = document.querySelector('#search-form-mobile'),
      headerTags = document.querySelector('.header-tags'),
      headerTagsListMain = document.querySelector('.header-tags-list-main'),
      headerTagsListPopular = document.querySelector('.header-tags-list-popular'),
      headerTagsListYear = document.querySelector('.header-tags-list-year'),
      infoTrigger = document.querySelector('.info-trigger'),
      information = document.querySelector('.information'),
      informationLink = document.querySelector('.info-link'),
      contactToggle = document.querySelector('.footer-write-button'),
      contact = document.querySelector('.contact'),
      contactLinks = document.querySelectorAll('.contact a');


const popularAmount = 2; //change this to only show tags with at least this many occurences, for header feature
let tagCount = {};
let mainTagCount = {};
let doesitTagCount = {};
let yearTagCount = {};

const colorizeTags = (tags) => {
    tags.forEach(function(tag) {
        const chars = '3456789abc';
        const stringLength = 4;
        let color = 'eb';

        for (i = 0; i < stringLength; i++) { 
            const rNum = Math.floor(Math.random() * chars.length);
            color += chars.substring(rNum, rNum+1);
        }

        tag.style.backgroundImage = `radial-gradient(circle at 10px center, transparent 0px, transparent 4px, #${color} 4px, #${color} 100%)`;
    });  
}

//turn the comma separated tag list into styled links
const makeTagLinks = (stringname) => {
    const tags = document.querySelector('#' + stringname + ' .entry-tags');
    const tagsArray = tags.innerText.split(',');
    tags.innerText = '';
    

    tagsArray.forEach(function(tag) {
        const newTag = document.createElement('a');
        const tagFormatted = tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^-\w]+/g, '');
        const tagFormattedNoDashes = tagFormatted.replace(/\-+/g, ' ');
        newTag.classList.add('entry-tag', 'entry-tag-link');
        newTag.innerText = tagFormattedNoDashes;
        newTag.href = 'http://kylephx.com/titledrops/?tags=' + tagFormatted;

        if (newTag.innerText != '') {
            //add the tag to its own card back
            tags.appendChild(newTag);
        }
    });
    
}

const makeHeaderTagLinks = () => {
    let mainTags = [],
        allTheMainTags = [],
        doesitTags = [],
        allTheDoesitTags = [],
        popularTags = [],
        allTheTags = [],
        yearTags = [],
        allTheYearTags = [];

//1. Make the "type" tags - tv show, movie, music
    //add each type tag to main tags array
    typeRowList.forEach(function(typeRow) {
        allTheMainTags.push(typeRow);
    });

    //format each main tag and add it to the tag object
    allTheMainTags.forEach(function(tag){
        const tagFormatted = tag.trim().toLowerCase().replace(/\s+/g, '-');
        //increment tag count or start it at 1 if it doesn't exist
        //(tracking tag totals for featured header links)
        mainTagCount[tagFormatted] = (mainTagCount[tagFormatted]+1) || 1 ;
    });

    //object of main tags
    for (const [key, value] of Object.entries(mainTagCount)) {
        mainTags.push([key, value]);
    }

    //sort them highest to lowest
    mainTags.sort(function(a, b) {
        return b[1] - a[1];
    });

    //create their tags and put them in the header
    mainTags.forEach(function(mainTag) {
        const tagName = mainTag[0];
        const tagNameNoDashes = mainTag[0].replace(/\-+/g, ' ');
        const tagAmount = mainTag[1];
        const newHeaderTag = document.createElement('a');
        newHeaderTag.classList.add('entry-tag', 'entry-tag-link', 'main-tag', tagName);
        newHeaderTag.innerText = `${tagNameNoDashes} (${tagAmount})`;
        newHeaderTag.href = `http://kylephx.com/titledrops/?tags=${tagName}`;
        newHeaderTag.setAttribute('tabindex', '-1');
        headerTagsListMain.appendChild(newHeaderTag);
    });

//2. Make the "doesit" tags - yep, nope, almost
    //add each type tag to main tags array
    doesitRowList.forEach(function(doesitRow) {
        allTheDoesitTags.push(doesitRow);
    });

    //format each main tag and add it to the tag object
    allTheDoesitTags.forEach(function(doesitTag){
        const tagFormatted = doesitTag.trim().toLowerCase().replace(/\s+/g, '-');
        //increment tag count or start it at 1 if it doesn't exist
        //(tracking tag totals for featured header links)
        doesitTagCount[tagFormatted] = (doesitTagCount[tagFormatted]+1) || 1 ;
    });

    //object of doesit tags
    for (const [key, value] of Object.entries(doesitTagCount)) {
        doesitTags.push([key, value]);
    }

    //sort them highest to lowest
    doesitTags.sort(function(a, b) {
        return b[1] - a[1];
    });

    //create their tags and put them in the header
    doesitTags.forEach(function(doesitTag) {
        const tagName = doesitTag[0];
        const tagNameNoDashes = doesitTag[0].replace(/\-+/g, ' ');
        const tagAmount = doesitTag[1];
        const newHeaderTag = document.createElement('a');
        newHeaderTag.classList.add('entry-tag', 'entry-tag-link', 'main-tag', tagName);
        newHeaderTag.innerText = `${tagNameNoDashes} (${tagAmount})`;
        newHeaderTag.href = `http://kylephx.com/titledrops/?tags=${tagName}`;
        newHeaderTag.setAttribute('tabindex', '-1');
        headerTagsListMain.appendChild(newHeaderTag);
    });

//3. Make the "popular" tags - all the popular actor, musician tags
    //for each item in the tagColumnList array, split them at comma, add them to allTheTags
    tagRowList.forEach(function(tagRow) {
        //add a comma at the end so last tag isnt connected to first tag of next column
        tagRow += ','; 
        let thisRowTags = tagRow.split(',');

        thisRowTags.forEach(function(thisRowTag) {
            if (thisRowTag !== '') {
                allTheTags.push(thisRowTag);
            }
        });
    });
    
    //format each tag and add it to the tag object
    allTheTags.forEach(function(tag){
        const tagFormatted = tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^-\w]+/g, '');
        //increment tag count or start it at 1 if it doesn't exist
        //(tracking tag totals for featured header links)
        tagCount[tagFormatted] = (tagCount[tagFormatted]+1) || 1 ;
    });

    //check if tag should be featured in header (if it's more than popular amount), add it to popularTags object
    for (const [key, value] of Object.entries(tagCount)) {
        if (value >= popularAmount) {
            popularTags.push([key, value]);
        }
    }
    
    //sort them highest to lowest
    popularTags.sort(function(a, b) {
        return b[1] - a[1];
    });

    //create their tags and put them in the header
    popularTags.forEach(function(popularTag) {
        const tagName = popularTag[0];
        const tagNameNoDashes = popularTag[0].replace(/\-+/g, ' ');
        const tagAmount = popularTag[1];
        const newHeaderTag = document.createElement('a');
        newHeaderTag.classList.add('entry-tag', 'entry-tag-link');
        newHeaderTag.innerText = `${tagNameNoDashes} (${tagAmount})`;
        newHeaderTag.href = `http://kylephx.com/titledrops/?tags=${tagName}`;
        newHeaderTag.setAttribute('tabindex', '-1');
        headerTagsListPopular.appendChild(newHeaderTag);
    });

//4. Make the "year" tags - all the years tags
    //for each item in the tagColumnList array, split them at comma, add them to allTheTags
    yearRowList.forEach(function(yearRow) {
        //add a comma at the end so last tag isnt connected to first tag of next column
        yearRow += ','; 
        let thisYearRowTags = yearRow.split(',');

        thisYearRowTags.forEach(function(thisYearRowTag) {
            if (thisYearRowTag !== '') {
                allTheYearTags.push(thisYearRowTag);
            }
        });
    });

    //format each tag and add it to the tag object
    allTheYearTags.forEach(function(tag){
        const tagFormatted = tag.trim();
        //increment tag count or start it at 1 if it doesn't exist
        //(tracking tag totals for featured header links)
        yearTagCount[tagFormatted] = (yearTagCount[tagFormatted]+1) || 1 ;
    });

    //object of year tags
    for (const [key, value] of Object.entries(yearTagCount)) {
        yearTags.push([key, value]);
    }

    //sort them descending by year
    yearTags.sort(function(a, b) {
        return b[0] - a[0];
    });

    //create their tags and put them in the header
    yearTags.forEach(function(yearTag) {
        const tagName = yearTag[0];
        const tagNameNoDashes = yearTag[0].replace(/\-+/g, ' ');
        const tagAmount = yearTag[1];
        const newHeaderTag = document.createElement('a');
        newHeaderTag.classList.add('entry-tag', 'entry-tag-link');
        newHeaderTag.innerText = `${tagNameNoDashes} (${tagAmount})`;
        newHeaderTag.href = `http://kylephx.com/titledrops/?tags=${tagName}`;
        newHeaderTag.setAttribute('tabindex', '-1');
        headerTagsListYear.appendChild(newHeaderTag);
    });

//5. Colorize the tags!
    const tagLinks = document.querySelectorAll('.header-tags-list .entry-tag-link:not(.main-tag)');
    colorizeTags(tagLinks);
}

document.addEventListener('DOMContentLoaded', makeHeaderTagLinks);

entries.forEach(function(entry) {
    makeTagLinks(entry.id);

    const imageContainer = entry.querySelector('.entry-image-container:not(.entry-back-toggler)'),
          sides = imageContainer.querySelectorAll('.entry-front, .entry-back'),
          back = imageContainer.querySelector('.entry-back'),
          toggler = imageContainer.querySelector('.entry-back-toggler'),
          togglerIcons = toggler.querySelectorAll('img'),
          quoteIcon = toggler.querySelector('.entry-quote-icon'),
          tagsIcon = toggler.querySelector('.entry-tags-icon'),
          twitterIcon = toggler.querySelector('.entry-twitter-share'),
          miniSides = imageContainer.querySelectorAll('.entry-title-quote, .entry-tags'),
          tags = back.querySelectorAll('.entry-tag-link');

    //set up clicking the entry to swap between "back" and "front"
    imageContainer.addEventListener('click', (event) => {
        imageContainer.blur();
        
        if (event.target == toggler || event.target == quoteIcon || event.target == tagsIcon || event.target == twitterIcon || event.target.classList.contains('entry-tag-link')) {
            return false;
        } else {
            sides.forEach(function(side) {
                if (side.style.display !== 'none') {
                    side.style.display = 'none';
                } else {
                    if (side.classList.contains('entry-back')) {
                        side.style.display = 'flex';
                    } else {
                        side.style.display = 'block';
                    }
                }
            });  
        }
    });

    imageContainer.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { //enter key
            event.preventDefault();
            this.click();
        }
    });

    //set up clicking the toggler icon (quote or tags) to swap between "quote" and "tags"
    toggler.addEventListener('click', () => {
        togglerIcons.forEach(function(togglerIcon) {
            if (togglerIcon.classList.contains('active')) {
                togglerIcon.classList.remove('active');
            } else {
                togglerIcon.classList.add('active');
            }
            toggler.blur();
        });  

        miniSides.forEach(function(miniSide) {
            if (miniSide.style.display !== 'none') {
                miniSide.style.display = 'none';
            } else {
                if (miniSide.classList.contains('entry-tags')) {
                    miniSide.style.display = 'block';
                } else {
                    miniSide.style.display = 'flex';
                }
            }
        });  
    });

    colorizeTags(tags);
});

//activate desktop search bar
searchTrigger.addEventListener('click', () => {
    searchBar.classList.toggle('active');
    searchSubmitButton.classList.toggle('active');

    if (searchBar.classList.contains('active')) {
        searchBar.setAttribute('tabindex', '0');
        searchSubmitButton.setAttribute('tabindex', '0');
    } else {
        searchBar.setAttribute('tabindex', '-1');
        searchSubmitButton.setAttribute('tabindex', '-1');
    }

    if (searchBar !== document.activeElement) {
        setTimeout(function() {
            searchBar.focus();
        }, 750);
    } else {
        searchBar.blur();
    }
});

//open tags dropdown
tagsTrigger.addEventListener('click', () => {
    if (information.classList.contains('open')) {
        information.classList.remove('open');
        informationLink.setAttribute('tabindex', '-1');
    }

    headerTags.classList.toggle('open');

    const headerTagLinks = headerTags.querySelectorAll('a');

    if (headerTags.classList.contains('open')) {
        headerTagLinks.forEach(function(headerTagLink) {
            headerTagLink.setAttribute('tabindex', '0');
        });
    } else {
        headerTagLinks.forEach(function(headerTagLink) {
            headerTagLink.setAttribute('tabindex', '-1');
        });
    }
});

//open info dropdown
infoTrigger.addEventListener('click', () => {
    if (headerTags.classList.contains('open')) {
        const headerTagLinks = headerTags.querySelectorAll('a');
        headerTags.classList.remove('open');
        headerTagLinks.forEach(function(headerTagLink) {
            headerTagLink.setAttribute('tabindex', '-1');
        });
    }
    information.classList.toggle('open');

    if (information.classList.contains('open')) {
        informationLink.setAttribute('tabindex', '0');
        informationLink.focus();
    } else {
        informationLink.setAttribute('tabindex', '-1');
    }
});

//open tags dropdown and focus search
mobileSearchTrigger.addEventListener('click', () => {
    if (information.classList.contains('open')) {
        information.classList.remove('open');
        informationLink.setAttribute('tabindex', '-1');
    }

    if (!headerTags.classList.contains('open')) {
        headerTags.classList.add('open');
    }
    searchBarMobile.focus();
});

//format search query and go to its search result
const formatAndSearch = () => {
    const searchString = searchBar.value;
    const formattedString = searchString.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^-\w]+/g, '');
    if (formattedString.length > 0) {
        window.location = `?tags=${formattedString}`;
    }
};

//format mobile search query and go to its search result
const formatAndSearchMobile = () => {
    const searchString = searchBarMobile.value;
    const formattedString = searchString.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^-\w]+/g, '');
    if (formattedString.length > 0) {
        window.location = `?tags=${formattedString}`;
    }
};

//open/close the contact info in footer
const toggleContact = () => {
    if (contact.classList.contains('open')) {
        contact.classList.remove('open');
        contact.classList.add('closing');
        contactLinks.forEach(function(contactLink) {
            contactLink.setAttribute('tabindex', '-1');
        });
    } else {
        contact.classList.add('open');
        contact.classList.remove('closing');
        contactLinks.forEach(function(contactLink, index) {
            contactLink.setAttribute('tabindex', '0');
            if (index === 0) {
                contactLink.focus();
            }
        });
    }
}
contactToggle.addEventListener('click', toggleContact);

searchSubmitButton.addEventListener('click', formatAndSearch);
searchForm.addEventListener('submit', formatAndSearch);
if (searchBar) {
    searchBar.addEventListener('keydown', (e) => {
        if(e.keyCode == 13){
        e.preventDefault();
        formatAndSearch();
        }
    });
}

searchSubmitButtonMobile.addEventListener('click', formatAndSearchMobile);
searchFormMobile.addEventListener('submit', formatAndSearchMobile);
searchBarMobile.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
      e.preventDefault();
      formatAndSearchMobile();
    }
});


//temp:
document.addEventListener('focus', (event) => {
    console.group();
    console.log('focus is moving');
    console.log(`text: ${event.target.innerText}`);
    console.log(`classes: ${event.target.classList}`);
    console.log(`id: ${event.target.id}`);
    console.groupEnd();
}, true);