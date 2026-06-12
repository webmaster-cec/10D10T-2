import { useState, useEffect } from 'react';

// Replace with your actual Published CSV URL
const TASKS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLHmVpReJm-8_JQz8II2WA0xDgKQ8rf_Lz4UBlnMoOuMJs8FRMRhUD2MPL4PpoO5BdRBaibMtqqcnd/pub?gid=0&single=true&output=csv';

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip newline
      }
      currentRow.push(currentVal.trim());
      // Only push non-empty rows
      if (currentRow.join('') !== '') {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  // Push the very last row if there's remaining content
  if (currentVal !== '' || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.join('') !== '') {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) return [];

  const headers = rows[0];

  return rows.slice(1).map(row => {
    return headers.reduce((obj, header, i) => {
      obj[header] = row[i] || '';
      return obj;
    }, {});
  });
}

export function useSheetData() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${TASKS_CSV_URL}&t=${new Date().getTime()}`)
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
