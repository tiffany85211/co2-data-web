# co2-data-web
A web application that counts and visualizes total CO2 emissions for each country.

[Demo Link Here](https://tiffany85211.github.io/co2-data-web/) 

## Usage
1. Select a particular country (or "All Countries") and a particular year range from 1751 to 2014

2. Check the calculated number of total carbon emissions from all kinds of fossil fuels
* If that country ranks top 20 high CO2 emissions: its world ranking will be shown, and its total number will be displayed in color red.

![demo-1](https://github.com/tiffany85211/co2-data-web/blob/master/demo/demo-img-1.png)

3. Interact with World Heat Map
* Click on the button to show or hide the map
* Click on the country in the map, and it will show you the name of the country with its total carbon emissions in the selected year range.

![demo-2](https://github.com/tiffany85211/co2-data-web/blob/master/demo/demo-img-2.png)

## Data Source

[Datahub: CO2 Emissions from Fossil Fuels since 1751, By Nation](http://datahub.io/core/co2-fossil-by-nation)   Citation:
> Boden, T.A., G. Marland, and R.J. Andres. 2013. Global, Regional, and National Fossil-Fuel CO2 Emissions. Carbon Dioxide Information Analysis Center, Oak Ridge National Laboratory, U.S. Department of Energy, Oak Ridge, Tenn., U.S.A. doi 10.3334/CDIAC/00001_V2013

## Framework and packages

### Angular.js
* ng-app, ng-controller
* read in json data by $http
* ng-init, ng-model, ng-change
* ng-repeat
* ng-click, ng-show
* ng-class
* custom filter: Capitalization 


### AngularJS Material
* https://material.angularjs.org/latest/
* Responsive design: Desktop and Mobile
* md-card, md-button, md-select

### AmCharts AmMap
* https://www.amcharts.com/javascript-maps/
* World High (Resolution) Map
* Heat map: color steps = 20
