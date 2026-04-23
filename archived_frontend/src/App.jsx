import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import MapDashboard from './components/MapDashboard';
import AnalyticsPanel from './components/AnalyticsPanel';
import PlantToEarnPortal from './components/PlantToEarnPortal';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [districtsData, setDistrictsData] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    Papa.parse('./FinalFinalAnalysis.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const dMap = {};
        results.data.forEach(row => {
          if (row.district && row.district.trim() !== '') {
            dMap[row.district.toLowerCase().trim()] = row;
          }
        });
        setDistrictsData(dMap);
        setDataLoaded(true);
      }
    });
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar Analytics */}
      <aside className="glass-panel panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{fontSize: '2rem'}}>🍃</div>
          <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>GreenAI</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', background: 'var(--color-surface)', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : ''}`}
            style={{flex: 1, padding: '0.5rem', border: 'none', background: activeTab === 'dashboard' ? '' : 'transparent'}}
            onClick={() => setActiveTab('dashboard')}
          >
            🗺️ Map
          </button>
          <button 
            className={`btn ${activeTab === 'earn' ? 'btn-primary' : ''}`}
            style={{flex: 1, padding: '0.5rem', border: 'none', background: activeTab === 'earn' ? '' : 'transparent'}}
            onClick={() => setActiveTab('earn')}
          >
            🪙 Impact Earn
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <AnalyticsPanel districtInfo={selectedDistrict} allData={districtsData} />
        )}
        {activeTab === 'earn' && (
          <PlantToEarnPortal districtInfo={selectedDistrict} />
        )}
      </aside>

      {/* Main Map View */}
      <main className="glass-panel" style={{ padding: '4px', overflow: 'hidden' }}>
        {dataLoaded ? (
          <MapDashboard 
            districtsData={districtsData} 
            onSelectDistrict={(districtData) => setSelectedDistrict(districtData)} 
          />
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Loading GIS Data...</h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
