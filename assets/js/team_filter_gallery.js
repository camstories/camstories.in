jQuery(document).ready(function($){
	//open/close lateral filter
	$('.gym_team_filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	$('.gym_team_filter .gym_team_close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.gym_team_filter-trigger'), $('.gym_team_filter'), $('.gym_team_tab-filter'), $('.gym_team_gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.gym_team_tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.gym_team_tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.gym_team_tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.gym_team_tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.gym_team_tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.gym_team_tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});
	
	//close filter dropdown inside lateral .gym_team_filter 
	$('.gym_team_filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.gym_team_filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.gym_team_main-content').offset(),
			scrollTop = $(window).scrollTop();
		( scrollTop >= offsetTop ) ? $('.gym_team_main-content').addClass('is-fixed') : $('.gym_team_main-content').removeClass('is-fixed');
	}

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		https://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	$('.gym_team_gallery ul').mixItUp({
	    controls: {
	    	enable: false
	    },
	    callbacks: {
	    	onMixStart: function(){
	    		$('.gym_team_fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		$('.gym_team_fail-message').fadeIn(200);
	    	}
	    }
	});

	//search filtering
	//credits https://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();

	$(".gym_team_filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	    	inputText = $(".gym_team_filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	    	if ((inputText.length) > 0) {            
	      		$('.mix').each(function() {
		        	var $this = $(this);
		        
		        	// add item to be filtered out if input text matches items inside the title   
		        	if($this.attr('class').toLowerCase().match(inputText)) {
		          		$matching = $matching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		$matching = $matching.not(this);
		        	}
	      		});
	      		$('.gym_team_gallery ul').mixItUp('filter', $matching);
	    	} else {
	      		// resets the filter to show all item if input is empty
	      		$('.gym_team_gallery ul').mixItUp('filter', 'all');
	    	}
	  	}, 200 );
	});
});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	$filters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    	self.$filters = $('.gallery-main-content');
    	self.$container = $('.gym_team_gallery ul');
    
	    self.$filters.find('.gym_team_filters').each(function(){
	      	var $this = $(this);
	      
		    self.groups.push({
		        $inputs: $this.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    
	    self.bindHandlers();
  	},
  
  	// The "bindHandlers" method will listen for whenever a button is clicked. 
  	bindHandlers: function(){
    	var self = this;

    	self.$filters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.$filters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  
  	parseFilters: function(){
	    var self = this;
	 
	    // loop through each filter group and grap the active filter from each one.
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.$inputs.each(function(){
	    		var $this = $(this);
	    		if($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
	    			if($this.is(':checked') ) {
	    				group.active.push($this.attr('data-filter'));
	    			}
	    		} else if($this.is('select')){
	    			group.active.push($this.val());
	    		} else if( $this.find('.selected').length > 0 ) {
	    			group.active.push($this.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},
  
  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; // Reset output string
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
    
	    // If the output string is empty, show all rather than none:    
	    !self.outputString.length && (self.outputString = 'all'); 
	
    	// Send the output string to MixItUp via the 'filter' method:    
		if(self.$container.mixItUp('isLoaded')){
	    	self.$container.mixItUp('filter', self.outputString);
		}
  	}
};