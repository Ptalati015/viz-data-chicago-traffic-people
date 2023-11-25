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
document.querySelector('.button').addEventListener('click', e => {
    if (scatterContainer.style.display == 'none') {
        scatterContainer.style.display = 'block';
        ch.style.display = 'none'
    } else {
        scatterContainer.style.display = 'none';
        ch.style.display = 'block'
    }
})