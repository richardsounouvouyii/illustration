import React from 'react';
import type { LibraryAsset } from '../../types/asset';
import { Plus } from 'lucide-react';

interface AssetCardProps {
  asset: LibraryAsset;
  onSelect: (asset: LibraryAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onSelect }) => {
  return (
    <div className="asset-card" onClick={() => onSelect(asset)}>
      <div className="asset-preview">
        <img src={asset.url} alt={asset.title} loading="lazy" />
      </div>
      <div className="asset-title">{asset.title}</div>
      <div
        style={{
          marginTop: '0.35rem',
          fontSize: '0.7rem',
          color: 'var(--text-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
      >
        <Plus size={12} /> Cliquer pour insérer
      </div>
    </div>
  );
};
