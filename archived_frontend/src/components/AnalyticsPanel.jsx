import React from 'react';

export default function AnalyticsPanel({ districtInfo, allData }) {
  if (!districtInfo) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p className="text-muted">Select a district on the map to begin analysis.</p>
      </div>
    );
  }

  if (districtInfo.unknown) {
    return (
       <div className="animate-fade-in">
        <h3 style={{ color: 'var(--color-primary)' }}>{districtInfo.district}</h3>
        <p className="text-muted">{districtInfo.state}</p>
        <div style={{ marginTop: '1.5rem', background: 'var(--glass-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <p>No climate data available for this district.</p>
        </div>
       </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.8rem' }}>{districtInfo.district}</h3>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>{districtInfo.state}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Deficit Score</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-danger)' }}>
            {(districtInfo.deficit_score * 100).toFixed(1)}%
          </p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Req. Cover (sq km)</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 700 }}>
            {districtInfo.greenery_deficit_sq_km.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Environmental Context</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text)', fontSize: '0.9rem' }}>
           <li style={{marginBottom: '0.3rem'}}>Mean Temp: <span className="highlight">{districtInfo.annual_mean_temp_c}°C</span></li>
           <li style={{marginBottom: '0.3rem'}}>Rainfall: <span className="highlight">{districtInfo.annual_mean_rainfall_mm}mm</span></li>
           <li style={{marginBottom: '0.3rem'}}>Soil Carbon: <span className="highlight">{districtInfo.soil_org_carbon_pct}%</span></li>
           <li>Eco Zone: <span className="text-muted">{districtInfo.agro_eco_zone_description}</span></li>
        </ul>
      </div>

      <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>AI Tree Recommendations</h4>
        <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Based on local soil and climate conditions</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
           <div style={{ background: 'var(--color-base)', padding: '0.5rem', borderRadius: '4px' }}>
              <strong style={{color: '#fff'}}>Forestry:</strong> {districtInfo.forestry_trees}
           </div>
           <div style={{ background: 'var(--color-base)', padding: '0.5rem', borderRadius: '4px' }}>
              <strong style={{color: '#fff'}}>Horticulture:</strong> {districtInfo.horticulture_plants}
           </div>
           <div style={{ background: 'var(--color-base)', padding: '0.5rem', borderRadius: '4px' }}>
              <strong style={{color: '#fff'}}>Sustainable Cover:</strong> {districtInfo.sustainable_cover}
           </div>
        </div>
      </div>
    </div>
  );
}
