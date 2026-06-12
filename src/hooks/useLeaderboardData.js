import { useState, useEffect } from 'react';

// Replace with your actual Published CSV URL for Leaderboard tab
const LEADERBOARD_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLHmVpReJm-8_JQz8II2WA0xDgKQ8rf_Lz4UBlnMoOuMJs8FRMRhUD2MPL4PpoO5BdRBaibMtqqcnd/pub?gid=2111758870&single=true&output=csv';

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"(.*)"$/, '$1'));
  
  return lines.slice(1).map(line => {
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
    
    const row = headers.reduce((obj, header, i) => {
      obj[header] = (values[i] || '').replace(/^"(.*)"$/, '$1');
      return obj;
    }, {});

    // Map CSV headers to component expected keys
    return {
      ...row,
      Name: row['Participant'] || row['Name'],
      Score: row['Total Score'] || row['Score'],
      Rank: row['Rank']
    };
  }).filter(item => item.Name && item.Name !== '#N/A');
}

export function useLeaderboardData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch(LEADERBOARD_CSV_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.text();
      })
      .then(text => {
        setData(parseCSV(text));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load leaderboard.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, lastUpdated, refresh: fetchData };
}
