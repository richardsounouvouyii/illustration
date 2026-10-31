import React, { useState, useRef, useEffect } from 'react';
import { Wand2, UploadCloud, RefreshCw, Plus, Sliders, Sparkles } from 'lucide-react';
import type { LibraryAsset } from '../../types/asset';

interface AiStyleTransformerProps {
  onAddAsset: (asset: LibraryAsset) => void;
}

export type AiEffectStyle = 
  | 'japanese_editorial' 
  | 'caricature_comic' 
  | 'cartoon_disney' 
  | 'manga_shonen' 
  | 'pencil_sketch' 
  | 'pop_art';

interface StyleConfig {
  id: AiEffectStyle;
  label: string;
  badge: string;
  description: string;
  edgeThreshold: number;
  edgeWeight: number;
  colorSteps: number;
  saturation: number;
  contrast: number;
}

const AI_STYLES: StyleConfig[] = [
  {
    id: 'japanese_editorial',
    label: 'Style Manuel Japonais / Éditorial',
    badge: '🇯🇵 Éditorial',
    description: 'Contours noirs précis, aplats de couleurs pastels douces, style manuels et guides pratiques.',
    edgeThreshold: 35,
    edgeWeight: 1.2,
    colorSteps: 8,
    saturation: 0.85,
    contrast: 1.15
  },
  {
    id: 'caricature_comic',
    label: 'Caricature BD Expressive',
    badge: '🎨 Caricature',
    description: 'Lignes d\'encrage épaisses et dynamiques, contraste élevé et couleurs vives style bande dessinée.',
    edgeThreshold: 28,
    edgeWeight: 2.0,
    colorSteps: 5,
    saturation: 1.4,
    contrast: 1.35
  },
  {
    id: 'cartoon_disney',
    label: 'Cartoon 2D Cel-Shading',
    badge: '🪄 Cartoon',
    description: 'Lissage moderne, ombres franches en aplat et rendu dessin animé coloré.',
    edgeThreshold: 40,
    edgeWeight: 1.4,
    colorSteps: 6,
    saturation: 1.25,
    contrast: 1.2
  },
  {
    id: 'manga_shonen',
    label: 'Manga & Anime (Noir & Blanc / Trames)',
    badge: '📖 Manga N&B',
    description: 'Encre noire authentique, hachures et trames noir et blanc pour documents type manga.',
    edgeThreshold: 32,
    edgeWeight: 1.8,
    colorSteps: 3,
    saturation: 0,
    contrast: 1.6
  },
  {
    id: 'pencil_sketch',
    label: 'Croquis Crayon / Esquisse Artistique',
    badge: '✏️ Crayon',
    description: 'Hachures graphite douces, estompage et sensation de dessin fait main au crayon.',
    edgeThreshold: 25,
    edgeWeight: 1.0,
    colorSteps: 12,
    saturation: 0.1,
    contrast: 1.1
  },
  {
    id: 'pop_art',
    label: 'Pop Art & Aplat Graphique',
    badge: '🎭 Pop Art',
    description: 'Sérigraphie aux tons saturés intenses et contours percutants.',
    edgeThreshold: 30,
    edgeWeight: 2.2,
    colorSteps: 4,
    saturation: 1.7,
    contrast: 1.4
  }
];

// Photos démos intégrées pour tester instantanément
const SAMPLE_PHOTOS = [
  {
    id: 'p1',
    name: 'Portrait Enseignant',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p2',
    name: 'Jeune Homme',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'p3',
    name: 'Élève Rentrée',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  }
];

export const AiStyleTransformer: React.FC<AiStyleTransformerProps> = ({ onAddAsset }) => {
  const [selectedStyleId, setSelectedStyleId] = useState<AiEffectStyle>('japanese_editorial');
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(SAMPLE_PHOTOS[0].url);
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'processed' | 'original'>('processed');

  // Sliders ajustables
  const [lineIntensity, setLineIntensity] = useState(100); // 50 to 200%
  const [colorSimplification, setColorSimplification] = useState(100); // 50 to 200%

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedConfig = AI_STYLES.find((s) => s.id === selectedStyleId) || AI_STYLES[0];

  // Algorithme de transformation artistique en dessin (Sobel edge + color quantizing + tone curve)
  useEffect(() => {
    if (!currentImageSrc) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const maxDim = 500;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // 1. Convertir en niveaux de gris pour l'extraction de contours
      const gray = new Float32Array(width * height);
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      // 2. Détection de contours Sobel pour le trait de dessin (Line art)
      const edges = new Uint8Array(width * height);
      const threshold = (selectedConfig.edgeThreshold * 100) / lineIntensity;
      const edgeWeight = selectedConfig.edgeWeight * (lineIntensity / 100);

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = y * width + x;
          const gx =
            -gray[idx - width - 1] +
            gray[idx - width + 1] -
            2 * gray[idx - 1] +
            2 * gray[idx + 1] -
            gray[idx + width - 1] +
            gray[idx + width + 1];

          const gy =
            -gray[idx - width - 1] -
            2 * gray[idx - width] -
            gray[idx - width + 1] +
            gray[idx + width - 1] +
            2 * gray[idx + width] +
            gray[idx + width + 1];

          const mag = Math.sqrt(gx * gx + gy * gy);
          edges[idx] = mag > threshold ? Math.min(255, mag * edgeWeight) : 0;
        }
      }

      // 3. Quantification des couleurs (Aplats cartoon / cel shading)
      const steps = Math.max(2, Math.round((selectedConfig.colorSteps * 100) / colorSimplification));
      const stepSize = 255 / steps;
      const sat = selectedConfig.saturation;
      const cont = selectedConfig.contrast;

      for (let i = 0; i < data.length; i += 4) {
        const pixIdx = i / 4;
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Contraste
        r = ((r / 255 - 0.5) * cont + 0.5) * 255;
        g = ((g / 255 - 0.5) * cont + 0.5) * 255;
        b = ((b / 255 - 0.5) * cont + 0.5) * 255;

        // Saturation
        if (sat !== 1) {
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          r = lum + (r - lum) * sat;
          g = lum + (g - lum) * sat;
          b = lum + (b - lum) * sat;
        }

        // Quantification (effet aplat de peinture / dessin animé)
        r = Math.floor(r / stepSize) * stepSize;
        g = Math.floor(g / stepSize) * stepSize;
        b = Math.floor(b / stepSize) * stepSize;

        // Incrustation du trait noir (Ink line)
        const edge = edges[pixIdx];
        if (edge > 0) {
          const ink = edge / 255;
          r = r * (1 - ink);
          g = g * (1 - ink);
          b = b * (1 - ink);
        }

        // Effet spécifique Manga N&B : tramage simple
        if (selectedStyleId === 'manga_shonen') {
          const l = 0.299 * r + 0.587 * g + 0.114 * b;
          const x = pixIdx % width;
          const y = Math.floor(pixIdx / width);
          const dotPattern = (x % 4 === 0 && y % 4 === 0) ? 40 : 0;
          const val = l < 100 ? 20 : l < 180 ? 140 + dotPattern : 255;
          r = g = b = val;
        }

        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedDataUrl(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };

    img.onerror = () => {
      setIsProcessing(false);
    };
  }, [currentImageSrc, selectedStyleId, lineIntensity, colorSimplification]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCurrentImageSrc(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInsertToCanvas = () => {
    if (!processedDataUrl) return;

    const asset: LibraryAsset = {
      id: 'ai_art_' + Date.now(),
      title: `Dessin ${selectedConfig.label}`,
      category: 'personnages',
      style: 'editorial_manuel',
      tags: ['ia', 'dessin', 'caricature', selectedConfig.id],
      format: 'png',
      url: processedDataUrl,
      defaultWidth: 240,
      defaultHeight: 240,
      isRecolorable: false
    };

    onAddAsset(asset);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Titre & Bannière */}
      <div
        style={{
          padding: '0.85rem',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(79, 70, 229, 0.25)',
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-start'
        }}
      >
        <Wand2 size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
            Filtre local : photo → dessin / caricature
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Traitement 100 % dans le navigateur (pas d’API IA). Importez une photo et choisissez un style pour l’illustration pédagogique.
          </div>
        </div>
      </div>

      {/* Menu SELECT demandé par l'utilisateur */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Sparkles size={14} style={{ color: 'var(--primary)' }} />
          Sélectionnez le type de dessin souhaité :
        </label>
        <select
          value={selectedStyleId}
          onChange={(e) => setSelectedStyleId(e.target.value as AiEffectStyle)}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '2px solid var(--primary)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 2px 6px rgba(79, 70, 229, 0.1)'
          }}
        >
          {AI_STYLES.map((st) => (
            <option key={st.id} value={st.id}>
              {st.badge} — {st.label}
            </option>
          ))}
        </select>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontStyle: 'italic', paddingLeft: '0.2rem' }}>
          {selectedConfig.description}
        </div>
      </div>

      {/* Zone d'import de photo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-outline"
          style={{
            width: '100%',
            padding: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.82rem',
            borderColor: 'var(--border)',
            borderStyle: 'dashed'
          }}
        >
          <UploadCloud size={16} style={{ color: 'var(--primary)' }} />
          Importer votre photo (portrait, visage, silhouette)
        </button>

        {/* Ou tester avec des exemples rapides */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>Exemples rapides :</span>
          {SAMPLE_PHOTOS.map((sp) => (
            <button
              key={sp.id}
              onClick={() => setCurrentImageSrc(sp.url)}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                backgroundColor: currentImageSrc === sp.url ? 'var(--primary-light)' : 'transparent',
                color: currentImageSrc === sp.url ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.68rem',
                cursor: 'pointer'
              }}
            >
              {sp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zone de prévisualisation Avant / Après */}
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface)',
          padding: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Aperçu : {selectedConfig.badge}
          </div>
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            <button
              onClick={() => setViewMode('processed')}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'processed' ? 'var(--primary)' : 'var(--bg-subtle)',
                color: viewMode === 'processed' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              Dessin
            </button>
            <button
              onClick={() => setViewMode('original')}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'original' ? 'var(--primary)' : 'var(--bg-subtle)',
                color: viewMode === 'original' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              Photo originale
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div
          style={{
            width: '100%',
            height: '200px',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {isProcessing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <RefreshCw size={16} className="animate-spin" /> Transformation en cours...
            </div>
          ) : viewMode === 'processed' && processedDataUrl ? (
            <img
              src={processedDataUrl}
              alt="Résultat dessin"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          ) : (
            <img
              src={currentImageSrc}
              alt="Photo originale"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Bouton d'insertion principal */}
        <button
          onClick={handleInsertToCanvas}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700
          }}
          disabled={!processedDataUrl || isProcessing}
        >
          <Plus size={16} />
          Insérer ce dessin sur le plan de travail
        </button>
      </div>

      {/* Réglages fins */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.6rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Sliders size={12} /> Ajustements du trait & couleurs :
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>Épaisseur du trait :</span>
            <span>{lineIntensity}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="180"
            value={lineIntensity}
            onChange={(e) => setLineIntensity(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>Simplification des aplats :</span>
            <span>{colorSimplification}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="160"
            value={colorSimplification}
            onChange={(e) => setColorSimplification(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
