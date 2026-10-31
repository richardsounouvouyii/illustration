import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Plus, Loader2 } from 'lucide-react';
import { searchRealisticImages, CURATED_REALISTIC_PHOTOS } from '../../services/imageSearch';
import type { RealisticImageResult } from '../../services/imageSearch';
import type { LibraryAsset } from '../../types/asset';

interface OnlinePhotoSearchProps {
  onAddAsset: (asset: LibraryAsset) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Toutes les photos' },
  { id: 'ecole', label: 'École & Éducation' },
  { id: 'personnages', label: 'Personnes & Portraits' },
  { id: 'sports', label: 'Sports & Action' },
  { id: 'transports', label: 'Transports & Véhicules' },
  { id: 'decors', label: 'Nature & Paysages' },
  { id: 'technologie', label: 'Technologie & Bureau' }
];

export const OnlinePhotoSearch: React.FC<OnlinePhotoSearchProps> = ({ onAddAsset }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState<RealisticImageResult[]>(CURATED_REALISTIC_PHOTOS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchRealisticImages(query, selectedCategory);
        if (!isCancelled) {
          setImages(results);
        }
      } catch (err) {
        console.error('Error fetching realistic images:', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query, selectedCategory]);

  const handleSelectImage = (img: RealisticImageResult) => {
    // Transform into LibraryAsset
    const asset: LibraryAsset = {
      id: img.id,
      title: img.title,
      category: 'decors',
      style: 'photo_detouree',
      tags: [img.category, 'photo', 'réaliste'],
      format: 'png',
      url: img.url,
      defaultWidth: 280,
      defaultHeight: 190,
      isRecolorable: false
    };

    onAddAsset(asset);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {/* Explication réaliste */}
      <div
        style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: '0.78rem',
          color: 'var(--text-main)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'flex-start'
        }}
      >
        <Sparkles size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
        <span>
          <strong>Banque photos HD curatée :</strong> recherche locale dans une sélection Unsplash. Cliquez pour l’insérer sur le plan de travail.
        </span>
      </div>

      {/* Barre de recherche */}
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
          placeholder="Rechercher des photos (ex: élève, bureau, sport)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* Catégories de photos */}
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

      {/* Liste des résultats */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Loader2 size={18} className="animate-spin" /> Recherche de photos HD...
        </div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
          Aucune photo trouvée pour cette recherche. Essayez un autre mot-clé.
        </div>
      ) : (
        <div className="asset-grid">
          {images.map((img) => (
            <div
              key={img.id}
              className="asset-card"
              onClick={() => handleSelectImage(img)}
              title="Cliquer pour ajouter au canvas"
            >
              <div className="asset-preview" style={{ height: '95px' }}>
                <img
                  src={img.thumbUrl}
                  alt={img.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="asset-title" style={{ fontSize: '0.78rem' }}>
                {img.title}
              </div>
              <div
                style={{
                  marginTop: '0.25rem',
                  fontSize: '0.68rem',
                  color: 'var(--text-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Plus size={11} /> Ajouter photo
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
