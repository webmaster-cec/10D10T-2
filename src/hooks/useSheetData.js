import { useState, useEffect } from 'react';

// Replace with your actual Published CSV URL
const TASKS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLHmVpReJm-8_JQz8II2WA0xDgKQ8rf_Lz4UBlnMoOuMJs8FRMRhUD2MPL4PpoO5BdRBaibMtqqcnd/pub?gid=0&single=true&output=csv';

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"(.*)"$/, '$1'));
  
  return lines.slice(1).map(line => {
    // Basic CSV splitting that handles quotes
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    return headers.reduce((obj, header, i) => {
      obj[header] = (values[i] || '').replace(/^"(.*)"$/, '$1');
      return obj;
    }, {});
  });
}

export function useSheetData() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TASKS_CSV_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.text();
      })
      .then(text => {
        setTasks(parseCSV(text));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load tasks. Please check back shortly.');
        setLoading(false);
      });
  }, []);

  return { tasks, loading, error };
}
