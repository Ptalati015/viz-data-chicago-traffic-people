
// Your existing Vega-Lite table specification
const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        url: './json_specs/linked2-2.json'
    },
    width: 200,
    height: 200,
    mark: 'arc',
    encoding: {
        theta: {
            field: 'count',
            type: 'quantitative'
        },
        color: {
            field: 'safety equipment',
            type: 'nominal'
        },
        tooltip: [{
                field: 'safety equipment',
                type: 'nominal',
                title: 'Safety Equipment'
            },
            {
                field: 'count',
                type: 'quantitative',
                title: 'Count'
            },
           
            
        ]
    },

    title: {
        text: "Distribution of safety equipment"
    }
};

const chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        url: './json_specs/linked2-2.json'
    },
    mark: 'area',
    encoding: {
        x: {
            field: 'year',
            type: 'ordinal',
            axis: {
                title: 'Year'
            }
        },
        y: {
            aggregate: 'sum',
            field: 'count',
            type: 'quantitative',
            axis: {
                title: 'Count'
            }
        },
        color: {
            field: 'safety equipment',
            type: 'nominal',
            title: 'Safety Equipment'
        },
        
    },
    title: {
        text: "Distribution of safety equipment"
    }
};

const label1 = document.createElement('label');
label1.textContent = 'Safety Belt used: 47%';
label1.className = 'd-block'; // Bootstrap class for block-level display


const label2 = document.createElement('label');
label2.textContent = 'None Present: 20%';
label2.className = 'd-block'; // Bootstrap class for block-level display

const label3 = document.createElement('label');
label3.textContent = 'Helmet Used: 33%';
label3.className = 'd-block'; // Bootstrap class for block-level display

// Get the container element where you want to append the labels
const container = document.getElementById('labels-container');

// Append the labels to the container
container.appendChild(label1);
container.appendChild(label2);
container.appendChild(label3);
 
// Fetch your data
fetch('./json_specs/linked2-1.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        // Create a set of all possible combinations of row and column values
        const allCombinations = [];
        const rowValues = [...new Set(data.map(d => d['safety equipment']))];
        const colValues = [...new Set(data.map(d => d['weather condition']))];

        rowValues.forEach(rowValue => {
            colValues.forEach(colValue => {
                allCombinations.push({
                    'safety equipment': rowValue,
                    'weather condition': colValue
                });
            });
        });

        // Merge existing data with all combinations and set count to 0 for missing ones
        const mergedData = allCombinations.map(combination => {
            const match = data.find(d => d['safety equipment'] === combination[
                'safety equipment'] && d['weather condition'] === combination[
                'weather condition']);
            return match || {
                ...combination,
                count: 0
            };
        });

        // Update the data field in the Vega-Lite specification
        spec.data.values = mergedData;

        // Embed the updated table specification
        const tableContainer = document.getElementById('table');
        vegaEmbed(tableContainer, spec);
        const chartContainer = document.getElementById('chart-container');
        vegaEmbed(chartContainer, chartSpec);
    });

const showTableButton = document.getElementById('showTableButton');
const showChartButton = document.getElementById('showChartButton');
const tableContainer = document.getElementById('table-container');
const chartContainer = document.getElementById('chart-container');

showTableButton.addEventListener('click', () => {
    tableContainer.style.display = 'block';
    chartContainer.style.display = 'none';
    container.style.display = 'block';
     
});

showChartButton.addEventListener('click', () => {
    tableContainer.style.display = 'none';
    chartContainer.style.display = 'block';
    container.style.display = 'none';

});


