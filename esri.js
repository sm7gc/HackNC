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
            size: "23px",
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
          size: "23px",
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
        zoom: 4,
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
      button.style.font="Tahoma";
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
      button2.style.font="Tahoma";
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
      button3.style.font="Tahoma";
      button3.onclick = layerA;
      
      view.ui.add(logo, "bottom-right");
      view.ui.add(button3, "bottom-left");
      view.ui.add(button, "bottom-left");
      view.ui.add(button2, "bottom-left");
     
       

    });