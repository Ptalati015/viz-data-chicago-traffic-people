let dataa = [{
    "bin": "0-9 years",
    "gender": "male",
    "count": 23720
},
{
    "bin": "0-9 years",
    "gender": "female",
    "count": 21425
},
{
    "bin": "10-19 years",
    "gender": "male",
    "count": 42124
},
{
    "bin": "10-19 years",
    "gender": "female",
    "count": 37412
},
{
    "bin": "20-29 years",
    "gender": "male",
    "count": 163091
},
{
    "bin": "20-29 years",
    "gender": "female",
    "count": 139994
},
{
    "bin": "30-39 years",
    "gender": "male",
    "count": 145970
},
{
    "bin": "30-39 years",
    "gender": "female",
    "count": 109312
},
{
    "bin": "40-49 years",
    "gender": "male",
    "count": 113714
},
{
    "bin": "40-49 years",
    "gender": "female",
    "count": 76968
},
{
    "bin": "50-59 years",
    "gender": "male",
    "count": 98283
},
{
    "bin": "50-59 years",
    "gender": "female",
    "count": 59891
},
{
    "bin": "60-69 years",
    "gender": "male",
    "count": 60955
},
{
    "bin": "60-69 years",
    "gender": "female",
    "count": 37165
},
{
    "bin": "70+ years",
    "gender": "male",
    "count": 21484
},
{
    "bin": "70+ years",
    "gender": "female",
    "count": 15459
}
];

let specc = {
"data": {
    "values": dataa
},
"vconcat": [{
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "bin",
                "type": "ordinal"
            },
            "y": {
                "aggregate": "sum",
                "field": "count"
            },
            "color": {
                "field": "gender",
                "type": "nominal",
                "title": "Gender" // Add a title for the legend
            },
            "opacity": {
                "condition": {
                    "selection": "gender",
                    "value": 1
                },
                "value": 0.5 // Set initial opacity for unselected bars
            }
        },

        title: {
            text: "Distribution of injuries by Age group between Male and Females"
        },
        "selection": {
            "gender": {
                "type": "single",
                "fields": ["gender"]
            }
        }
    },
    {
        "title": { // Title for the scatter plot based on selected gender
            "text": "Distribution of injuries by Age group between Male and/or Female"
        },
        "mark": "point",
        "encoding": {
            "x": {
                "field": "bin",
                "type": "ordinal"
            },
            "y": {
                "aggregate": "sum",
                "field": "count"
            },
            "color": {
                "field": "gender",
                "type": "nominal",
                "title": "Gender" // Add a title for the legend
            }
        },
        "transform": [{
            "filter": {
                "selection": "gender"
            }
        }]
    }
]
};


const ageChart = vegaEmbed("#ageChart", specc);