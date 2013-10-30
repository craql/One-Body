// JS Leaflet Esri Google Test

Craydent.DEBUG_MODE = true;
var map;
var popup = L.popup();

function initMap(){
	var streets   = L.esri.basemapLayer("Streets"),
		topo  = L.esri.basemapLayer("Topographic"),
		gray = L.esri.basemapLayer("Gray"),
		labels = L.esri.basemapLayer("GrayLabels"),
		//fLayer = L.esri.featureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/stops/FeatureServer/0/'),
		attendees = L.esri.tiledMapLayer("http://ec2-23-21-114-109.compute-1.amazonaws.com/ArcGIS/rest/services/Attendee_2013/MapServer")
		;
		
		
		
		var grayMap = L.layerGroup([gray, labels]);
		
	map = L.map('map',{
		center: new L.LatLng(39.73, -104.99),
		zoom:13,
		layers:[grayMap]
	});
	
		var baseMaps = {
			"Streets": streets,
			"Topographic": topo,
			"Gray": grayMap
		};
		var layers = {
			"2013 Attendees": attendees
		};
		
		L.control.layers(baseMaps, layers).addTo(map);
		findUser();
}
// ArcGIS Online Basemaps - Streets, Topographic, Gray, GrayLabels, Oceans, NationalGeographic, Imagery, ImageryLabels
//      L.esri.basemapLayer("Streets").addTo(map);

initMap();
function findUser(){
		map.locate({setView:true});
		return false;
}
function onMapClick(e) {
	console.log(e);
   // alert("You clicked the map at " + e.latlng);
	 popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
	//get data and reset popup
	geocode(
		{latlng:e.latlng.lat+','+e.latlng.lng},
		function(data){
			if(data && data.status != 'ZERO_RESULTS'){
				var address = data.results[0].formatted_address;
				var geo = data.results[0].geometry.location;
				var point = new L.LatLng(geo.lat, geo.lng);
				popup
					.setLatLng(point)
        			.setContent("You clicked the map at " + point.toString()+
					'<br/><b>'+address+'</b>')
        			.openOn(map);
			}
		}
	)
}

map.on('click', onMapClick);


function user_geocode(form){
	geocode({address:$('user_geocoder').value},function(data){
		if(data && data.status != 'ZERO_RESULTS'){
			console.log(data);
			var geo = data.results[0].geometry.location;
			var point = new L.LatLng(geo.lat, geo.lng);
			map.panTo(point);
			var address = data.results[0].formatted_address;
				popup
					.setLatLng(point)
        			.setContent(point.toString()+
					'<br/><b>'+address+'</b>')
        			.openOn(map);
		}
	})
	return false;
}

function geocode(data,callback){
	callback = callback || logit;
	data = data || {};
	data.sensor = false;
	ajax({
		dataType:'json',
		url:'http://maps.googleapis.com/maps/api/geocode/json?',
		query:data,
		method:'GET',
		onsuccess:callback
		})
}
var blueDot = new L.Icon({
	iconUrl:'http://webapps-cdn.esri.com/graphics/branded/dots/point-blue.png',
	iconSize:[16,16]
})
var greenDot = new L.Icon({
	iconUrl:'http://webapps-cdn.esri.com/graphics/branded/dots/point-green.png',
	iconSize:[16,16]
})
var markers = [];
function addRandomMarker(){
	function rLL(span){
		return -span + (span*2)*Math.random();
	}
	var point = [rLL(90), rLL(180)];
	var m = new L.Marker(point,{
		title:point[0]+','+point[1],
		riseOnHover:true,
		icon:blueDot
	})
	.addTo(map)
	.on('mouseover',function(e){
		e.target.setIcon(greenDot);
	})
	.on('mouseout',function(e){
		e.target.setIcon(blueDot);
	});;
	markers.push(m);
	if(markers.length&100 ==0){
		console.log('markers: '+markers.length);
	}
}
var popInt;
function populate(delay){
	delay = delay || 50;
	popInt = setInterval(addRandomMarker,delay);
	return false;
}

function stopPopulate(){
	clearInterval(popInt);
}

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  //$('#login-panel').append(authResult.access_token);
  $('login-panel').innerHTML+=authResult.access_token;
  } 
  else if (authResult['error']) {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function google_signout(){
gapi.auth.signOut();
}