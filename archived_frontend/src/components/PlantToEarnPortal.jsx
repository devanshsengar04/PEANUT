// Web3 Game Mockup
import React, { useState } from 'react';

export default function PlantToEarnPortal({ districtInfo }) {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [points, setPoints] = useState(0);

  if (!districtInfo || districtInfo.unknown) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p className="text-muted">Select a valid district on the map to find active campaigns.</p>
      </div>
    );
  }

  const handleUploadClick = () => {
    setUploadStatus('uploading');
    
    // Simulate API/Contract upload time
    setTimeout(() => {
       setUploadStatus('success');
       setPoints(prev => prev + 50);
       
       // Reset after 3 seconds
       setTimeout(() => {
          setUploadStatus('idle');
       }, 3000);
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
         <h2 style={{ color: 'var(--color-accent)' }}>Plant-to-Earn</h2>
         <p className="text-muted">Combat the {(districtInfo.deficit_score * 100).toFixed(1)}% deficit in {districtInfo.district} and earn rewards!</p>
      </div>

      <div style={{ background: 'linear-gradient(45deg, var(--color-surface), #3f3f46)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--color-accent)' }}>
         <p className="text-muted" style={{ margin: 0 }}>Your Balance</p>
         <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           🪙 {points}
         </h2>
         <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>100 Points = 1 Reward Coupon</p>
      </div>

      <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
         <div style={{ background: 'var(--color-base)', padding: '1rem', borderRadius: '50%', fontSize: '2rem' }}>
            📸
         </div>
         
         <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Verify Planting</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>Upload a geo-tagged photo of your recently planted tree in this district to earn 50 points.</p>
         </div>

         {uploadStatus === 'idle' && (
           <button className="btn btn-primary" onClick={handleUploadClick} style={{ width: '100%', marginTop: '1rem' }}>
             ☁️ Upload Image Proof
           </button>
         )}

         {uploadStatus === 'uploading' && (
           <button className="btn" disabled style={{ width: '100%', marginTop: '1rem', opacity: 0.7 }}>
             <div className="animate-fade-in" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ width: '16px', height: '16px', border: '2px solid var(--color-text)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Verifying Geo-tag...
             </div>
           </button>
         )}

         {uploadStatus === 'success' && (
           <div className="animate-fade-in" style={{ width: '100%', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
             ✅ +50 Points Awarded!
           </div>
         )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
