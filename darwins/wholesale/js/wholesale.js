$(document).ready(function(){

	// credit to danasbakery.com for product counter
	var count = 0;
	var limit = 1000;	

	// increase product count
	$('.product .qty .add').click(function(e) {
		// box is full
        if (count >= limit) {
          return;
        }

        // add 1
        var product = $(this).parents('.qty:first');

        var amount = product.find('.amt');
        var newamount = parseInt(amount.html()) + 1;
        amount.html(newamount);

        //jQuery('#bundle-option-' + $product.attr('data-option') + '-' + $product.attr('data-selection')).click();
        //jQuery('#bundle-option-' + $product.attr('data-option') + '-qty-input').val(optionQty).keyup();

        count++;
        updateSummary();
        
	});

	//decrease product count
	$('.product .qty .remove').click(function(e) {
		// count is already at 0
        if (count <= 0) {
          return;
        }

        // add 1
        var product = $(this).parents('.qty:first');

        var amount = product.find('.amt');
        var newamount = parseInt(amount.html()) - 1;

        // individual count is already at 0
        if (newamount < 0) {
          return;
        }

        amount.html(newamount);

        //jQuery('#bundle-option-' + $product.attr('data-option') + '-' + $product.attr('data-selection')).click();
        //jQuery('#bundle-option-' + $product.attr('data-option') + '-qty-input').val(optionQty).keyup();

        count--;
        updateSummary();

	});

	// update order
	var updateSummary = function() {
	      	var chosenSoda = '';
	      	var chosenMints = '';
	      	var chosenTaffy = '';
	      	var chosenGummies = '';
	      	var chosenHardCandy = '';
		  
	      	$('.picker .product.soda .qty').each(function(i, e) {
		        var $this = $(this);
		        var orderAmt = parseInt($this.find('.amt').html());

		        if (orderAmt > 0) {
		          chosenSoda += '<li>' + orderAmt + ' x ' + $this.find('.flavor').html() + ' Craft Soda</li>';
		        }

		        $('.currentorder .chosen.soda').html(chosenSoda);
	     	});

	     	$('.picker .product.mints .qty').each(function(i, e) {
		        var $this = $(this);
		        var orderAmt = parseInt($this.find('.amt').html());

		        if (orderAmt > 0) {
		          chosenMints += '<li>' + orderAmt + ' x ' + $this.find('.flavor').html() + ' Mints</li>';
		        }

		        $('.currentorder .chosen.mints').html(chosenMints);
	     	});

	     	$('.picker .product.taffy .qty').each(function(i, e) {
		        var $this = $(this);
		        var orderAmt = parseInt($this.find('.amt').html());

		        if (orderAmt > 0) {
		          chosenTaffy += '<li>' + orderAmt + ' x ' + $this.find('.flavor').html() + ' Taffy</li>';
		        }

		        $('.currentorder .chosen.taffy').html(chosenTaffy);
	     	});

	     	$('.picker .product.gummies .qty').each(function(i, e) {
		        var $this = $(this);
		        var orderAmt = parseInt($this.find('.amt').html());

		        if (orderAmt > 0) {
		          chosenGummies += '<li>' + orderAmt + ' x ' + $this.find('.flavor').html() + ' Gummies</li>';
		        }

		        $('.currentorder .chosen.gummies').html(chosenGummies);
	     	});

	     	$('.picker .product.hardcandy .qty').each(function(i, e) {
		        var $this = $(this);
		        var orderAmt = parseInt($this.find('.amt').html());

		        if (orderAmt > 0) {
		          chosenHardCandy += '<li>' + orderAmt + ' x ' + $this.find('.flavor').html() + ' Hard Candy</li>';
		        }

		        $('.currentorder .chosen.hardcandy').html(chosenHardCandy);
	     	});
	};

	
});


