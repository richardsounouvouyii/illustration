import React, { useState, useMemo } from 'react';
import { SAMPLE_ASSETS } from '../../data/sampleAssets';
import type { LibraryAsset, AssetCategory, AssetStyle } from '../../types/asset';
import { AssetCard } from './AssetCard';
import { Search, Filter } from 'lucide-react';

interface AssetLibraryProps {
  onAddAsset: (asset: LibraryAsset) => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'technologie', label: 'Technologie & 3D' },
  { id: 'sports', label: 'Sports & Trophées' },
  { id: 'ecole', label: 'École & Diplômes' },
  { id: 'personnages', label: 'Personnages' },
  { id: 'transports', label: 'Transports' },
  { id: 'decors', label: 'Décors & Nature' },
  { id: 'accessoires', label: 'Accessoires' }
];

const STYLES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tous styles' },
  { id: 'editorial_manuel', label: 'Manuels & Éditorial' },
  { id: 'realiste_3d', label: 'Rendu 3D' },
  { id: 'realiste_vectoriel', label: 'Vectoriel Réaliste' },
  { id: 'moderne', label: 'Moderne' },
  { id: 'photo_detouree', label: 'Photo Détourée' }
];

export const AssetLibrary: React.FC<AssetLibraryProps> = ({ onAddAsset }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');

  const filteredAssets = useMemo(() => {
    return SAMPLE_ASSETS.filter((asset) => {
      const matchSearch =
        !search ||
        asset.title.toLowerCase().includes(search.toLowerCase()) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' || asset.category === (selectedCategory as AssetCategory);

      const matchStyle =
        selectedStyle === 'all' || asset.style === (selectedStyle as AssetStyle);

      return matchSearch && matchCategory && matchStyle;
    });
  }, [search, selectedCategory, selectedStyle]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-subtle)'
          }}
        />
        <input
          type="text"
          placeholder="Rechercher dessins, personnages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.55rem 0.6rem 0.55rem 2.1rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            outline: 'none'
          }}
        />
      </div>

      {/* Category Badges */}
      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.3rem 0.6rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: selectedCategory === cat.id ? 'var(--primary)' : 'var(--border)',
              backgroundColor: selectedCategory === cat.id ? 'var(--primary-light)' : 'transparent',
              color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Style Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Filter size={14} style={{ color: 'var(--text-subtle)' }} />
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          style={{
            flex: 1,
            padding: '0.35rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            outline: 'none'
          }}
        >
          {STYLES.map((st) => (
            <option key={st.id} value={st.id}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      {/* Asset Grid */}
      <div className="asset-grid">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onSelect={onAddAsset} />
          ))
        ) : (
          <div
            style={{
              gridColumn: 'span 2',
              textAlign: 'center',
              padding: '2rem 1rem',
              color: 'var(--text-subtle)',
              fontSize: '0.85rem'
            }}
          >
            Aucun dessin ne correspond à cette recherche.
          </div>
        )}
      </div>
    </div>
  );
};
