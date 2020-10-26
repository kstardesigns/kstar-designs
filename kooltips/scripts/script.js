const kooltip = {},
      toolTipTriggers = document.querySelectorAll('[data-kooltip]');

//step 1 - on mouseenter/touchstart/focus - get tooltip copy from trigger data attribute, append it to bottom of the page
//step 2 - get trigger x, y, w, h to prep for positioning
kooltip.createTooltip = function() {
	//remove a tip that's currently shown (ie. if user is focused on one tip, then hovers over another trigger)
	kooltip.removeTooltip();
	
	let tipContent = this.dataset.kooltip,
			tipTriggerW = this.getBoundingClientRect().width,
			tipTriggerH = this.getBoundingClientRect().height,
			tipTriggerX = this.getBoundingClientRect().left + window.scrollX,
			tipTriggerY = this.getBoundingClientRect().top + window.scrollY,
			tipId = this.getAttribute('aria-describedby'),
			tip = document.createElement('span');
	
	tip.classList.add('kooltip');
	tip.setAttribute('id', tipId);
	tip.setAttribute('aria-hidden', false);
	
	document.body.appendChild(tip);
	document.querySelector('.kooltip').textContent = tipContent;
	kooltip.triggerWidth = tipTriggerW;
	kooltip.triggerHeight = tipTriggerH;
	kooltip.triggerX = tipTriggerX;
	kooltip.triggerY = tipTriggerY;
	kooltip.positionTooltip(tip);
}

//step 3 - position tooltip centered above the trigger, check for instances where the tooltip flows off the page
kooltip.positionTooltip = function(tip) {
	
	tip.style.left = (kooltip.triggerX + //position tip at left side of trigger
									 (kooltip.triggerWidth / 2)) //center it at middle of trigger
									 + 'px';
	
	let tipW = tip.getBoundingClientRect().width,
			tipH = tip.getBoundingClientRect().height;
	
	kooltip.tipWidth = tipW;
	kooltip.tipHeight = tipH;
	
	tip.style.top = (kooltip.triggerY - kooltip.tipHeight - 5) + 'px';

	let tipX = tip.getBoundingClientRect().left + window.scrollX,
			tipY = tip.getBoundingClientRect().top + window.scrollY;
	
	tip.style.left = tipX - (kooltip.tipWidth / 2) + 'px'; //shift tip to left so the tip arrow is centered over center of trigger
	
	tip.style.top = (kooltip.triggerY - kooltip.tipHeight - 5) + 'px';
	kooltip.tipHeight = tipH;
	
	kooltip.tipX = tipX - (kooltip.tipWidth / 2);
	kooltip.tipY = tipY;
	
	//checks if tooltip is within 5px of edge of viewport, if so, runs repositionTooltip function
	if (kooltip.tipX < 5 || (kooltip.tipX + kooltip.tipWidth) > (window.innerWidth - 5) 
			|| kooltip.tipY < 5 || (kooltip.tipY + kooltip.tipHeight) > (window.innerHeight - 5)) 
	{
		kooltip.repositionTooltip(tip);
	}
}

//step 4 - reposition tooltip if it flows off the page
kooltip.repositionTooltip = function(tip) {
	
	//helper function to make a tip that is flowing off the page multiple lines so it fits on the page
	kooltip.makeMultiline = function(tip) {
		tip.classList.add('multiline');
		kooltip.tipHeight = tip.getBoundingClientRect().height;
		kooltip.tipWidth = tip.getBoundingClientRect().width;
		
		//now that text is multiline, adjust its width to better fit its text
		const textNode = tip.firstChild,
					range = document.createRange();
		range.selectNodeContents(textNode);
		
		const rects = range.getClientRects();
		if (rects.length > 0) {
				let sidePadding = window.getComputedStyle(tip,null).getPropertyValue('padding-left').match(/\d+/);
				tip.style.width = rects[0].width + (sidePadding * 2) + 'px';
				kooltip.tipWidth = tip.getBoundingClientRect().width;
		}
	}
	
	//overflows on left
	if (kooltip.tipX < 5) {
		kooltip.tipX = parseInt(5);
		tip.style.left = '5px';
		tip.classList.add('kooltip--left-aligned');
		let centerOfTrigger = (parseInt(kooltip.triggerX) - 5) + (parseInt(kooltip.triggerWidth / 2)) - 8; //8 is the width of the triangle itself
		tip.style.setProperty('--left-arrow', centerOfTrigger + 'px');
	}
	
	//overflows on right
	if ((kooltip.tipX + kooltip.tipWidth) > (window.innerWidth - 5)) {
		
		if (tip.classList.contains('kooltip--left-aligned')) {
			kooltip.makeMultiline(tip);
		} else {
			kooltip.tipX = window.innerWidth - kooltip.tipWidth + 5; 
			tip.style.left = `calc(100% - ${kooltip.tipWidth + 5}px`;
			tip.classList.add('kooltip--right-aligned');
			let centerOfTrigger = (parseInt(kooltip.triggerX) - parseInt(kooltip.tipX)) + (parseInt(kooltip.triggerWidth / 2));
			tip.style.setProperty('--right-arrow', centerOfTrigger + 'px');
			
			//overflows on left
			if (kooltip.tipX < 5) {
				kooltip.makeMultiline(tip);
				tip.style.left = '5px';
				
				centerOfTrigger = (parseInt(kooltip.triggerX) + 8);
				tip.style.setProperty('--right-arrow', centerOfTrigger + 'px');
				kooltip.tipHeight = tip.getBoundingClientRect().height;
			}
		}
	}
		
	//helper function to check if the tip is flowing off the top of the page
	kooltip.checkTopOverflow = function() {
		kooltip.tipY = kooltip.triggerY + kooltip.triggerHeight + 8;
		tip.style.top = kooltip.triggerY + kooltip.triggerHeight + 8 + 'px';
		tip.classList.add('kooltip--top-aligned');
	}
	
	//overflow on top
	if (kooltip.tipY < 5) {
		kooltip.checkTopOverflow();
	}
	
	//if it's now a multiline tip and not top aligned, it will need to be shifted up according to its new multiline height
	if (tip.classList.contains('multiline') && !tip.classList.contains('kooltip--top-aligned')) {
		kooltip.tipY = kooltip.tipY - kooltip.tipHeight + 21;
		tip.style.top = kooltip.tipY + 'px';
		
		if (kooltip.tipY < 5) {
			kooltip.checkTopOverflow();
		}
	}
}

//step 4 - on mouseleave/touchleave/blur - remove tooltip from page completely, reset object data
kooltip.removeTooltip = function() {
	const tip = document.querySelector('.kooltip');
	if (tip) {
		document.body.removeChild(tip);
	}
	kooltip.triggerWidth = '';
	kooltip.triggerHeight = '';
	kooltip.triggerX = '';
	kooltip.triggerY = '';
	kooltip.tipWidth = '';
	kooltip.tipHeight = '';
	kooltip.tipX = '';
	kooltip.tipY = '';
}

//event listeners
toolTipTriggers.forEach((toolTipTrigger, i) => {
	toolTipTrigger.setAttribute('aria-describedby', `kooltip-${i}`);
	toolTipTrigger.setAttribute('tabindex', '0');
	toolTipTrigger.addEventListener('mouseenter', kooltip.createTooltip, false);
	toolTipTrigger.addEventListener('focus', kooltip.createTooltip, false);
	toolTipTrigger.addEventListener('mouseleave', kooltip.removeTooltip, false);
	toolTipTrigger.addEventListener('blur', kooltip.removeTooltip, false);
});