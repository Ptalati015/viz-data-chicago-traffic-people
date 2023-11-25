  // Load GeoJSON data
  fetch('./json_specs/merged_data.geojson')
  .then(response => response.json())
  .then(data => {

      // Vega-Lite Specification
      const geoSpec = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "data": {
              "values": data.features,
          },
          width: 500,
          height: 600,
          

          "mark": {
              "type": "geoshape",
              "filled": true,
              "color": "gray",
              "stroke": "white",
              "strokeWidth": 0.5,
          },
          "projection": {
              "type": "identity",
              "reflectY": true
          },
          "tooltip": {
              "title": "Accident Details"
          },
          

          "encoding": {
              "color": {
                  "field": "properties.crashes",
                  "type": "quantitative",
                  "scale": {
                      "type": "quantize"
                  },
                  "title": "# of Accidents"
              },
              "tooltip": [{
                      "field": "properties.crashes",
                      "type": "quantitative",
                      "title": "# of Accidents",
                  },
                  {
                      "field": "properties.zip",
                      "type": "quantitative",
                      "title": "ZipCode"
                  },
                  

              ],              

          },

          title: {
              text: "Distribution of Accidents by Zipcode's in Chicago"
          }
      };
      geoSpec.encoding.color.scale = { type: 'linear', scheme: 'greens' }; // Change the scale type and scheme


         document.querySelector("#filter").addEventListener("click", e => {
            const selectedRepresentation = document.getElementById("representation").value;

            console.log(selectedRepresentation)
        if (selectedRepresentation === 'injuries') {
            geoSpec.encoding.color.field = 'properties.injuries';
            geoSpec.encoding.color.title = '# of Injuries';
            geoSpec.title.text = "Distribution of injuries by Zipcode's in Chicago"
            geoSpec.encoding.color.scale = { type: 'linear', scheme: 'purples' }; // Change the scale type and scheme
            geoSpec.encoding.tooltip[0].field = "properties.injuries"
            geoSpec.encoding.tooltip[0].title = "# of Injuries"

        } else if (selectedRepresentation === 'fatalities') {
            geoSpec.encoding.color.field = 'properties.fatalities';
            geoSpec.encoding.color.title = '# of Fatalities';
            geoSpec.title.text = "Distribution of fatalities by Zipcode's in Chicago"
            geoSpec.encoding.color.scale = { type: 'linear', scheme: 'reds' }; // Change the scale type and scheme
            geoSpec.encoding.tooltip[0].field = "properties.fatalities"
            geoSpec.encoding.tooltip[0].title = "# of Fatalities"


        } else {
            geoSpec.encoding.color.field = 'properties.crashes';
            geoSpec.encoding.color.title = '# of Accidents';
            geoSpec.title.text = "Distribution of Accidents by Zipcode's in Chicago"
            geoSpec.encoding.color.scale = { type: 'linear', scheme: 'greens' }; // Change the scale type and scheme
            geoSpec.encoding.tooltip[0].field = "properties.crashes"
            geoSpec.encoding.tooltip[0].title = "# of Accidents"




        }
        vegaEmbed("#map", geoSpec)


     })
      // Embed the visualization in the container with id 'vis'
      
      
      // Initialize
      
      vegaEmbed("#map", geoSpec)
      

      // Brush event handler
      })