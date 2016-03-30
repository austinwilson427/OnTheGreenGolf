function loadMap(divTag, params) {
 if (divTag) {
  jQuery.ajax({
   url : "/ajax/finder/loadMap.cfm",
   data : params,
   dataType : "script", 
   type : "GET",
   beforeSend : function() {
    jQuery(divTag).block('<img src="/ajax/images/gk-ajax-loader.gif" />');
   },
   success : function(response, status) {
    jQuery(divTag).html(response);
   },
   complete : function() {
    jQuery(divTag).unblock();
   }
  });
 }
}

function mapFinder(params) {
  jQuery.ajax({
   url : "/ajax/finder/loadMap.cfm",
   data : params,
   cache : false, 
   type : "GET",
   beforeSend : function() {
    jQuery('#map_canvas').html('<div style="width: 100%; height: 150px"></div>');
	jQuery('#map_canvas').block({
		message: '<h4>Finding Courses...</h4><p align="center"><img src="/ajax/images/gk-ajax-loader.gif" /></p>'
	});
   },
   success : function(response, status) {
    jQuery('#map_canvas').html(response);
   },
   complete : function() {
    jQuery('#map_canvas').unblock();
	document.byaddress.gobutton1.disabled = false;
   }
  });
}

function loadCourses(divTag, params) {
 if (divTag) {
  var defaults = {};
  jQuery.ajax({
   url : "/ajax/finder/loadcourses.cfm",
   data : jQuery.extend(defaults, params), 
   type : "GET",
   beforeSend : function() {
    jQuery(divTag).block('<img src="/ajax/images/gk-ajax-loader.gif" />');
   },
   success : function(response, status) {
    jQuery(divTag).html(response);
   },
   complete : function() {
    jQuery(divTag).unblock();
   }
  });
 }
}

function loadNearby(divTag, params) {
 if (divTag) {
  jQuery.ajax({
   url : "/ajax/finder/loadnearby.cfm",
   data : params, 
   dataType : "script", 
   type : "GET",
   beforeSend : function() {
    jQuery(divTag).block('<img src="/ajax/images/gk-ajax-loader.gif" />');
   },
   success : function(response, status) {
    jQuery(divTag).html(response);
   },
   complete : function() {
    jQuery(divTag).unblock();
   }
  });
 }
}

