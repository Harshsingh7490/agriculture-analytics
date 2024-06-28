// src/utils/dataProcessing.js

/**
 * Fetches and parses JSON data from a specified file.
 * @param {string} jsonFile - Path to the JSON file.
 * @returns {Promise<Array>} Parsed JSON data as an array of objects.
 */
export const processData = async (jsonFile) => {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return parsed JSON data
    } catch (error) {
        console.error('Error fetching or parsing the JSON file:', error); // Log error if fetch or parsing fails
        return []; // Return an empty array if there's an error
    }
};

/**
 * Aggregates and computes statistics from agricultural data.
 * @param {Array} data - Array of objects containing agricultural data.
 * @returns {Object} Object containing year and crop aggregations.
 */
export const aggregateData = (data) => {
    const yearAggregation = {};
    const cropAggregation = {};

    // Iterate through each row of data to perform aggregations
    data.forEach((row) => {
        const year = row['Year'];
        const crop = row['Crop Name'];
        const production = parseFloat(row['Crop Production (UOM:t(Tonnes))']) || 0;
        const area = parseFloat(row['Area Under Cultivation (UOM:Ha(Hectares))']) || 0;
        const yieldValue = parseFloat(row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;

        // Year aggregation
        if (!yearAggregation[year]) {
            // Initialize year aggregation if it doesn't exist
            yearAggregation[year] = {
                maxProductionCrop: crop,
                minProductionCrop: crop,
                maxProduction: production,
                minProduction: production,
            };
        } else {
            // Update year aggregation with max and min production
            if (production > yearAggregation[year].maxProduction) {
                yearAggregation[year].maxProduction = production;
                yearAggregation[year].maxProductionCrop = crop;
            }
            if (production < yearAggregation[year].minProduction) {
                yearAggregation[year].minProduction = production;
                yearAggregation[year].minProductionCrop = crop;
            }
        }

        // Crop aggregation
        if (!cropAggregation[crop]) {
            // Initialize crop aggregation if it doesn't exist
            cropAggregation[crop] = {
                totalYield: yieldValue,
                totalArea: area,
                count: 1,
            };
        } else {
            // Update crop aggregation with total yield, area, and count
            cropAggregation[crop].totalYield += yieldValue;
            cropAggregation[crop].totalArea += area;
            cropAggregation[crop].count += 1;
        }
    });

    // Calculate averages for crop aggregation
    Object.keys(cropAggregation).forEach((crop) => {
        cropAggregation[crop].avgYield = parseFloat(
            (cropAggregation[crop].totalYield / cropAggregation[crop].count).toFixed(3)
        );
        cropAggregation[crop].avgArea = parseFloat(
            (cropAggregation[crop].totalArea / cropAggregation[crop].count).toFixed(3)
        );
    });

    return { yearAggregation, cropAggregation }; // Return aggregated data
};
