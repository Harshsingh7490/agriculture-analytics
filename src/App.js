// src/App.js
//importing libraries
import React, { useState, useEffect } from 'react';
import { Container, Table, Center } from '@mantine/core';
import { aggregateData } from './utils/dataProcessing';
import jsonData from './utils/Manufac_India_Agro_Dataset.json';

const App = () => {
  const [yearData, setYearData] = useState([]);
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = jsonData;
      if (rawData.length > 0) {
        // Aggregate data from JSON
        const { yearAggregation, cropAggregation } = aggregateData(rawData);

        // Set state with aggregated data
        setYearData(Object.entries(yearAggregation));
        setCropData(Object.entries(cropAggregation));
      } else {
        console.error('No data to display'); // Log error if JSON data is empty
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Indian Agriculture Analytics</h1>

      {/* Centered section for Yearly Crop Production */}
      <Center style={{ marginTop: '20px' }}>
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Yearly Crop Production</h2>
          {/* Table displaying yearly crop production data */}
          <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Year</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Crop with Max Production</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Crop with Min Production</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping through yearData to render each year's production */}
              {yearData.map(([year, data]) => (
                <tr key={year}>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{year}</td>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{data.maxProductionCrop}</td>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{data.minProductionCrop}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Center>

      {/* Centered section for Crop Averages */}
      <Center style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Crop Averages (1950-2020)</h2>
          {/* Table displaying crop averages */}
          <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Crop</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Average Yield (Kg/Ha)</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Average Cultivation Area (Ha)</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping through cropData to render each crop's averages */}
              {cropData.map(([crop, data]) => (
                <tr key={crop}>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{crop}</td>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{data.avgYield}</td>
                  <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{data.avgArea}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Center>
    </Container>
  );
};

export default App;
