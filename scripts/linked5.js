const s = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    data: {
        url: './json_specs/linked5.json'
    },
    "width": 400,
    "height": 300,
    "mark": {
        "type": "rect",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "weather_condition",
            "type": "nominal"
        },
        "y": {
            "field": "year",
            "type": "ordinal"
        },
        "color": {
            "field": "count",
            "type": "quantitative"
        }
    },

    title: "Visualizing Weather Conditions by Year"
    
   
};

const spec1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {
        "url": "./json_specs/linked5.json"
    },
    "mark": "bar",
    "encoding": {
        "x": {
            "aggregate": "sum",
            "field": "count"
        },
        "y": {
            "field": "weather_condition",
            "type": "nominal"
        },
        "color": {
            "field": "weather_condition",
            "type": "nominal"
        },
       
    },
    title: "Visualizing Weather Conditions by Year"

   
};

// const view = new vega.View(vega.parse(spec))
//     .renderer('canvas') // Set the renderer to canvas
//     .initialize('#vis')
//     .run();


  
  // Add tooltip interaction to spec1
  spec1.mark = {
    "type": "bar",
    "tooltip": {"content": "data"} 
  }

const vis = document.getElementById('vis');
vegaEmbed(vis, s);
const vis1 = document.getElementById('vis1');
vegaEmbed(vis1, spec1);



// Handle selection event

function filterData() {
    const val = document.getElementById("filterVal").value;
    if (val !== "None") {
      s.transform = [{
        "filter": {"field": "weather_condition", "equal": val}  
      }];
      s.title = `Visualizing ${val} by Year`
      spec1.title =`Visualizing ${val} by Year`
      spec1.transform = [{
        "filter": {"field": "weather_condition", "equal": val}
      }];
    } else {
      delete s.transform; 
      delete spec1.transform;
      s.title =  "Visualizing Weather Conditions by Year";
      spec1.title =  "Visualizing Weather Conditions by Year"


    }
    
    vegaEmbed("#vis", s)
    vegaEmbed("#vis1", spec1)
}

