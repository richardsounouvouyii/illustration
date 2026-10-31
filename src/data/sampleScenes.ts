import type { SceneTemplate } from '../types/scene';

export const SAMPLE_SCENES: SceneTemplate[] = [
  {
    id: 'scene_modern_classroom',
    title: 'Espace d’Étude & Réussite',
    description: 'Composition réaliste d’une classe moderne avec enseignant, étudiant et tableau vitré.',
    category: 'ecole',
    defaultFormat: 'a4_landscape',
    backgroundColor: '#F8FAFC',
    elements: [
      {
        assetId: 'decor_glass_board',
        left: 320,
        top: 60,
        scaleX: 1.4,
        scaleY: 1.4,
        zIndex: 1
      },
      {
        assetId: 'char_teacher_realistic',
        left: 140,
        top: 200,
        scaleX: 1.2,
        scaleY: 1.2,
        zIndex: 2
      },
      {
        assetId: 'char_student_realistic',
        left: 700,
        top: 210,
        scaleX: 1.15,
        scaleY: 1.15,
        zIndex: 2
      },
      {
        assetId: '3d_trophy_gold',
        left: 450,
        top: 310,
        scaleX: 0.9,
        scaleY: 0.9,
        zIndex: 3
      },
      {
        assetId: 'bubble_speech_premium',
        left: 230,
        top: 140,
        scaleX: 0.9,
        scaleY: 0.9,
        zIndex: 4
      }
    ],
    texts: [
      {
        text: 'Bravo pour vos excellents résultats !',
        left: 250,
        top: 170,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        fill: '#1E293B',
        isBubble: true
      },
      {
        text: 'Session d’Excellence Académique',
        left: 340,
        top: 25,
        fontSize: 22,
        fontFamily: 'Inter, sans-serif',
        fill: '#0F172A'
      }
    ]
  },
  {
    id: 'scene_digital_mobility',
    title: 'Mobilité Urbaine & Technologie',
    description: 'Scène contemporaine avec berline moderne, vélo de route et nature soignée.',
    category: 'transports',
    defaultFormat: 'a4_landscape',
    backgroundColor: '#F1F5F9',
    elements: [
      {
        assetId: 'decor_realistic_tree',
        left: 720,
        top: 130,
        scaleX: 1.2,
        scaleY: 1.2,
        zIndex: 1
      },
      {
        assetId: 'vehicle_car_realistic',
        left: 100,
        top: 300,
        scaleX: 1.15,
        scaleY: 1.15,
        zIndex: 2
      },
      {
        assetId: 'vehicle_bicycle_realistic',
        left: 480,
        top: 290,
        scaleX: 1.1,
        scaleY: 1.1,
        zIndex: 3
      },
      {
        assetId: '3d_laptop_modern',
        left: 740,
        top: 320,
        scaleX: 0.85,
        scaleY: 0.85,
        zIndex: 4
      }
    ],
    texts: [
      {
        text: 'Ville Durable et Connectée',
        left: 360,
        top: 40,
        fontSize: 24,
        fontFamily: 'Inter, sans-serif',
        fill: '#0369A1'
      }
    ]
  },
  {
    id: 'scene_graduation_celebration',
    title: 'Cérémonie de Remise des Diplômes',
    description: 'Célébration étudiante avec toque 3D, trophée et matériel moderne.',
    category: 'ecole',
    defaultFormat: 'a4_landscape',
    backgroundColor: '#FAF5FF',
    elements: [
      {
        assetId: '3d_graduation_cap',
        left: 200,
        top: 140,
        scaleX: 1.1,
        scaleY: 1.1,
        zIndex: 1
      },
      {
        assetId: 'char_student_realistic',
        left: 440,
        top: 190,
        scaleX: 1.25,
        scaleY: 1.25,
        zIndex: 2
      },
      {
        assetId: '3d_trophy_gold',
        left: 680,
        top: 180,
        scaleX: 1.1,
        scaleY: 1.1,
        zIndex: 2
      },
      {
        assetId: '3d_backpack_modern',
        left: 330,
        top: 310,
        scaleX: 0.9,
        scaleY: 0.9,
        zIndex: 3
      }
    ],
    texts: [
      {
        text: 'Promotion & Excellence 2026',
        left: 350,
        top: 40,
        fontSize: 26,
        fontFamily: 'Inter, sans-serif',
        fill: '#6B21A8'
      }
    ]
  }
];
