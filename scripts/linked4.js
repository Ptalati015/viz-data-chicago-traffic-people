const scatterSpecc = {
    "data": {
        "url": "./json_specs/linked4.json"
    },
    "vconcat": [{
        "layer": [{
            "mark": "circle",
            "encoding": {
                "x": {
                    "field": "AGE",
                    "type": "ordinal"
                },
                "y": {
                    "field": "count",
                    "type": "quantitative"
                },
                "size": {
                    "field": "count",
                    "type": "quantitative"
                },
                "color": {
                    "field": "PHYSICAL_CONDITION",
                    "type": "nominal"
                },
                "tooltip": [{
                        "field": "AGE",
                        "type": "ordinal",
                        "title": "Age"
                    },
                    {
                        "field": "count",
                        "type": "quantitative",
                        "title": "Count"
                    },
                    {
                        "field": "PHYSICAL_CONDITION",
                        "type": "nominal",
                        "title": "Condition"
                    }
                ]
            },
            title: {
                text: "Age Distribution by Physical Condition"
            },
        }]
    }]
};

// Bar chart specification
const Barspecc = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": './json_specs/linked4.json'
    },
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "AGE",
            "type": "ordinal",
            "title": "Age"
        },
        "y": {
            "field": "count",
            "type": "quantitative",
            "title": "Count"
        },
        "color": {
            "field": "PHYSICAL_CONDITION",
            "type": "nominal",
            "title": "Physical Condition"
        },
        "tooltip": [{
                "field": "AGE",
                "type": "ordinal",
                "title": "Age"
            },
            {
                "field": "count",
                "type": "quantitative",
                "title": "Count"
            },
            {
                "field": "PHYSICAL_CONDITION",
                "type": "nominal",
                "title": "Condition"
            }
        ]
    },
    title: {
        text: "Age Distribution by Physical Condition"
    },
};




// Embed the scatter plot
const scatterContainer = document.getElementById('scatter-plot');
const ch = document.getElementById('bar-chartt');
// Embed the bar chart
vegaEmbed("#bar-chartt", Barspecc, {
    actions: false
}).then(result => {
    // You can customize the appearance of the chart if needed
});
// Add click event handler to the scatter plot to update the bar chart
const scatterView = vegaEmbed("#scatter-plot", scatterSpecc);
// document.querySelector('.button').addEventListener('click', e => {
//     if (scatterContainer.style.display == 'none') {
//         scatterContainer.style.display = 'block';
//         ch.style.display = 'none'
//     } else {
//         scatterContainer.style.display = 'none';
//         ch.style.display = 'block'
//     }
// })


let url = "./json_specs/linked4.json"

function getAgeBin(age) {
    if (age >= 0 && age <= 20) {
      return "0-20";
    } else if (age >= 21 && age <= 40) {
      return "21-40";
    } else if (age >= 41 && age <= 60) {
      return "41-60";
    } else {
      return "61+";
    }
  }

fetch(url)
    .then(response => response.json())
    .then(data => {
        // Object to store data with age bins
        const ageBins = {};
        
        // Loop through the data and populate age bins
        data.forEach(entry => {
            const ageBin = getAgeBin(entry.AGE);
            if (!ageBins[ageBin]) {
            ageBins[ageBin] = [];
            }
            ageBins[ageBin].push({
            AGE: entry.AGE,
            PHYSICAL_CONDITION: entry.PHYSICAL_CONDITION,
            count: entry.count
            });
        });

        // Your existing code

// Function to filter data based on selected age bin
function filterDataByAgeBin(ageBin) {
    if (ageBin === 'All') {
      // Show the original data
      updateCharts(data);
    } else {
      // Filter data based on the selected age bin
      const filteredData = ageBins[ageBin];
      updateCharts(filteredData);
    }
  }
  
  // Function to update the charts based on filtered data
  function updateCharts(filteredData) {
    // Update the scatter plot
    vegaEmbed("#scatter-plot", {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": { values: filteredData },
        "vconcat": [{
            "layer": [{
                "mark": "circle",
                "encoding": {
                    "x": {
                        "field": "AGE",
                        "type": "ordinal"
                    },
                    "y": {
                        "field": "count",
                        "type": "quantitative"
                    },
                    "size": {
                        "field": "count",
                        "type": "quantitative"
                    },
                    "color": {
                        "field": "PHYSICAL_CONDITION",
                        "type": "nominal"
                    },
                    "tooltip": [{
                            "field": "AGE",
                            "type": "ordinal",
                            "title": "Age"
                        },
                        {
                            "field": "count",
                            "type": "quantitative",
                            "title": "Count"
                        },
                        {
                            "field": "PHYSICAL_CONDITION",
                            "type": "nominal",
                            "title": "Condition"
                        }
                    ]
                },
                title: {
                    text: "Age Distribution by Physical Condition"
                },
            }]
        }]

    })
  
    // Update the bar chart
    vegaEmbed("#bar-chartt", {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "data": { values: filteredData },
      // ... (rest of the bar chart specification)
      "mark": "bar",
      "encoding": {
          "x": {
              "field": "AGE",
              "type": "ordinal",
              "title": "Age"
          },
          "y": {
              "field": "count",
              "type": "quantitative",
              "title": "Count"
          },
          "color": {
              "field": "PHYSICAL_CONDITION",
              "type": "nominal",
              "title": "Physical Condition"
          },
          "tooltip": [{
                  "field": "AGE",
                  "type": "ordinal",
                  "title": "Age"
              },
              {
                  "field": "count",
                  "type": "quantitative",
                  "title": "Count"
              },
              {
                  "field": "PHYSICAL_CONDITION",
                  "type": "nominal",
                  "title": "Condition"
              }
          ]
      },
      title: {
          text: "Age Distribution by Physical Condition"
      },
    }, { actions: false }).then(result => {
      // You can customize the appearance of the chart if needed
    });
  }
  
  // Create radio buttons for each age bin
  const radioContainer = document.getElementById('radio-container');
  const ageBinsArray = ['All', '0-20', '21-40', '41-60', '61+'];
  
  ageBinsArray.forEach(bin => {
    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'ageBin';
    radioBtn.value = bin;
    radioBtn.id = bin;
  
    const label = document.createElement('label');
    label.textContent = bin;
    label.setAttribute('for', bin);
  
    radioContainer.appendChild(radioBtn);
    radioContainer.appendChild(label);
    
    // Add event listener to radio buttons
    radioBtn.addEventListener('change', function() {
      filterDataByAgeBin(this.value);
    });
  });
  

        
    })
  // Function to calculate age ranges and create bins
 
  
  
  

  
