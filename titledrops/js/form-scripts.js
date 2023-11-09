//selector declarations
const title = document.querySelector('#title'),
    stringname = document.querySelector('#stringname'),
    type = document.querySelector('#type'),
    doesit = document.querySelector('#doesit'),
    eyebrow = document.querySelector('#eyebrow'),
    droptime = document.querySelector('#droptime'),
    tags = document.querySelector('#tags'),
    header = document.querySelector('header'),
    quoteQuestion = document.querySelector('#quote-question'),
    citeQuestion = document.querySelector('#cite-question'),
    bylineQuestion = document.querySelector('#byline-question'),
    eyebrowQuestion = document.querySelector('#eyebrow-question'),
    imagePreviewArea = document.querySelector('#image-preview-area'),
    imagePreviewMessage = document.querySelector('#image-preview-message'),
    typeTag = document.querySelector('#type-tag'),
    doesitTag = document.querySelector('#doesit-tag'),
    addlTags = document.querySelector('#additional-tags'),
    formFields = document.querySelectorAll('.form-field:not(.form-field--stringname)'),
    inputFields = document.querySelectorAll('input[type="text"], textarea'),
    selectFields = document.querySelectorAll('select');


//generate date for hidden form field to send to db
const getSetDate = () => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November', 'December'];
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dateInput = document.querySelector('#date');
    dateInput.value = months[month] + ' ' + day + ', ' + year;
}
getSetDate();


//generate stringname based on title, show if there is an existing image with that name, also add the title as a tag
const updateStringname = () => {
    const titleValue = title.value;
    const stringnameValue = titleValue.toLowerCase();
    stringname.value = stringnameValue.replace(/[^a-z0-9]/g, '');
    tags.value = titleValue + ', ';
    updatePreviewImage();
}

title.addEventListener('keyup', updateStringname);


//update preview image based on string name, tell whether image was found or not
const updatePreviewImage = () => {
    const imagePreview =  document.createElement('img');
    const stringnameValue = stringname.value.toLowerCase();
    const stringnameFormatted = stringnameValue.replace(/\s+/g, '');
    const imagePreviewChildren = document.querySelectorAll('#image-preview-area img');

    imagePreviewChildren.forEach(function(imagePreviewChild) {
        imagePreviewChild.parentNode.removeChild(imagePreviewChild);
    });
    
    imagePreview.src = '../images/' + stringnameFormatted + '.jpg';
    imagePreviewArea.appendChild(imagePreview);

    imagePreview.onload = () => {
        imagePreviewMessage.innerText = 'Image found!';
        imagePreviewMessage.classList.remove('bad');
        imagePreviewMessage.classList.add('good');
        imagePreview.style.display = 'block';
        imagePreview.classList.add('shown');
        stringname.nextSibling.src = '../assets/check.svg';
    }

    imagePreview.onerror = () => {
        imagePreview.style.display = 'none';
        imagePreview.parentNode.removeChild(imagePreview);
        stringname.nextSibling.src = '../assets/times.svg';
        console.clear();

        if (imagePreviewMessage.innerText == 'Image found!') {
            imagePreviewMessage.classList.remove('good');
            imagePreviewMessage.classList.add('bad');
            imagePreviewMessage.innerText = 'Image with this string name doesn\'t exist';
        }
    }
}

stringname.addEventListener('keyup', updatePreviewImage);


//update eyebrow based on media type and 'does it drop?' question
const updateEyebrow = () => {
    const typeValue = type.value;
    const doesitValue = doesit.value;

    if (doesitValue == 'almost') {
        eyebrow.value = 'Almost title drops at:';
    } else if (doesitValue == 'nope') {
        eyebrow.value = '';
    }

    if (typeValue == 'movie') {
        eyebrow.value = '';
        eyebrowQuestion.style.display = 'none';
    } else {
        eyebrowQuestion.style.display = 'block';
    }

    if (doesitValue != 'almost' && doesitValue != 'nope' && typeValue != 'movie') {
        eyebrow.value = 'First title drop:';
    }
}

type.addEventListener('change', updateEyebrow);
doesit.addEventListener('change', updateEyebrow);


//update drop time field based on media type and 'does it drop?' question
const updateDroptime = () => {
    const typeValue = type.value;
    const doesitValue = doesit.value;

    switch(typeValue) {
    case 'movie':
        droptime.value = 'First title drop at XX\'XX\"';
        break;
    case 'music':
        droptime.value = 'Song XX: \"XXXXX\" at XX\'XX\"';
        break;
    case 'tv show':
        droptime.value = 'Season XX, episode XX: \"XXXXX\" at XX\'XX\"';
        break;
    default:
        droptime.value = '';
    }

    if (doesitValue == 'nope') {
        switch(typeValue) {
        case 'movie':
            droptime.value = 'No title drops happen in this movie';
            break;
        case 'music':
            droptime.value = 'No title drops happen in any of the songs';
            break;
        case 'tv show':
            droptime.value = 'No title drops happen in this show';
            break;
        default:
            droptime.value = '';
        }
    }

    if (doesitValue == 'almost' && typeValue == 'movie') {
        droptime.value = 'Almost title drops at XX\'XX\"';
    }

}

type.addEventListener('change', updateDroptime);
doesit.addEventListener('change', updateDroptime);
document.addEventListener('DOMContentLoaded', updateDroptime);


//hide quote and cite if 'does it drop?' is 'nope'
const hideQuoteCite = () => {
    const doesitValue = doesit.value;

    if (doesitValue == 'nope') {
        quoteQuestion.style.display = 'none';
        citeQuestion.style.display = 'none';
    } else {
        quoteQuestion.style.display = 'block';
        citeQuestion.style.display = 'block';
    }
}
doesit.addEventListener('change', hideQuoteCite);


//hide byline if 'type' is not 'music'
//commented out because tv show/movie can use this field for year
// const hideByline = () => {
//     const typeValue = type.value;

//     if (typeValue != 'music') {
//         bylineQuestion.style.display = 'none';
//     } else {
//         bylineQuestion.style.display = 'block';
//     }
// }
// type.addEventListener('change', hideByline);
// document.addEventListener('DOMContentLoaded', hideByline);


//when 'does it drop?', type, and tags fields are updated, populate tag list below form
const populateTags = () => {
    addlTags.innerHTML = '';

    const typeValue = type.value;
    const doesitValue = doesit.value;
    const tagsValue  = tags.value;
    const tagsArray = tagsValue.split(',');

    typeTag.innerText = typeValue.replace(/\W+/g, '-');
    typeTag.className = '';
    typeTag.classList.add('entry-tag', typeValue.replace(/\W+/g, '-'));
    doesitTag.className = '';
    doesitTag.innerText = doesitValue;
    doesitTag.classList.add('entry-tag', doesitValue.replace(/\W+/g, '-'));
    
    tagsArray.forEach(function(tag) {
        const newTag = document.createElement('span');
        newTag.classList.add('entry-tag');
        newTag.innerText = tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^-\w]+/g, '');
        if (newTag.innerText != '') {
            addlTags.appendChild(newTag);
        }
    });


}

type.addEventListener('change', populateTags);
doesit.addEventListener('change', populateTags);
tags.addEventListener('keyup', populateTags);
document.addEventListener('DOMContentLoaded', populateTags);


//change x to a checkmark when each field is populated
const checkWhenDone = () => {
    const doesitValue = doesit.value;

    formFields.forEach(function(formField) {
        if (formField.value != '' && formField.value != null && formField.value.indexOf('XX') < 0) {
            formField.nextSibling.src = '../assets/check.svg';
        } else {
            formField.nextSibling.src = '../assets/times.svg';

            if (formField.classList.contains('form-field--eyebrow') && doesitValue == 'nope') {
                formField.nextSibling.src = '../assets/check.svg';
            }

        } 
    });
}

inputFields.forEach(function(inputField) {
    inputField.addEventListener('keyup', checkWhenDone);
});
selectFields.forEach(function(selectField) {
    selectField.addEventListener('change', checkWhenDone);
});
document.addEventListener('DOMContentLoaded', checkWhenDone);

//get a random image from the existing db to show in the header
const randomImage = titleList[Math.floor(Math.random() * titleList.length)];
header.style.background = '#fff url(../images/' + randomImage + '.jpg) top center / cover no-repeat';

