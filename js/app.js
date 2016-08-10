var app = angular.module('main', ['ui-leaflet', 'angular-geohash']);

app.controller("SimpleMapController", [ '$scope', 'geohash', 'leafletData', function($scope, geohash, leafletData) {

	$scope.updateMarkers = function(geohashs){
		var markers = [];
		var result = [];

		angular.forEach(geohashs, function(value, key){
			var point = geohash.decode(value);
			this.push(point)
		}, result);

		angular.extend($scope, {
			markers: result.map(function(ap) {
              return {
                layer: 'markers',
                lat: ap['latitude'],
                lng: ap['longitude'],
                // message: ap[]
              };
            })
		})

	}

	$scope.updateHeatmap = function(geohashs){
		var heatmap_data = [];
		var result = [];

		angular.forEach(geohashs, function(value, key){
			var point = geohash.decode(value);
			this.push(point)
		}, result);

		angular.extend($scope.layers.overlays, {

			heat: {
				name: 'HeatMap',
				type: 'heat',
				data: result.map(function(ap) {
	              return [ap['latitude'], ap['longitude']]
	            }),
                layerOptions: {
                    radius: 20,
                    blur: 10
                },
                visible: true
			}
		})

	}

	$scope.$watch('geohash_markers', function(new_value, old_value){
		if(new_value != old_value){
			var geohashs = new_value.split('\n');
			$scope.updateMarkers(geohashs)
		}
	}, true);

	$scope.$watch('geohash_heatmap', function(new_value, old_value){
		if(new_value != old_value){
			var geohashs = new_value.split('\n');
			$scope.updateHeatmap(geohashs)
		}
	}, true);



    var baseLayers = {
      osm: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      osmbw: {
          name: 'OpenStreetMap BW',
          type: 'xyz',
          url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
      },
      osmde: {
          name: 'OpenStreetMap DE',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
      },
      osmfr: {
          name: 'OpenStreetMap FR',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
      },
      osmhot: {
          name: 'OpenStreetMap Hot',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      },
      thunderforest: {
          name: 'Thunderforest',
          type: 'xyz',
          url: 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
      },
      thunderforestspinal: {
          name: 'Thunderforest Spinal',
          type: 'xyz',
          url: 'http://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png'
      },
      openmapsurfer: {
          name: 'OpenMapSurfer',
          type: 'xyz',
          url: 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}'
      },
      stamentoner: {
          name: 'Stamen Toner',
          type: 'xyz',
          url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
      },
      stamentonerbg: {
          name: 'Stamen Toner Background',
          type: 'xyz',
          url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
      },
      stamentonerlite: {
          name: 'Stamen Toner Lite',
          type: 'xyz',
          url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png'
      },
      opentopomap: {
          name: 'OpenTopoMap',
          type: 'xyz',
          url: 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
      },
    };

    var overlays = {
		markers: {
			name: "Markers",
			type: "markercluster",
			visible: true,
			layerOptions: {}
		}

    }

    angular.extend($scope, {
      layers: {
        baselayers: baseLayers,
        overlays: overlays
      },
      events: {
        map: {
          enable: ['zoomstart', 'drag', 'click', 'mousemove'],
          logic: 'emit'
        }
      }
    });


	angular.extend($scope, {
	    defaults: {
	        tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
	        maxZoom: 14,
	        path: {
	            weight: 10,
	            color: '#800000',
	            opacity: 1
	        }
	    },
	});

   leafletData.getMap().then(function(map) {
        // L.GeoIP.centerMapOnPosition(map, 15);
        console.log(map);
    });	
}]);




