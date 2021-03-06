    

    require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/Layer",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/config",
      "dojo/dom-construct",
      "esri/core/urlUtils",
      "esri/views/ui/UI",
      "esri/widgets/NavigationToggle",

      "esri/widgets/Search",
      "esri/layers/FeatureLayer",

      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      SceneView, 
      Layer, 
      SimpleRenderer,
      SimpleMarkerSymbol,
      esriConfig,
      domConstruct,
      urlUtils,
      UI,
      NavigationToggle,
      Search,
      FeatureLayer) {

      var map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
      });

      var url2 = "heritage-sites.csv";
       
      
      var template2 = {
        title: "UNESCO World Heritage Site",
        content: "<a href='#' onclick='window.open(\"https://www.google.com/search?q={name_en}\");return false;' <b>{name_en}</b></a>, {date_inscribed} {short_description_en}"
      };
      
      var layer2 = new CSVLayer({
        url: url2,
        copyright: "UNESCO World Heritage Sites",
        popupTemplate: template2
      });

      layer2.renderer = new SimpleRenderer({
          symbol: new SimpleMarkerSymbol({
            size: "50px",
            color: [2, 69, 200, 0.5],
            outline: {
              width: 0.5,
              color: "white"
            }
          })
        });
        
      var tempFeat = {
        title: "World Cities",
        content: "I am {id} at {name} with population {pop}"
      };

      var featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/WorldCities/FeatureServer/0",
          popupTemplate: tempFeat,
          copyright: "Services.ArcGis"
      });

      featureLayer.renderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          size: "50px",
          color: [200, 0, 200, 0.5],
          outline: {
            width: 0.5,
            color: "white"
          }
        })
      });

      console.log(featureLayer.fields);

      map.add(featureLayer);
      map.add(layer2);
      
      var logo = domConstruct.create("img", {
        src: "ram.png",
        height: "100px",
        id: "logo",
        title: "logo"
      });
      
      

      var view = new SceneView({
        container: "viewDiv",
        center: [138, 35],
        zoom: 2,
        map: map
      });
      
      var navigationToggle = new NavigationToggle({
        view: view
      });
      
      function layerH(){
        layer2.visible = true;
        featureLayer.visible = false;

      }
      function layerC(){
        featureLayer.visible = true;
        layer2.visible = false;
      }
      function layerA(){
        featureLayer.visible = true;
        layer2.visible = true;
      }

      
       var button = document.createElement("button");
      var t = document.createTextNode("Heritage");   
      button.appendChild(t);                               
      document.body.appendChild(button);
      button.style.backgroundColor="white";
      button.style.color="#2E3439";
      button.style.border="0px";
      button.style.fontSize="15px";
      button.style.padding="5px";
      button.style.fontFamily="Calibri";
      button.onclick = layerH;

      var button2 = document.createElement("button");
      var t2 = document.createTextNode("Cities");      
      button2.appendChild(t2);                     
      document.body.appendChild(button2);
      button2.style.backgroundColor="white";
      button2.style.color="#2E3439";
      button2.style.border="0px";
      button2.style.fontSize="15px";
      button2.style.padding="5px";
      button2.style.fontFamily="Calibri";
      button2.onclick = layerC;
      
      var button3 = document.createElement("button");
      var t3 = document.createTextNode("All");      
      button3.appendChild(t3);                     
      document.body.appendChild(button3);
      button3.style.backgroundColor="white";
      button3.style.color="#2E3439";
      button3.style.border="0px";
      button3.style.fontSize="15px";
      button3.style.padding="5px";
      button3.style.fontFamily="Calibri";
      button3.onclick = layerA;

      function startDictation() {
   
      if (window.hasOwnProperty('webkitSpeechRecognition')) {
   
        var recognition = new webkitSpeechRecognition();
   
        recognition.continuous = false;
        recognition.interimResults = false;
   
        recognition.lang = "en-US";
        recognition.start();
   
        recognition.onresult = function(e) {
          document.getElementById('recognition').value
                                   = e.results[0][0].transcript;
          console.log(e.results[0][0].transcript);
          recognition.stop();
          if(e.results[0][0].transcript === "zoom out"){
            zoomOut();
          }
          else if(e.results[0][0].transcript === "zoom in"){
            zoomIn();
          }
          else if(e.results[0][0].transcript === "left"){
            left();
          }
          else if(e.results[0][0].transcript === "right"){
            right();
          }
          else
            findme();
        };
   
        recognition.onerror = function(e) {
          recognition.stop();
        }
   
      }
    }

      var button4 = document.createElement("input");
      var icon = document.createElement("img");
      icon.src = "//i.imgur.com/6b8p6tW.png";
      icon.onclick = startDictation;
      button4.id = "recognition";
      button4.appendChild(icon);
      document.body.appendChild(button4);
      button4.style.backgroundColor ="white";
      button4.placeholder = "Speech";

      button4.onclick = startDictation;
      


      var searchWidget = new Search({
        view: view
      });
      searchWidget.startup();

      function findme(){
        searchWidget.searchTerm = button4.value;
        searchWidget.search(button4.value);
        view.zoom = 5;
        button4.blur();
      }

      function zoomOut(){
        view.zoom -= 2;
        button4.blur();
      }
      function zoomIn(){
        view.zoom += 2;
        button4.blur();
      }

      view.ui.add(logo, "bottom-right");
      view.ui.add(searchWidget, "top-right");
      view.ui.add(icon, "top-right");
      view.ui.add(button3, "bottom-left");
      view.ui.add(button, "bottom-left");
      view.ui.add(button2, "bottom-left");

      function left(){
        rotateView(-1);
        button4.blur();
      }
      function right(){
        rotateView(1);
        button4.blur();
      }

      function rotateView(direction) {
        var heading = view.camera.heading;

        // Set the heading of the view to the closest multiple of 90 degrees,
        // depending on the direction of rotation
        if (direction > 0) {
          heading = Math.floor((heading + 1e-3) / 90) * 90 + 90;
        } else {
          heading = Math.ceil((heading - 1e-3) / 90) * 90 - 90;
        }

        view.goTo({
          heading: heading
        });
      }

      function tiltView() {
        // Get the camera tilt and add a small number for numerical inaccuracies
        var tilt = view.camera.tilt + 1e-3;

        // Switch between 3 levels of tilt
        if (tilt >= 80) {
          tilt = 0;
        } else if (tilt >= 40) {
          tilt = 80;
        } else {
          tilt = 40;
        }

        view.goTo({
          tilt: tilt
        });
      }

      function updateIndicator(camera) {
        var tilt = camera.tilt;
        var heading = camera.heading;

        // Update the indicator to reflect the current tilt/heading using
        // css transforms.
        var transform = "rotateX(" + 0.8 * tilt +
          "deg) rotateY(0) rotateZ(" + -heading + "deg)";

        indicatorSpan.style["transform"] = transform;
        indicatorSpan.style["-webkit-transform"] = transform; // Solution for Safari
      }
       

    });