const barChartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        url: './json_specs/linked1.json'
    },
    width: 600,
    height: 400,
    mark: 'bar',
    encoding: {
        x: {
            field: 'City',
            type: 'nominal',
            sort: '-y',
        },
        y: {
            field: 'Count',
            type: 'quantitative',
        },
    },
    title: {
        text: '', // Add your desired title here
    },
};

const lineChartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        values: [] // Initialize with an empty array
    },
    width: 600,
    height: 400,
    mark: 'line',
    encoding: {
        x: {
            field: 'Year',
            type: 'ordinal',
        },
        y: {
            field: 'Count',
            type: 'quantitative',
        },
        color: {
            field: 'Injury Classification',
            type: 'nominal',
            scale: {
                range: ['blue', 'red', 'green', 'purple'], // Set different colors for each classification
            },
        },
    },
    title: {
        text: '', // Add your desired title here
    },
};

const barChartContainer = document.getElementById('bar-chart');
const lineChartContainer = document.getElementById('line-chart');
const cityDropdown = document.getElementById('cityDropdown');
const selectButton = document.getElementById('selectButton');
const backButton = document.getElementById('backButton');
const injuryFilterDropdown = document.getElementById('injuryFilter');
const filterButton = document.getElementById('filterButton');
const city = document.getElementById('city');

let selectedCityData; // Define selectedCityData at a higher scope
barChartSpec.title.text = 'Bar Chart of Injuries by City (Top Cities, Excluding Chicago)';
// Embed the bar chart
vegaEmbed('#barChart', barChartSpec);

// Add click event listener to the select button
selectButton.addEventListener('click', async function () {

    const selectedCity = cityDropdown.value;

    // Fetch data for the selected city and update the line chart
    selectedCityData = await fetchDataForCity(selectedCity);

    // Calculate the average count for each year for each classification
    const averagedData = calculateAverageData(selectedCityData);

    // Update the line chart data values with the averaged data
    lineChartSpec.data.values = averagedData;

    // Embed the line chart
    lineChartSpec.title.text = `${selectedCity}'s Injuries over Time`
    vegaEmbed('#lineChart', lineChartSpec);

    // Hide the bar chart and show the line chart
    barChartContainer.style.display = 'none';
    lineChartContainer.style.display = 'block';
    city.style.display = 'none';
});

// Add click event listener to the back button
backButton.addEventListener('click', function () {
    // Hide the line chart and show the bar chart

    // Hide the line chart and show the bar chart
    barChartContainer.style.display = 'block';
    lineChartContainer.style.display = 'none';
    city.style.display = 'block';

});

async function fetchDataForCity(city) {
    console.log(city);

    // Read the JSON data from the local file
    const response = await fetch('./json_specs/linked1.json');

    if (response.ok) {
        const jsonData = await response.json();

        // Filter the data for the selected city
        const filteredData = jsonData.filter(dataPoint => dataPoint.City === city);

        return filteredData;
    } else {
        console.error('Failed to fetch data for the selected city.');
        return [];
    }
}

filterButton.addEventListener('click', function () {
    const selectedInjuryClassification = injuryFilterDropdown.value;

    if (selectedInjuryClassification === 'All') {
        // When "All" is selected, calculate the average data for each classification
        const classifications = ['NONINCAPACITATING INJURY', 'FATAL', 'REPORTED, NOT EVIDENT',
            'INCAPACITATING INJURY'
        ];
        const averagedData = [];
        for (const classification of classifications) {
            const filteredData = selectedCityData.filter(dataPoint => dataPoint[
                'Injury Classification'] === classification);
            averagedData.push(...calculateAverageData(filteredData, classification));
        }

        // Update the line chart data values with the averaged data for all classifications
        lineChartSpec.data.values = averagedData;
    } else {
        // When a specific classification is selected, filter the data and calculate the average
        const filteredData = selectedCityData.filter(dataPoint => dataPoint['Injury Classification'] ===
            selectedInjuryClassification);
        const averagedData = calculateAverageData(filteredData, selectedInjuryClassification);
        lineChartSpec.data.values = averagedData;
    }
    
    vegaEmbed('#lineChart', lineChartSpec);
});

function calculateAverageData(data, classification) {
    // Calculate the average count for each year
    const years = [...new Set(data.map(dataPoint => dataPoint.Year))];
    const averagedData = years.map(year => {
        const countSum = data.reduce((sum, dataPoint) => {
            if (dataPoint.Year === year) {
                return sum + dataPoint.Count;
            }
            return sum;
        }, 0);
        const countAverage = countSum / data.filter(dataPoint => dataPoint.Year === year).length;
        return {
            Year: Math.floor(year),
            Count: countAverage,
            'Injury Classification': classification, // Add the classification
        };
    });
    return averagedData;
}
