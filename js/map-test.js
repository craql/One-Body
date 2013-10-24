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
			if(data){
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
		if(data){
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