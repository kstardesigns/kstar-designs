var dialogTriggers = document.getElementsByClassName('bh-dialog-trigger'),
    dialogs = document.getElementsByClassName('bh-dialog'),
    root = document.getElementsByTagName('html')[0];;

var openDialog = function(dialogID, e) {
    var dialog = document.querySelector('#' + dialogID),
        openDialogs = document.querySelectorAll('.bh-dialog.open'),
        dialogCover;

    if (e) {
        e.preventDefault(); //if the trigger is a link
    }

    //create the background div that covers the rest of the content, append the dialog to it
    if (document.getElementsByClassName('bh-dialog-cover').length == 0) {
        dialogCover = document.createElement('div');
        dialogCover.classList.add('bh-dialog-cover');
        document.body.appendChild(dialogCover);
    } else {
        dialogCover = document.querySelector('.bh-dialog-cover');
        dialogCover.style.display = 'flex';
    }
    dialogCover.appendChild(dialog);
    dialogCover.scrollTop = 0;

    //close open dialogs
    for (var j = 0; j < openDialogs.length; j++) {
        openDialogs[j].classList.remove('open');
        openDialogs[j].setAttribute('aria-hidden', true);
    }

    //prevent page scrolling
    document.body.classList.add('bh-dialog-fixed-page');
    root.classList.add('bh-dialog-fixed-page');
    
    //open clicked dialog
    dialog.classList.add('open');
    dialog.setAttribute('aria-hidden', false);

    //check for data attributes
    if (dialog.hasAttribute('data-bh-dialog-top')) {
        var topAmt = dialog.getAttribute('data-bh-dialog-top');
        dialog.style.top = topAmt + 'px';
    }

    //closeDialog when clicking outside of it
    dialogCover.addEventListener('click', function(e) {
        if (dialogCover !== event.target) return;
        closeDialog(dialogID, e);
    }, false);
}

for (var i = 0; i < dialogTriggers.length; i++) {
    dialogTriggers[i].addEventListener('click', function(e) {
        openDialog(this.getAttribute('data-dialog-trigger'), e);
    });
}


var closeDialog = function(dialogID, e) {
    var dialog = document.querySelector('#' + dialogID);
    
    if (e) {
        e.preventDefault(); //if the trigger is a link
    }

    dialog.classList.remove('open');
    dialog.setAttribute('aria-hidden', true);
    dialog.parentNode.style.display = 'none';
    dialog.style.top = 'initial';
    document.body.classList.remove('bh-dialog-fixed-page');
    root.classList.remove('bh-dialog-fixed-page');
}
 
for (var i = 0; i < dialogs.length; i++) {
    dialogs[i].addEventListener('click', function(e) {
        if (!e.target.hasAttribute('bh-dialog-close')) return;
        closeDialog(this.id, e);
    });
}


var toTopButton = document.querySelector('.scroll-to-search');
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 100) {
        toTopButton.style.display = 'flex';
    } else {
        toTopButton.style.display = 'none';
    }
    
    prevScrollpos = currentScrollPos;
}
	