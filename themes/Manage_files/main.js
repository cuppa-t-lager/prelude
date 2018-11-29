var transitions = {
	'transition'      : 'transitionend',
	'OTransition'     : 'oTransitionEnd',
	'MozTransition'   : 'transitionend',
	'WebkitTransition': 'webkitTransitionEnd'
};

var animations = {
	'animation'      : 'animationend',
	'OAnimation'     : 'oAnimationEnd',
	'MozAnimation'   : 'animationend',
	'WebkitAnimation': 'webkitAnimationEnd'
};


function returnTransAnimations( collection ){
	var t;
	var el = document.createElement('fakeelement');
	for( var item in collection ){
		if( el.style[ item ] !== undefined ){
			return collection[ item ];
		}
	}
}

// Global variables to be used when listening for the CSS animation and transition end events
var animationEnd  = returnTransAnimations( animations );
var transitionEnd = returnTransAnimations( transitions );

// Logic to determine whether or not JM is in an iFrame or not (e.g. determine presence of new-window functionality)
function isInFrame() {
	try {
		return window.self !== window.top;
	} catch (err) {
		return true;
	}
};

var xhr = null;

// The Job Management application
var JM = new Backbone.Marionette.Application();

// Rather than deal with many objects all called similar names across collections, model and views, namespace them and name them as needed
JM.c = {};
JM.v = {};
JM.m = {};

// Taken from Gaspar's work on a base model and collection - I'm not sure how to use the require wrapped version so I've copied it here

JM.m.BaseModel = Backbone.Model.extend({
	fetch: function( parameters, options ){
		return Backbone.Model.prototype.fetch.call( this, _.extend( {
			data: parameters,
			processData: true,
			success: function( a ){
				//console.log('Data received succesfully! Data:');
				//console.log(JSON.stringify(a.toJSON()));
			},
			error: function( a, e ){
				//console.log('Ajax call unsuccesful!');
				//console.log("Status", e.status, e.statusText);
			}
		}, options ) );
	}
});


JM.c.BaseCollection = Backbone.Collection.extend( {
	fetch: function (parameters, options) {
		var self = this;
		return Backbone.Collection.prototype.fetch.call( this, _.extend( {
			data       : parameters,
			processData: true,
			success    : _.bind( self.successHandler, self ),
			error      : _.bind( self.errorHandler, self )
		}, options ) );
	},
	baseInit: function( models, options ){
		// Nothing for the time being
	},
	successHandler: function( a ){
		//console.log('>> ajax call. ');
		//console.log('Data received succesfully! Data: ', a.toJSON());
	},
	errorHandler: function( a, e ){
		//console.log('Ajax call unsuccesful!');
		//console.log("Status", e.status, e.statusText);
	},
	destroy: function () {
		this.sync( 'delete', this );
		this.reset();
	}
} );

////////////
// Filter //
////////////

/*
	The filter model is used whenever we wish to refresh the jobs collection.
	Search will modify the filter, as will paging.
*/

JM.m.Filter = Backbone.Model.extend( {
	urlRoot: '/core/root/rest/?resource=jobManagement.JobManagement&logicalMethod=FilterModel'
} );



////////////
// Search //
////////////

JM.v.Search = Backbone.Marionette.ItemView.extend( {
	el    : "#search",
	events: {
		"change input": "changed",
		//"keyup input": "changed",
		"change select": "changed",
		"click input[type='button'][value='Clear']": "clear",
		"submit": "submit"
	},
	initialize: function(){
		this.refreshCheckboxes();
	},
	changed: function( e ){
		e.preventDefault();
		var elem = e.target;
		var tag  = elem.tagName.toLowerCase();
		var name = $( elem ).attr( "name" );
		var type;
		var value;

		// SUPPORT-3196 searchTerm outside of the filter
		if($( elem ).attr( "name" ) == "searchTermInput") {
			name = "searchTerm";
		}

		// Extract the value depending on the type of form field
		if( tag === "select" && elem.multiple ){
			value = $( elem ).val() || []; // If none are selected from a multiple, change to an empty array over null
			JM.m.filter.set( { page: 1, skip: 0 } );
		} else if( tag === "select" ){
			value = $( elem ).val();
			JM.m.filter.set( { page: 1, skip: 0 } );
		} else if( tag === "input" ){

			if(name == "limit") {
				value = $( elem ).val();
		    } else {
				type = elem.type.toLowerCase();
				if( type === "checkbox" ){
					value = elem.checked;
				} else if( type === "text" ){
					if(e.keyCode == 13 || e.type == "focusout" || e.type == "change") {
						value = elem.value;
					}
				}
			}
		}
		this.model.set( name, value );
	},
	submit: function( e ){
		e.preventDefault();
		if( JM.m.filter.get( "page" ) === 1 && JM.m.filter.get( "skip" ) === 0 ){
			JM.m.filter.trigger( "updatePagination" );
		} else {
			JM.m.filter.set( { page: 1, skip: 0 } );
		}
		JM.c.jobs.refresh();
	},
	clear: function( e ){
		e.preventDefault();
		// Change dropdowns to top option
		var dropdowns = this.$el.find( "select" ).not( "[multiple='multiple']" ).not( "[name='limit']" );
		dropdowns.each( function( i, dd ){
			var $dd = $( dd );
			$dd.find( "option:first" ).prop( "selected", true );
			$dd.change();
		});

		// Unselect all options
		var multiDropdownOptions = this.$el.find( "select[multiple='multiple']" ).find( "option" );
		multiDropdownOptions.each( function( i, o ){
			var $o = $( o );
			$o.prop( "selected", false );
			$o.parent().multiselect( "refresh" ).change();
		});

		// Untick checkboxes
		var checkboxes = this.$el.find( "input[type='checkbox']" );
		checkboxes.each( function( i, cb ){
			var $cb = $( cb );
			$cb.prop( "checked", false );
			$cb.change();
		});

		// Clear text inputs
		var textInputs = this.$el.find( "input[type='text']" );
		textInputs.each( function( i, ti ){
			var $ti = $( ti );
			$ti.val( "" );
			$ti.change();
		});
		this.refreshCheckboxes();
	},
	refreshCheckboxes: function() {
		var checkboxes = this.$el.find( "input[type='checkbox'].checkbox" );
		checkboxes.each( function( i, cb ){
			refreshCheckbox( $( cb ) );
		});
	}
} );



///////////////
// Dashboard //
///////////////

JM.addRegions({
	dashboard: "#dashboard"
});

JM.v.DashboardRow = Backbone.Marionette.ItemView.extend({
	tagName: "tr",
	className: function() {
		if(this.model.get( "selected" ) ){
			return "selected"
		}
	},
	template: "#dashboard-row-tpl",
	events: {
		"change input[name='selected']" : "updateSelected",
		"click .delete" : "deleteJob",
		"click .jobLink" : "jobLink"
	},
	initialize: function() {
		if( this.model.get( "id" ) === CP.manage.jobID && ( CP.mode === "highlight" || CP.mode === "copied" ) ){
			this.$el.addClass( "highlight" );
		}
	},
	deleteJob: function( e ){
		e.preventDefault();
		this.model.del();
	},
	updateSelected: function(){
		var cb = this.$el.find("input[name='selected']");
		refreshCheckbox( cb );
		if( cb.prop( "checked" ) ){
			this.$el.addClass( "selected" );
		} else {
			this.$el.removeClass( "selected" );
		}
		this.model.set( "selected", cb.prop( "checked" ) );
		this.model.trigger( "checkbox" );
	},
	jobLink: function(){
		window.location = CP.manage.baseURL + '&dsp=form&mode=edit&jobID=' + this.model.get( "id" );
	}
});

JM.v.DashboardTable = Backbone.Marionette.CompositeView.extend({
	tagName          : "table",
	template         : "#dashboard-table-tpl",
	itemView         : JM.v.DashboardRow,
	itemViewContainer: "tbody",
	elLoader         : null,
	events           : {
		"change thead input[name='selectAll']": "setSelectAll",
		"click .sortable": "tableSort"
	},
	collectionEvents: {
		"request": "showLoader",
		"sync"   : "hideLoader"
	},


	initialize: function() {
		var event = "Manage Dashboard Viewed";
		window.dataLayer.push( {
			'appEventCategory': 'Manage',
			'appEventAction'  : 'click',
			'appEventLabel'   : event,
			'event'           : event
		} );
		this.listenTo( this.collection, "refresh", this.pollRefresh );
		this.listenTo( this.collection, "bulkUpdateChange", this.bulkUpdateToggle );
		var self = this;
		$( "#toggleRefresh" ).click( function( e ){
			self.pollRefresh( e );
			$.ajax({
				url: '/core/root/ajax.cfc?method=goPlain&logicalComponent=jobManagement.JobManagement&logicalMethod=setAutoRefresh&asQuery=false',
				data: {
					autoRefresh: self.autoRefresh
				}
			});
		});
		this.autoRefresh = false;
		this.elLoader    = $( '#manageDashboardLoader' );
	},
	setSelectAll: function(){
		var selectAllCB = this.$el.find( "thead input[name='selectAll']" );
		var allCBs      = this.$el.find( "tbody input[name='selected']" );
		var isChecked   = selectAllCB.prop( "checked" );
		selectAllCB.prev( ".checkbox" ).toggleClass( "active brand-primary brand-primary-bg" );
		// Update the DOM - Bad?
		allCBs.prop( "checked", isChecked ).trigger( "change" );
		// Update all jobs
		JM.c.jobs.each( function( model ){
			model.set( "selected", isChecked );
		} );
	},
	tableSort: function( e ){
		var sortHeader = $( e.currentTarget );
		var sortValue  = sortHeader.attr( "data-sortorder" );
		var sortDir    = 'desc';
		self           = this;
		if( sortHeader.hasClass( "desc" ) ){
			sortHeader.removeClass( "desc" ).addClass( "asc" );
			sortDir = 'asc';
		} else if( sortHeader.hasClass( "asc" ) ){
			sortHeader.removeClass( "asc" ).addClass( "desc" );
		} else {
			$( ".asc" ).removeClass( "asc" );
			$( ".desc" ).removeClass( "desc" );
			sortHeader.addClass( "desc" );
		}
		JM.m.filter.set(
			{
				page: 1,
				skip: 0,
				sortBy: sortValue,
				sortDir: sortDir
			}
		);
		this.collection.fetch( JM.m.filter.toJSON(), { reset: true } ).always( function(){
			self.collection.checkboxCheck();
			self.render();
		} );

	},
	onRender: function(){
		var sortBy = JM.m.filter.get( "sortBy" );
		if( sortBy ){
			var sortDir = JM.m.filter.get( "sortDir" );
			this.$el.find( ".sortable[data-sortorder='" + sortBy + "']" ).addClass( sortDir );
		};
	},
	pollRefresh: function pollRefresh( e ){
		if( e ){
			this.autoRefresh = !( this.autoRefresh );
			if( this.autoRefresh ){
				JM.c.jobs.refresh();
			}
		}
		var secs = 600;
		pollRefresh.intervalID = pollRefresh.intervalID || 0;
		clearInterval( pollRefresh.intervalID );
		if( this.autoRefresh ){
			pollRefresh.intervalID = setInterval( function(){
				JM.c.jobs.refresh();
				$( "#pageOptions .icon-refresh" )
					.addClass( "spin" )
					.on( animationEnd, function(){
						$( "#pageOptions .icon-refresh" ).removeClass( "spin" );
					} );
			}, secs * 1000 );
		}
	},
	bulkUpdateToggle: function(){
		$( "#bulkUpdate" ).toggleClass( "invisible" );
		$( "#dashboard,#pagingTopLeft" ).toggleClass( "bulkActive" );
	},
	showLoader: function(){
		this.elLoader.fadeIn( { duration: 300 } );
	},
	hideLoader: function(){
		this.elLoader.fadeOut( { duration: 300 } );
	}

});

JM.m.Job = Backbone.Model.extend( {
	defaults: {
		selected: false
	},
	del: function(){
		var confirmDelete = confirm( 'Are you sure you wish to delete job ' + this.get( "display_number" ) + '?' );
		if( confirmDelete ){
			$.ajax( {
				url: "/core/root/ajax.cfc?method=go&logicalComponent=jobManagement.JobManagement&logicalMethod=deleteJob&asQuery=false&returnFormat=json",
				data: {
					jobIDs: this.get( "id" )
				},
				success: function(){
					JM.c.jobs.refresh();
				}
			} );
		}
	}
} );

JM.c.Jobs = JM.c.BaseCollection.extend( {
	initialize: function(){
		this.showBulkUpdate = false;
		this.on( "change:selected", this.checkboxCheck );
	},
	checkboxCheck: function(){
		if( this.showBulkUpdate !== !!( this.selected().length ) ){
			this.showBulkUpdate = !!( this.selected().length );
			this.trigger( "bulkUpdateChange" );
		}
	},
	model: JM.m.Job,
	url  : "/core/root/ajax.cfc?method=goJSON&logicalComponent=jobManagement.JobManagement&logicalMethod=search&asQuery=false&paging=true&returnFormat=json",
	selected: function() {
		// Get all selected jobs
		return this.where( { selected: true } );
	},
	bulkUpdate: function(data) {
		// For now, update the collection with the form data as a filter
		var selectedJobs = this.selected();
		if( selectedJobs.length ){
			// Extract the IDs - We could pass the models but this will increase the knowledge the remote method needs
			var ids = _.map( selectedJobs, function( model ){
				return model.get( "id" );
			} );
			/*
				At this point we have the option to use BB's built in saving ability by pushing the selected jobs
				into an model and then save()ing the model, or we can just drop back to a straight AJAX call and
				we're done.
			*/
			var confirmed = _.bind( this.confirmUpdate, this, data );
			if( confirmed() ){
				var req = $.ajax( {
					url : "/core/root/ajax.cfc?method=go&logicalComponent=jobManagement.JobManagement&logicalMethod=bulkUpdate&asQuery=false&returnFormat=json",
					data: {
						jobIDs  : ids,
						statusID: data.statusID
					}
				} );
				req.done( function( res ){
					JM.c.jobs.refresh();
				});
				req.fail(function( e ){
					//console.log("Bulk Update failed on the server side", e);
				});
			}
		} else {
			//console.log("Bulk Update failed as no jobs were selected");
		}
	},

	bulkDelete : function(){
		var selectedJobs = this.selected();
		if( selectedJobs.length ){
			var ids = _.map( selectedJobs, function( model ){
				return model.get( "id" );
			} );
			var req = $.ajax( {
				url: "/core/root/ajax.cfc?method=goJSON&logicalComponent=jobManagement.JobManagement&logicalMethod=bulkDelete&asQuery=false&returnFormat=json",
				data: {
					jobIds: ids
				}
			} );
			req.done( function( res ){
				JM.c.jobs.refresh();
			});
			req.fail( function( e ){
				console.log( "Bulk delete failed on the server side", e );
			});
		} else {
			console.log( "Bulk delete failed as no jobs were selected" );
		}

	},

	refresh: function refresh(){ // Named to allow caching

		var self = this;
		// The fetch to come will wipe the selected fields so store first and reset before render
		var selectedJobIDs = _.map( this.selected(), function( job ){
			return job.get( "id" );
		} );

		if( xhr && xhr.readyState != 4 ){
			xhr.abort();
		}

		// Amend the URL params here



		//  If all checkboxes are off then imply all are selected
		var statusID         = $("#search select[name='statusID']").val() || "";
		var statusIdLen      = statusID.length;
		var statusOptionslen = $("#search select[name='statusID']").children('option').length;
		if(statusIdLen == 0) {
		var options = $("#search select[name='statusID'] option");
			var values = $.map(options ,function(option) {
    			return option.value;
			});
				JM.m.filter.attributes.statusID = values;
		}



		var _assigneeID         = $("#search select[name='assigneeID'] ");
		var _assigneeIDSelected = $("#search select[name='assigneeID'] :selected");

		var _assigneeOptionslen = $("#search select[name='assigneeID']").children('option');
		var _assigneeIdLen      = _assigneeID.length;

		console.log("_assigneeID: ", _assigneeID)
		console.log("_assigneeIDSelected: ", _assigneeIDSelected)
		console.log("_assigneeIdLen: ", __assigneeIdLen)
		console.log("_assigneeOptionslen: ", _assigneeOptionslen)

		if(assigneeIdlen == 0) {
			var options = $("#search select[name='assigneeID'] option");
			var values = $.map(options ,function(option) {
    			return option.value;
			});
			JM.m.filter.attributes.assigneeID = values;
		}


	   console.log(JM.m.filter.attributes.assigneeID)

		var teamID         = $("#search select[name='teamID']").val() || "";
		var teamIdLen      = teamID.length;
		var teamOptionslen = $("#search select[name='teamID']").children('option').length;
		if(teamIdLen == 0) {
			var options = $("#search select[name='teamID'] option");
			var values = $.map(options ,function(option) {
    			return option.value;
			});
			JM.m.filter.attributes.teamID = values;
		}

		//strings not arrays in the filter
		if(JM.m.filter.attributes.statusID) {
			JM.m.filter.attributes.statusID = JM.m.filter.attributes.statusID.toString();
		}
		if(JM.m.filter.attributes.assigneeID) {
			JM.m.filter.attributes.assigneeID = JM.m.filter.attributes.assigneeID.toString();
		}
		if(JM.m.filter.attributes.teamID) {
			JM.m.filter.attributes.teamID = JM.m.filter.attributes.teamID.toString();
		}

		// Clean up some dirty data
		delete JM.m.filter.attributes.statusId;
		delete JM.m.filter.attributes.assigneeId;
		delete JM.m.filter.attributes.teamId;

		xhr = this.fetch( JM.m.filter.toJSON(), { reset: true } ).done( function(){
			// Reset the selected field
			_.each( JM.c.jobs.models, function( job ){
				if( _.contains( selectedJobIDs, job.get( "id" ) ) ){
					job.set( { selected: true } );
				}
			});
			JM.c.jobs.checkboxCheck();
			// We have the jobs back, re-render the view
			JM.v.dashboardTable.render();
		} );
	},
	parse: function( res ){
		/*
			The collection may be within a field named 'data'.
			This means we can pass back additional data like
			record count to do paging.
		*/
		if( res.recordCount || res.recordCount === 0 ){
			// limit the display of reason field to 70 chars so that we clean up the dashboard interface
			_.forEach( res.data, function( result ){
				if(result.reason) {
					var reason = result.reason;
					result.reason = reason.length > 70 ? reason.substring( 0, 70 ) + '...' : reason;
				}
			});
			JM.m.filter.set( "recordCount", res.recordCount );
			return res.data;
		} else {
			return res;
		}
	},
	multiStepSelected: function(){
		return this.where( { selected: true, multi_step: 1 } );
	},
	confirmUpdate: function( data ){
		var confirmed         = true;
		var message           = '';
		var multiStepSelected = this.multiStepSelected();
		// only multi-step job(s) changing status to 'handover to artwork' status requires pop-up confirmation
		if( multiStepSelected.length && data.statusText === 'Handover to Artwork' ){
			message = "The multi-step job" + ( multiStepSelected.length > 1 ? "s" : "" ) + " that you have selected to " + data.statusText;
			message = message +  " will automatically generate " + ( multiStepSelected.length > 1 ? "new jobs." : "a new job." );
			message = message + "\nAre you sure that this is what you'd like to do?";
			if( !confirm( message ) ){
				confirmed = false;
			}
		}
		return confirmed;
	}
});


/////////////////
// Bulk Update //
/////////////////
JM.v.BulkUpdate = Backbone.Marionette.ItemView.extend( {
	el: "#bulkUpdate",
	events: {
		"submit": "bulkUpdate",
		"click .bulkDeleteButton" : "bulkDelete"
	},
	bulkUpdate: function( e ){
		e.preventDefault();
		var data        = this.$el.serializeObject();
		data.statusText = this.$el.find( "select[name='statusID'] option:selected" ).text();
		// Has a status been chosen
		if( parseInt( data.statusID, 10 ) ){
			JM.c.jobs.bulkUpdate( data );
		}
	},
	bulkDelete: function(){
		var selectedJobs  = _.filter( JM.c.jobs.models, function( model ){
			return model.get( 'selected' )
		} );
		var jobText       = selectedJobs.length > 1 ? [ 'These jobs', 'these jobs' ] : [ 'This job', 'this job' ];
		var message       = 'Are you sure you wish to delete ' + jobText[ 1 ] + '?\n\nWARNING: ' + jobText[ 0 ] + ' will be permanently deleted and cannot be recovered.';
		var confirmDelete = confirm( message );
		if( confirmDelete ){
			JM.c.jobs.bulkDelete();
		}
	},
	setEnabled: function( enable ){
		this.$el.find( "input[type='submit']" ).prop( "disabled", !enable );
	}
} );

////////////
// Paging //
////////////
JM.v.Paging = Backbone.Marionette.ItemView.extend( {
	tagName: "p",
	initialize: function() {
		// When any of the below attributes change we should re-render the view
		this.listenTo( this.model, "change:recordCount", this.render );
		this.listenTo( this.model, "change:skip", this.render );
		this.listenTo( this.model, "change:page", this.render );
		this.listenTo( this.model, "updatePagination", this.render );
		this.listenTo( this.model, "change:limit", this.render );
	},
	events: {
		"click a.page": "page",
		"click a.next": "paginationHandler",
		"click a.prev": "paginationHandler"
	},
	paginationHandler: function( e ){
		e.preventDefault();
		var currentPage = parseInt( this.model.get( "page" ) );
		var limit       = parseInt( this.model.get( "limit" ) );
		var pagination  = $( e.currentTarget ).data( 'pagination' );
		if( pagination == '+1' ){
			var goToPage = currentPage + 1;
			var skip     = limit * currentPage;
		} else {
			var goToPage = currentPage - 1;
			var skip     = limit * ( goToPage - 1 );
		}
		this.model.set( { "page": goToPage, "skip": skip } );
		JM.c.jobs.refresh();
	},
	page: function( e ){
		e.preventDefault();
		// NOTE: Not implemented yet - Jump to a given page
		// console.log("Go to page...");
	},
	template: function( model ){
		// If recordCount isn't there, we can't generate the paging - Why wouldn't it be there?! - The model/collection was generated incorrectly
		if( model.recordCount ){
			var html  = "";
			var pages = Math.ceil(model.recordCount / model.limit, 10);
			var page  = model.page;
			//html += model.recordCount + " job" + ( model.recordCount > 1 || model.recordCount == 0 ? "s" : "" ) + " - ";
			// We're beyond page 1
			if( page > 1 ){
				html += "<a href='#' class='prev' data-pagination='-1'>Previous page</a> ";
			}
			html += "Page " + page + " of " + pages;
			// There's more than one page
			if( pages > 1 && page < pages ){
				html += " <a href='#' class='next' data-pagination='+1'>Next page</a>";
			}
			return html
		} else {
			return "";
		}
	}
} );

JM.addRegions({
	pagingTopLeft: "#pagingTopLeft"
});

JM.addInitializer(function() {
	JM.m.filter         = new JM.m.Filter();
	JM.c.jobs           = new JM.c.Jobs();
	JM.v.bulkUpdate     = new JM.v.BulkUpdate();
	JM.v.dashboardTable = new JM.v.DashboardTable( {
		collection: JM.c.jobs
	} );
	JM.v.pagingTopLeft = new JM.v.Paging( { model: JM.m.filter } );
	JM.v.search    = new JM.v.Search( { model: JM.m.filter } );

	JM.pagingTopLeft.show( JM.v.pagingTopLeft );
	JM.dashboard.show( JM.v.dashboardTable );

	JM.m.filter.fetch().done( function(){
		JM.c.jobs.refresh();
	} );

});

//The loading class on the body tag in CP3 blocks CSS transitions, it's removed after all initialisations have occurred
JM.on( "start", function(){

} );
