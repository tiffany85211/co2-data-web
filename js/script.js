//global variable for storing key list of all countries with their own value of total emissions 
var all_total = {};   

/* create store */
(function() {
    angular.module('store',[]);
})();

/* store controller: pass in variables and read json file */
(function() {
    angular
        .module('store', ['ngMaterial'])
        .controller('storeController',['$scope','$http', function($scope, $http) {
            $scope.default = {
                country: "All Countries",
                year_begin: "1751",
                year_end: "2014"
            }
            $scope.data = [];
            $scope.countries = Object.keys(country_abbr);
            $scope.years = getYears();
            $scope.onCountryChange = function(country) {
                //console.log("selected country: " + country);
            };
            $scope.onYearChange = function(data, year_begin, year_end) {
                all_total = getAllTotal(data, year_begin, year_end);
                renderMap();
            };
            $scope.getTotal = function(country) {
                return all_total[country.toUpperCase()];
            }

            $http.get('./data/fossil-fuel-co2-emissions-by-nation.json')
                .success(function(data) {
                    $scope.data = data;
                    all_total = getAllTotal(data, $scope.default.year_begin, $scope.default.year_end);
                    renderMap();
                });
        }]);
})();

/* custom filter: capitalization of the 1st letter in every word in the given string (country name) */
(function() {
    angular.module('store')
    .filter('capitalize', function() {
        return function(data) {
            for (let i = 0; i < data.length; i++) {
                // data[i] = data[i].split(" ").map((word) => str.toUpperCase()[0] + str.slice(1).toLowerCase()).join(" ");
                data[i] = data[i].replace(/\w\S*/g, function(str) { 
                    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
                })
            }
            return data;
        };
    })
})();

/* returns an array from 1751 to 2014 */
function getYears() {  
    var years = [];
    for(let i = 0; i < 264; i++) years.push(i + 1751);
    return years;
}

/* returns an object { key of all countries: value of its total emissions } */
function getAllTotal(data, year_begin, year_end) {
    // init with value 0 and add a new key-value pair for case "All Countries"
    let all_total = Object.assign({}, country_abbr);
    for(i in all_total) all_total[i] = 0;
    all_total["ALL COUNTRIES"] = 0;
    // calculate total emissions in the selected year range for all countries
    for(i in data) {
        if( data[i].Year >= year_begin && data[i].Year <= year_end) {
            all_total[data[i].Country] += data[i].Total;
            all_total["ALL COUNTRIES"] += data[i].Total;
        }
    }
    return all_total;
}

/* returns heat map areas {id: country abbreviation,  value: num of total emissions}  */
function getAreas(){
    let areas= [];
    let abbr_total = {};
    let new_all_total = Object.assign({}, all_total);
    delete new_all_total["ALL COUNTRIES"];
    for(i in new_all_total) {
        let abbr = country_abbr[i];
        if(abbr!== "") {
            if(abbr in abbr_total) { abbr_total[abbr] += new_all_total[i]; }   
            else { abbr_total[abbr] = new_all_total[i]; } 
        }
    }
    for(let i in abbr_total) {
        areas.push({
            id: i, 
            value: abbr_total[i],
            description: "Total C Emissions: " + abbr_total[i]
        })
    }
    return areas;
}

/* renders heat map in "mapdiv" (in the selected year range)  */
function renderMap() {
    AmCharts.makeChart( "mapdiv", {
        type: "map",
        colorSteps: 20,
        
        dataProvider: {
          map: "worldHigh",
          areas: getAreas(),
        },
      
        areasSettings: {
          "autoZoom": true,
          "selectedColor": undefined,
          "color": "#FFF176",
        },

        valueLegend: {
            right: 10,
            minValue: "little",
            maxValue: "a lot!"
        }
        
      } );
}
