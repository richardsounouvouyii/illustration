import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { FORMAT_PRESETS } from '../../types/project';
import { exportService } from '../../services/exportService';
import { X, Image, FileText, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  getExportDataURL: (multiplier?: number) => string | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, getExportDataURL }) => {
  const { project, format } = useEditor();
  const [exportType, setExportType] = useState<'png' | 'pdf'>('png');
  const [quality, setQuality] = useState<1 | 2 | 3>(2);
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const slugify = (name: string) =>
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'illustration';

  const handleExport = () => {
    setError(null);
    const dataUrl = getExportDataURL(quality);
    if (!dataUrl) {
      setError('Impossible d’exporter : le plan de travail n’est pas prêt.');
      return;
    }

    setIsExporting(true);
    const sanitizedTitle = slugify(project.metadata.name);

    setTimeout(() => {
      try {
        if (exportType === 'png') {
          exportService.exportAsPNG(dataUrl, `${sanitizedTitle}.png`);
        } else {
          exportService.exportAsPDF(dataUrl, FORMAT_PRESETS[format], `${sanitizedTitle}.pdf`);
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsExporting(false);
          onClose();
        }, 1200);
      } catch (err) {
        console.error('Export error:', err);
        setError('Une erreur est survenue pendant l’export.');
        setIsExporting(false);
      }
    }, 200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Exporter votre composition</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Sélectionnez le format d'exportation souhaité pour <strong>{project.metadata.name}</strong> :
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div
              onClick={() => setExportType('png')}
              style={{
                padding: '1rem',
                border: '2px solid',
                borderColor: exportType === 'png' ? 'var(--primary)' : 'var(--border)',
                backgroundColor: exportType === 'png' ? 'var(--primary-light)' : 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'center'
              }}
            >
              <Image size={28} color={exportType === 'png' ? 'var(--primary)' : 'var(--text-muted)'} />
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Image PNG</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Haute qualité, idéal pour le web et les réseaux
              </div>
            </div>

            <div
              onClick={() => setExportType('pdf')}
              style={{
                padding: '1rem',
                border: '2px solid',
                borderColor: exportType === 'pdf' ? 'var(--primary)' : 'var(--border)',
                backgroundColor: exportType === 'pdf' ? 'var(--primary-light)' : 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'center'
              }}
            >
              <FileText size={28} color={exportType === 'pdf' ? 'var(--primary)' : 'var(--text-muted)'} />
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Document PDF</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Format d'impression (mm) pour support papier A4/A5
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Qualité / résolution
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {([1, 2, 3] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`btn ${quality === q ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1, padding: '0.4rem' }}
                  onClick={() => setQuality(q)}
                >
                  {q}×
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
            Format actif : {FORMAT_PRESETS[format].label}
          </div>

          {error && (
            <div style={{ fontSize: '0.8rem', color: 'var(--danger, #EF4444)', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose} disabled={isExporting}>
            Annuler
          </button>
          <button className="btn btn-primary" onClick={handleExport} disabled={isExporting}>
            {success ? (
              <>
                <CheckCircle2 size={16} /> Exporté avec succès !
              </>
            ) : isExporting ? (
              'Génération en cours...'
            ) : (
              `Télécharger en .${exportType.toUpperCase()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
