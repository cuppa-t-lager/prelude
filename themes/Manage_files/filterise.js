var CP = CP || {}; CP.filter = CP.filter || {};

CP.filter.Filterise = function() {

	/*
		Serialise form data based on the rules passed in.
		Includes all fields by default.
	*/

	var self = this,
		formElements = "input, select, textarea", // Removed input[type!=hidden] as we now want hidden inputs to be part of the filter
		selector = "",
		notSelector = "",
		fields,
		name,
		applicationName, // application where the filter lives
		filterTypeId, // type of filter lives here
		filterId,
		forms; // the filter id if loaded from db

	self.init = function(
		form,
		applicationName,
		filterTypeId,
		filterValues,
		options
	){ // f can be one of: a reference to a form, a jQuery form object or a jQuery selector for a form - Multiple forms not yet supported

		if( selector === "" ){
			selector = formElements;
		}

		fields = $( selector, form );

		/* SHOULD BE CHANGED TO BE PASSED IN AS PARAMS */
		$( "#saved-filters" ).click( self.savedFilters );
		$( "#reset-filter" ).click( function( event ){
			event.preventDefault();
			self.clearFilter();
			fields.parent().find( "[type='hidden']" ).trigger( "change" );
			self.filterChange( 0 );
		});

		self.applicationName = applicationName;
		self.filterTypeId    = filterTypeId;
		self.filterId        = filterValues.id;
		self.name            = filterValues.name;

		for( var field in filterValues.data ){
			self.setFilterValue( field, filterValues.data[ field ] );
		}

		forms = $( fields ).closest( "form" );

		forms.submit( function( e ){
			e.preventDefault();
			self.filterChange( 0 );
		});

		$( form ).change( function() {
			self.filterChange( 250 );
		});

		$( form ).find( 'input[type=text]' ).keyup( function(){
			self.filterChange( 500 );
		});

		//var searchInputTimer;
		//var searchInputInterval = 5000;
		//var $searchInput        = $( '#filterSearchTerm' );

		//$searchInput.on( 'keyup', function(){
		//	clearTimeout( searchInputTimer );
		//	searchInputTimer = setTimeout( self.filterChange( 0 ), searchInputInterval );
		//} );

		//$searchInput.on( 'keydown', function(){
		//	clearTimeout( searchInputTimer );
		//} );

	};

	self.getFields = function() {
		return fields;
	};

	self.getData = function() {
		// don't include the empty fields when serialising the form
		return fields.not( '[value=""]' ).serialize();
	};

	self.setName = function( n ){
		self.name = n;
	};

	self.setId = function( i ){
		self.filterId = i;
	};

	self.setFilterValue = function( key, value ){
		var field = fields.parent().children('[name=' + key + ']');
		if( field.is( 'select' ) ){
			field.val( value.toString().split( ',' ) );
			if( field.next( '.ui-multiselect' ).length){
				field.multiselect( "refresh" );
			}
		} else if( field.is( 'input[type=checkbox]' ) ){
			field.prev( ".checkbox" )
				.addClass( "checkbox-active brand-primary-bg brand-primary" );
			field.prop( 'checked', true );
		} else if( field.is( 'input[type=text]' ) ){
			field.val( String( value ). replace(/\+/g, " " ) ); // value is converted to a string as IE9 was seeing it as a number
		} else if( field.is( 'input[type=radio]' ) ){
			// remove all checked flags and apply the checked flag to the correct valued one
			field.prop( "checked", false ).removeClass( "checked" );
			field.parent()
				.find( "input[value=" + value + "]" )
				.prop( "checked", true )
				.addClass( "checked" )
				.next( "span" )
				.addClass( "brand-primary-bg brand-primary" );
		} else if( field.hasClass( 'dialog-value' ) ){
			field.val(value).trigger( 'change' );
		}
	};

	self.getFilterValue = function( fieldSelector ){
		var field = fields.parent().children( fieldSelector );
		if( field.is( 'input[type=checkbox]' ) ){
			return field.is( ':checked' );
		} else {
			return field.val();
		}
	};

	self.save = function(){
		// does ajax post to insert/update filter in db
		var filterString = self.getData();

		$.ajax({
			url : "/core/root/ajax.cfc?method=goJSON&logicalcomponent=filter.filter&logicalmethod=saveFilter",
			dataType:"json",
			type: "POST",
			data : {
				filter_id: self.filterId,
				filter_name: self.name,
				application_name: self.applicationName,
				filter_type_id: self.filterTypeId,
				filter: filterString
			},
			success: function(response) {
				self.filterId = response;
			}
		});
	};

	self.applyFilter = function() {
		// get filter by ajax
		$.ajax( {
			url     : "/core/root/ajax.cfc?method=goJSON&logicalcomponent=filter.filter&logicalmethod=getFilter",
			dataType:"json",
			type    : "POST",
			data    : { filter_id: self.filterId },
			success: function( filterData ){
				self.clearFilter();
				self.filterId = filterData.id;
				self.name     = filterData.name;
				for( var field in filterData.filter ){
					self.setFilterValue( field, filterData.filter[ field ] );
				}
				self.filterChange( 0 );
			}
		} );
	};

	self.clearFilter = function() {
		self.filterId = null;
		self.name     = null;
		forms.each( function(){
			this.reset();
		} );
		fields.parent().find( "[type='hidden']" ).val( "" );
		fields.parent().find( "[type=checkbox]" ).prev( ".checkbox" ).removeClass( "checkbox-active brand-primary-bg brand-primary" );
		fields.parent().find( "[type=radio]" ).removeClass( "checked" ).next( "span" ).removeClass( "brand-primary-bg brand-primary" );
		fields.parent().find( "[type=radio]:checked" ).addClass( "checked" );
	};

	self.filterChange = function( wait ) {
		clearTimeout( self.timeoutId );
		self.timeoutId = setTimeout( function(){
			var filterString = self.getData();
			/* call filter cfc to save the filer data to the session */
			$.ajax( {
				url     : "/core/root/ajax.cfc?method=go&logicalcomponent=filter.filter&logicalmethod=saveToSession",
				dataType:"json",
				type    : "POST",
				data    : {
					application_name: self.applicationName,
					filter_type_id  : self.filterTypeId,
					filter          : filterString,
					filter_id       : self.filterId,
					filter_name     : self.name
				},
				complete: function(){
					$.event.trigger( "filterChange", filterString );
				}
			} );
		}, wait );

	};

};