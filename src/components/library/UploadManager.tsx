import React, { useState, useRef } from 'react';
import { UploadCloud, Trash2, Plus } from 'lucide-react';
import type { LibraryAsset } from '../../types/asset';

interface UploadManagerProps {
  onAddAsset: (asset: LibraryAsset) => void;
}

interface UploadedItem {
  id: string;
  name: string;
  dataUrl: string;
  width: number;
  height: number;
  sizeKb: number;
}

const STORAGE_KEY = 'studio_user_uploads';
const MAX_SIDE = 1600;
const MAX_ITEMS = 30;

async function compressImage(file: File, dataUrl: string): Promise<{ dataUrl: string; width: number; height: number }> {
  // Keep SVG as-is (vector)
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ dataUrl, width: img.width || 300, height: img.height || 300 });
      img.onerror = () => reject(new Error('SVG invalide'));
      img.src = dataUrl;
    });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width || 300;
      let height = img.height || 300;
      const max = Math.max(width, height);

      if (max > MAX_SIDE) {
        const ratio = MAX_SIDE / max;
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas indisponible'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const keepPng = file.type === 'image/png' || file.type === 'image/webp';
      const out = keepPng
        ? canvas.toDataURL('image/png')
        : canvas.toDataURL('image/jpeg', 0.82);

      resolve({ dataUrl: out, width, height });
    };
    img.onerror = () => reject(new Error('Image invalide'));
    img.src = dataUrl;
  });
}

export const UploadManager: React.FC<UploadManagerProps> = ({ onAddAsset }) => {
  const [uploads, setUploads] = useState<UploadedItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const persistUploads = (next: UploadedItem[]): boolean => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setError(null);
      return true;
    } catch {
      setError('Stockage local plein. Supprimez d’anciens imports ou utilisez des images plus légères.');
      return false;
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Seuls les fichiers images (PNG, JPG, WebP, SVG) sont supportés.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawDataUrl = e.target?.result as string;
        if (!rawDataUrl) return;

        try {
          const compressed = await compressImage(file, rawDataUrl);
          const newItem: UploadedItem = {
            id: 'upload_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            name: file.name.replace(/\.[^/.]+$/, ''),
            dataUrl: compressed.dataUrl,
            width: compressed.width,
            height: compressed.height,
            sizeKb: Math.round((compressed.dataUrl.length * 0.75) / 1024)
          };

          setUploads((prev) => {
            const updated = [newItem, ...prev].slice(0, MAX_ITEMS);
            const ok = persistUploads(updated);
            return ok ? updated : prev;
          });

          insertToCanvas(newItem);
        } catch {
          setError(`Impossible de traiter « ${file.name} ».`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const insertToCanvas = (item: UploadedItem) => {
    const asset: LibraryAsset = {
      id: item.id,
      title: item.name,
      category: 'objets',
      style: 'photo_detouree',
      tags: ['import', 'personnel', 'réaliste'],
      format: 'png',
      url: item.dataUrl,
      defaultWidth: Math.min(item.width, 300),
      defaultHeight: Math.min(item.height, 300),
      isRecolorable: false
    };

    onAddAsset(asset);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setUploads((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      persistUploads(updated);
      return updated;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--border)',
          backgroundColor: isDragging ? 'var(--primary-light)' : 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem 1rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <UploadCloud size={28} style={{ color: 'var(--primary)' }} />
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>
            Importer des images réalistes
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            PNG, JPG, SVG, WebP — redimensionnées automatiquement (max {MAX_SIDE}px)
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.65rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--danger, #EF4444)',
            fontSize: '0.78rem'
          }}
        >
          {error}
        </div>
      )}

      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Mes images ({uploads.length}) :
        </div>

        {uploads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
            Aucune image importée pour l’instant. Importez vos dessins ou photos pour les utiliser immédiatement.
          </div>
        ) : (
          <div className="asset-grid">
            {uploads.map((item) => (
              <div
                key={item.id}
                className="asset-card"
                onClick={() => insertToCanvas(item)}
                title="Cliquer pour insérer sur le plan de travail"
                style={{ position: 'relative' }}
              >
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  title="Supprimer"
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <Trash2 size={11} />
                </button>
                <div className="asset-preview" style={{ height: '90px' }}>
                  <img src={item.dataUrl} alt={item.name} />
                </div>
                <div className="asset-title" style={{ fontSize: '0.75rem' }}>
                  {item.name}
                </div>
                <div
                  style={{
                    marginTop: '0.2rem',
                    fontSize: '0.68rem',
                    color: 'var(--text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Plus size={10} /> Insérer · {item.sizeKb} Ko
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
