var map = null;
var geocoder = null;

function initialize(lat,lon,size,controls) {
	geocoder = new google.maps.Geocoder();
	
	var doControls = (controls.length) ? true : false;
	
	map = new google.maps.Map(
			document.getElementById('map_canvas'), {
				center: new google.maps.LatLng(lat, lon),
				zoom: size,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: doControls,
				zoomControl: doControls,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				}
	});
	
	// Create a base icon for all of our markers that specifies the
    // shadow, icon dimensions, etc.
    baseIconSize = new google.maps.Size(20, 34);
    baseIconOrigin = new google.maps.Point(0, 0);
    baseIconAnchor = new google.maps.Point(0, 34);
    
    baseIconShadow = "http://www.google.com/mapfiles/shadow50.png";
    baseIconShadowSize = new google.maps.Size(37, 34);
    baseIconShadowOrigin = new google.maps.Point(0, 0);
    baseIconShadowAnchor = new google.maps.Point(0, 34);
    
	babyIconSize = new google.maps.Size(14, 24);
}

function createMarker(point,name,path,img,markerType) {
	if (!markerType.length) {
		var letteredIcon = "/ajax/images/greenmarker.png";
	} else if (markerType == "nearby") {
		var letteredIcon = "/ajax/images/tinygreen-marker.png";
	} else if (markerType == "thiscourse") {
		var letteredIcon = "/ajax/images/tinyblue-marker.png";
	} else if (markerType == "yellowred") {
		var letteredIcon = "/ajax/images/tinywhite-marker.png";
	} else if (markerType == "redyellow") {
		var letteredIcon = "/ajax/images/tinyyellow-marker.png";
	} else {
		var letteredIcon = "/ajax/images/tinyred-marker.png";
	}
	
	markerOptions = {
		position: point,
		map: map,
		icon: {
			url: letteredIcon,
			size: baseIconSize
		},
		title: name
	};
	
	var marker = new google.maps.Marker(markerOptions);
	
	google.maps.event.addListener(marker, 'click', function() {
		window.location.href = path;
	});
	
	return marker;
}

function showGenericClickablePoint(lat,lon,myhtml) {
	var point = new google.maps.LatLng(lat, lon);
	
	markerOptions = {
		position: point,
		map: map,
		icon: {
			url: '/ajax/images/redmarker.png',
			size: baseIconSize,
			origin: baseIconOrigin,
			anchor: baseIconAnchor
		}	
	};
	
	var marker = new google.maps.Marker(markerOptions);
	var infowindow = new google.maps.InfoWindow({
		content: myhtml
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
	
	infowindow.open(map, marker); // open infowindow by default here
}

function finderMarker(point,name,path,img,myhtml,markerType) {
	if (!markerType.length) {
		var letteredIcon = "/ajax/images/greenmarker.png";
	} else if (markerType == 'thiscourse') {
		var letteredIcon = "/ajax/images/bluemarker.png";
	} else if (markerType == 'yellowred') {
		var letteredIcon = "/ajax/images/whitemarker.png";
	} else if (markerType == 'redyellow') {
		var letteredIcon = "/ajax/images/yellowmarker.png";
	} else {
		var letteredIcon = "/ajax/images/redmarker.png";
	}
	
	markerOptions = {
		position: point,
		map: map,
		shadow: {
			url: baseIconShadow,
			size: baseIconShadowSize,
			origin: baseIconShadowOrigin,
			anchor: baseIconShadowAnchor
		},
		icon: {
			url: letteredIcon,
			size: baseIconSize,
			origin: baseIconOrigin,
			anchor: baseIconAnchor
		},
		title: name	
	};
	
	var marker = new google.maps.Marker(markerOptions);
	var thishtml = "<p align='center'>";
	  
	thishtml += "<b><a href='"+ path +"'>" + name + "</a></b>";
	
	if(myhtml.length) {
		thishtml += "<br />" + myhtml + "<br />- Click for Details -";
	}
	if (markerType.length && markerType != 'thiscourse') {
		thishtml += "<br /><span style='color:red;font-weight:bold'>(Maintenance Alert)</span>";
	}
	
	thishtml += "</p>";
  
	if (navigator.appName == "Microsoft Internet Explorer") {
		google.maps.event.addListener(marker, 'click', function() {
			window.location.href = path;
		});
	} else {
		google.maps.event.addListener(marker, 'click', function() {
			var infowindow = new google.maps.InfoWindow({
				content: thishtml
			});
			infowindow.open(map, marker);
		});
	}
	
	return marker;
}

function zipMarker(point) {
	var letteredIcon = "/ajax/images/bluemarker.png";
	
	markerOptions = {
		position: point,
		map: map,
		icon: {
			url: letteredIcon,
			size: babyIconSize
		}
	};
	
	var marker = new google.maps.Marker(markerOptions);
	
	return marker;
}

function showAddress(address,aeration,name,path,img,myhtml) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var point = results[0].geometry.location;
			finderMarker(point,name,path,img,myhtml,aeration);
		}
	});
}

function showAddressPoint(lat,lon,aeration,name,path,img,myhtml) {
	var point = new google.maps.LatLng(lat, lon);
	var marker = finderMarker(point,name,path,img,myhtml,aeration);
}

function showZipPoint(address) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = zipMarker(results[0].geometry.location);
		}
	});
}

function showNear(address,name,path,img,lat,lon) {
	showColoredMarker('nearby',address,name,path,img,lat,lon);
}

function showThisCourse(address,name,path,img,lat,lon) {
	showColoredMarker('thiscourse',address,name,path,img,lat,lon);
}

function showAerationCourse(address,name,path,img,lat,lon) {
	showColoredMarker('aeration_alert',address,name,path,img,lat,lon);
}

function showYellowRed(address,name,path,img,lat,lon) {
	showColoredMarker('yellowred',address,name,path,img,lat,lon);
}

function showRedYellow(address,name,path,img,lat,lon) {
	showColoredMarker('redyellow',address,name,path,img,lat,lon);
}

// A marker will only render if the lat/lon are right OR the address can be geolocated
function showColoredMarker(colorType,address,name,path,img,lat,lon) {
	if (lat && lon) {
		var point = new google.maps.LatLng(lat, lon);
		var marker = createMarker(point,name,path,img,colorType);
	} else {
		geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var point = results[0].geometry.location;
				var marker = createMarker(point,name,path,img,colorType);
			}
		});
	}
}
