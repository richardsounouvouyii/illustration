import React from 'react';
import { SAMPLE_SCENES } from '../../data/sampleScenes';
import type { SceneTemplate } from '../../types/scene';
import { LayoutTemplate, Sparkles } from 'lucide-react';

interface SceneTemplatesProps {
  onLoadScene: (scene: SceneTemplate) => void;
}

export const SceneTemplates: React.FC<SceneTemplatesProps> = ({ onLoadScene }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
        Chargez une scène pilote prête à l'emploi avec décors, personnages et textes préassemblés.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {SAMPLE_SCENES.map((scene) => (
          <div
            key={scene.id}
            onClick={() => onLoadScene(scene)}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.backgroundColor = 'var(--primary-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.88rem' }}>
                <LayoutTemplate size={16} color="var(--primary)" />
                {scene.title}
              </div>
              <span
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                  fontWeight: 700
                }}
              >
                {scene.category}
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {scene.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.2rem' }}>
              <Sparkles size={12} /> Appliquer le modèle
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
