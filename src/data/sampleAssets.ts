import type { LibraryAsset } from '../types/asset';

// SVG helpers encoded as data URIs
const svgToDataUrl = (svgString: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

export const SAMPLE_ASSETS: LibraryAsset[] = [
  // --- 0. ILLUSTRATIONS MANUELS & ÉDITORIAL (STYLE MANUEL / GUIDE PÉDAGOGIQUE) ---
  {
    id: 'editorial_boy_waving',
    title: 'Écolier saluant (casquette & t-shirt)',
    category: 'personnages',
    style: 'editorial_manuel',
    tags: ['garçon', 'école', 'saluer', 'enfant', 'bonjour', 'manuel', 'éditorial', 'jeunesse'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/boy_waving.jpg'
  },
  {
    id: 'editorial_woman_sighing',
    title: 'Femme soupirant / hésitante (facture & doute)',
    category: 'personnages',
    style: 'editorial_manuel',
    tags: ['femme', 'soupir', 'hésitation', 'facture', 'dépense', 'émotion', 'éditorial'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/woman_sighing.jpg'
  },
  {
    id: 'editorial_girl_anxious_money',
    title: 'Jeune fille anxieuse (budget argent)',
    category: 'personnages',
    style: 'editorial_manuel',
    tags: ['fille', 'anxiété', 'argent', 'peur', 'budget', 'éditorial', 'émotion'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/girl_anxious_money.jpg'
  },
  {
    id: 'editorial_woman_apron',
    title: 'Femme au tablier (linge & quotidien)',
    category: 'metiers',
    style: 'editorial_manuel',
    tags: ['femme', 'tablier', 'maison', 'travail', 'linge', 'cuisine', 'quotidien'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/woman_apron.jpg'
  },
  {
    id: 'editorial_teacher_explaining',
    title: 'Enseignante expliquant (livre ouvert)',
    category: 'ecole',
    style: 'editorial_manuel',
    tags: ['enseignante', 'professeur', 'livre', 'cours', 'explication', 'manuel', 'école'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/teacher_explaining.jpg'
  },
  {
    id: 'editorial_student_writing',
    title: 'Élève studieuse écrivant au pupitre',
    category: 'ecole',
    style: 'editorial_manuel',
    tags: ['élève', 'école', 'pupitre', 'écrire', 'cahier', 'classe', 'devoir'],
    format: 'jpg',
    defaultWidth: 200,
    defaultHeight: 200,
    isRecolorable: false,
    url: '/illustrations/student_writing.jpg'
  },
  {
    id: 'caricature_happy_man',
    title: 'Caricature Homme Expressif (sourire BD)',
    category: 'personnages',
    style: 'caricature',
    tags: ['caricature', 'homme', 'bd', 'humour', 'sourire', 'joie', 'émotion'],
    format: 'jpg',
    defaultWidth: 220,
    defaultHeight: 220,
    isRecolorable: false,
    url: '/illustrations/caricature_happy_man.jpg'
  },
  {
    id: 'caricature_student',
    title: 'Caricature Élève Studieux (livres & lunettes)',
    category: 'personnages',
    style: 'caricature',
    tags: ['caricature', 'élève', 'école', 'livres', 'lunettes', 'humour', 'bd'],
    format: 'jpg',
    defaultWidth: 220,
    defaultHeight: 220,
    isRecolorable: false,
    url: '/illustrations/caricature_student.jpg'
  },

  // --- 1. OBJETS & SYMBOLES 3D RÉALISTES ---
  {
    id: '3d_trophy_gold',
    title: 'Trophée doré 3D',
    category: 'sports',
    style: 'realiste_3d',
    tags: ['trophée', 'or', 'victoire', 'champion', '3d', 'coupe', 'récompense'],
    format: 'svg',
    defaultWidth: 150,
    defaultHeight: 180,
    isRecolorable: false,
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
        <defs>
          <linearGradient id="goldCup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFBEB" />
            <stop offset="25%" stop-color="#FCD34D" />
            <stop offset="50%" stop-color="#F59E0B" />
            <stop offset="75%" stop-color="#D97706" />
            <stop offset="100%" stop-color="#78350F" />
          </linearGradient>
          <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#FDE68A" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#B45309" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="baseMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="100" cy="225" rx="65" ry="12" fill="#000000" opacity="0.2" filter="blur(4px)" />

        <!-- Socle marbre / métal 3D -->
        <g filter="url(#shadow3d)">
          <!-- Base inférieure -->
          <rect x="50" y="195" width="100" height="22" rx="4" fill="url(#baseMetal)" />
          <rect x="52" y="196" width="96" height="3" fill="#64748B" opacity="0.6" />
          <rect x="60" y="180" width="80" height="18" rx="2" fill="url(#baseMetal)" />
          <!-- Plaque dorée gravée -->
          <rect x="68" y="184" width="64" height="10" rx="1" fill="url(#goldCup)" />
          <line x1="72" y1="189" x2="128" y2="189" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" />

          <!-- Tige centrale 3D -->
          <path d="M92 145 L108 145 L105 180 L95 180 Z" fill="url(#goldCup)" />
          <!-- Coupe principale -->
          <path d="M50 40 C50 120 75 145 100 145 C125 145 150 120 150 40 Z" fill="url(#goldCup)" />
          <ellipse cx="100" cy="40" rx="50" ry="12" fill="url(#goldCup)" />
          <ellipse cx="100" cy="40" rx="44" ry="9" fill="#B45309" />
          
          <!-- Éclat spéculaire réaliste -->
          <path d="M60 45 C60 100 75 125 90 135 C75 120 68 85 68 45 Z" fill="url(#goldShine)" />
          
          <!-- Poignée gauche 3D -->
          <path d="M52 50 C20 50 15 105 56 115 C54 105 32 95 32 60 C32 55 42 55 52 55 Z" fill="url(#goldCup)" />
          <!-- Poignée droite 3D -->
          <path d="M148 50 C180 50 185 105 144 115 C146 105 168 95 168 60 C168 55 158 55 148 55 Z" fill="url(#goldCup)" />
          
          <!-- Étoile victorieuse en relief sur la coupe -->
          <polygon points="100,70 105,82 118,83 108,92 111,105 100,98 89,105 92,92 82,83 95,82" fill="#FFFBEB" opacity="0.9" />
        </g>
      </svg>
    `)
  },
  {
    id: '3d_laptop_modern',
    title: 'Ordinateur portable 3D',
    category: 'technologie',
    style: 'realiste_3d',
    tags: ['ordinateur', 'pc', 'laptop', 'macbook', 'technologie', 'travail', '3d'],
    format: 'svg',
    defaultWidth: 200,
    defaultHeight: 150,
    isRecolorable: false,
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" width="240" height="180">
        <defs>
          <linearGradient id="lapScreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="60%" stop-color="#1D4ED8" />
            <stop offset="100%" stop-color="#1E1B4B" />
          </linearGradient>
          <linearGradient id="lapBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E2E8F0" />
            <stop offset="50%" stop-color="#CBD5E1" />
            <stop offset="100%" stop-color="#94A3B8" />
          </linearGradient>
        </defs>
        
        <!-- Ombre douce au sol -->
        <ellipse cx="120" cy="165" rx="95" ry="10" fill="#000000" opacity="0.2" filter="blur(6px)" />
        
        <!-- Écran ouvert incliné 3D -->
        <rect x="42" y="20" width="156" height="105" rx="8" fill="#1E293B" stroke="#CBD5E1" stroke-width="2" />
        <!-- Écran d'affichage lumineux -->
        <rect x="48" y="26" width="144" height="92" rx="4" fill="url(#lapScreen)" />
        <!-- Contenu graphique sur l'écran -->
        <circle cx="70" cy="55" r="14" fill="#60A5FA" opacity="0.7" />
        <rect x="92" y="45" width="80" height="6" rx="3" fill="#FFFFFF" opacity="0.8" />
        <rect x="92" y="58" width="60" height="5" rx="2.5" fill="#93C5FD" opacity="0.6" />
        <path d="M52 105 L90 85 L120 98 L165 75 L188 95 L188 114 L52 114 Z" fill="#2563EB" opacity="0.4" />
        <!-- Reflet de verre sur écran -->
        <polygon points="48,26 130,26 80,118 48,118" fill="#FFFFFF" opacity="0.08" />
        <!-- Caméra webcam -->
        <circle cx="120" cy="23" r="1.5" fill="#64748B" />

        <!-- Clavier & Base inférieure 3D -->
        <path d="M15 145 L42 125 L198 125 L225 145 C225 152 210 156 120 156 C30 156 15 152 15 145 Z" fill="url(#lapBody)" stroke="#94A3B8" stroke-width="1.5" />
        <!-- Trackpad tactile -->
        <rect x="100" y="140" width="40" height="12" rx="2" fill="#E2E8F0" stroke="#94A3B8" stroke-width="0.8" />
        <!-- Touches du clavier stylisées -->
        <polygon points="48,127 192,127 186,138 54,138" fill="#334155" opacity="0.85" />
        <line x1="56" y1="131" x2="184" y2="131" stroke="#475569" stroke-width="1" />
        <line x1="53" y1="135" x2="187" y2="135" stroke="#475569" stroke-width="1" />
      </svg>
    `)
  },
  {
    id: '3d_graduation_cap',
    title: 'Toque de diplômé 3D',
    category: 'ecole',
    style: 'realiste_3d',
    tags: ['diplôme', 'chapeau', 'toque', 'école', 'université', 'réussite', '3d'],
    format: 'svg',
    defaultWidth: 180,
    defaultHeight: 140,
    isRecolorable: false,
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160" width="220" height="160">
        <defs>
          <linearGradient id="capBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
          <linearGradient id="goldTassel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="50%" stop-color="#EAB308" />
            <stop offset="100%" stop-color="#CA8A04" />
          </linearGradient>
        </defs>

        <!-- Ombre portée -->
        <ellipse cx="110" cy="148" rx="85" ry="10" fill="#000000" opacity="0.2" filter="blur(5px)" />

        <!-- Calotte crâne sous le chapeau -->
        <path d="M70 70 C70 115 150 115 150 70 Z" fill="url(#capBlack)" />
        <ellipse cx="110" cy="105" rx="35" ry="12" fill="#0F172A" />

        <!-- Plateau losange 3D incliné -->
        <polygon points="110,25 205,62 110,95 15,62" fill="url(#capBlack)" stroke="#475569" stroke-width="1" />
        <!-- Épaisseur du plateau -->
        <polygon points="15,62 110,95 110,102 15,69" fill="#0F172A" />
        <polygon points="205,62 110,95 110,102 205,69" fill="#1E293B" />

        <!-- Bouton central doré -->
        <ellipse cx="110" cy="60" rx="6" ry="4" fill="url(#goldTassel)" />

        <!-- Cordon et gland doré suspendu -->
        <path d="M110 60 C135 60 170 70 175 95 L175 125" stroke="url(#goldTassel)" stroke-width="3" fill="none" stroke-linecap="round" />
        <!-- Gland (tassel) -->
        <polygon points="170,122 180,122 183,142 167,142" fill="url(#goldTassel)" />
        <ellipse cx="175" cy="122" rx="5" ry="2.5" fill="#FEF08A" />
      </svg>
    `)
  },
  {
    id: '3d_soccer_ball',
    title: 'Ballon de football 3D texturé',
    category: 'sports',
    style: 'realiste_3d',
    tags: ['ballon', 'football', 'sport', 'match', '3d'],
    format: 'svg',
    defaultWidth: 140,
    defaultHeight: 140,
    isRecolorable: false,
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
        <defs>
          <radialGradient id="ballShading" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="60%" stop-color="#F1F5F9" />
            <stop offset="85%" stop-color="#94A3B8" />
            <stop offset="100%" stop-color="#334155" />
          </radialGradient>
          <radialGradient id="patchShading" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0F172A" />
          </radialGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="80" cy="150" rx="55" ry="9" fill="#000000" opacity="0.3" filter="blur(4px)" />

        <!-- Sphère blanche avec ombrage sphérique réaliste -->
        <circle cx="80" cy="75" r="65" fill="url(#ballShading)" />

        <!-- Pentagone central courbé -->
        <polygon points="80,50 98,62 91,84 69,84 62,62" fill="url(#patchShading)" />
        
        <!-- Pentagones périphériques projetés en perspective sphérique -->
        <!-- Haut -->
        <polygon points="80,20 72,32 88,32" fill="url(#patchShading)" />
        <line x1="80" y1="32" x2="80" y2="50" stroke="#475569" stroke-width="2.5" stroke-linecap="round" />

        <!-- Haut droite -->
        <polygon points="125,45 138,55 128,70 114,60" fill="url(#patchShading)" />
        <line x1="98" y1="62" x2="114" y2="60" stroke="#475569" stroke-width="2.5" />

        <!-- Bas droite -->
        <polygon points="115,108 128,118 112,126 100,118" fill="url(#patchShading)" />
        <line x1="91" y1="84" x2="105" y2="105" stroke="#475569" stroke-width="2.5" />

        <!-- Bas gauche -->
        <polygon points="45,108 32,118 48,126 60,118" fill="url(#patchShading)" />
        <line x1="69" y1="84" x2="55" y2="105" stroke="#475569" stroke-width="2.5" />

        <!-- Haut gauche -->
        <polygon points="35,45 22,55 32,70 46,60" fill="url(#patchShading)" />
        <line x1="62" y1="62" x2="46" y2="60" stroke="#475569" stroke-width="2.5" />

        <!-- Lignes de couture réalistes -->
        <path d="M128 70 L128 95 L105 105" stroke="#475569" stroke-width="2" fill="none" />
        <path d="M32 70 L32 95 L55 105" stroke="#475569" stroke-width="2" fill="none" />
        <path d="M112 126 L80 140 L48 126" stroke="#475569" stroke-width="2" fill="none" />

        <!-- Éclat de lumière brillant sur le cuir -->
        <ellipse cx="58" cy="45" rx="20" ry="10" transform="rotate(-30 58 45)" fill="#FFFFFF" opacity="0.35" />
      </svg>
    `)
  },
  {
    id: '3d_backpack_modern',
    title: 'Sac à dos d’étudiant 3D',
    category: 'ecole',
    style: 'realiste_3d',
    tags: ['sac', 'cartable', 'école', 'étudiant', '3d'],
    format: 'svg',
    defaultWidth: 150,
    defaultHeight: 180,
    isRecolorable: true,
    recolorZones: [
      { id: 'bagPrimary', name: 'Couleur sac', defaultColor: '#2563EB' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 220" width="180" height="220">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="70%" stop-color="#1D4ED8" />
            <stop offset="100%" stop-color="#1E3A8A" />
          </linearGradient>
          <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="100%" stop-color="#2563EB" />
          </linearGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="90" cy="210" rx="65" ry="10" fill="#000000" opacity="0.25" filter="blur(5px)" />

        <!-- Poignée supérieure -->
        <path d="M65 40 C65 20 115 20 115 40" stroke="#0F172A" stroke-width="8" fill="none" stroke-linecap="round" />
        <path d="M68 40 C68 24 112 24 112 40" stroke="#475569" stroke-width="3" fill="none" stroke-linecap="round" />

        <!-- Corps principal du sac 3D -->
        <path d="M35 80 C35 45 60 38 90 38 C120 38 145 45 145 80 L152 185 C152 198 135 202 90 202 C45 202 28 198 28 185 Z" fill="url(#bagGrad)" />
        
        <!-- Poche frontale zippée avec relief volumétrique -->
        <path d="M42 115 C42 105 60 100 90 100 C120 100 138 105 138 115 L142 185 C142 192 125 195 90 195 C55 195 38 192 38 185 Z" fill="url(#pocketGrad)" stroke="#1E40AF" stroke-width="1.5" />
        
        <!-- Fermeture éclair zippée avec tirette métallique -->
        <path d="M48 112 Q90 108 132 112" stroke="#0F172A" stroke-width="3" fill="none" />
        <path d="M48 112 Q90 108 132 112" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="2,2" fill="none" />
        <rect x="86" y="112" width="8" height="12" rx="2" fill="#94A3B8" stroke="#334155" stroke-width="1" />

        <!-- Poches latérales en filet avec gourde d'eau -->
        <path d="M25 135 C20 145 20 170 28 180 Z" fill="#1E3A8A" />
        <path d="M155 135 C160 145 160 170 152 180 Z" fill="#1E3A8A" />
        <!-- Gourde dans la poche droite -->
        <rect x="150" y="115" width="14" height="35" rx="4" fill="#10B981" />
        <rect x="153" y="108" width="8" height="8" rx="2" fill="#047857" />

        <!-- Écusson / Logo moderne -->
        <rect x="76" y="145" width="28" height="16" rx="4" fill="#0F172A" />
        <circle cx="90" cy="153" r="4" fill="#38BDF8" />
      </svg>
    `)
  },

  // --- 2. PERSONNAGES RÉALISTES / ARTISTIQUES SOIGNÉS ---
  {
    id: 'char_student_realistic',
    title: 'Étudiant réaliste moderne',
    category: 'personnages',
    style: 'realiste_vectoriel',
    tags: ['étudiant', 'garçon', 'jeune', 'adulte', 'école', 'université', 'sweat'],
    format: 'svg',
    defaultWidth: 150,
    defaultHeight: 230,
    isRecolorable: true,
    recolorZones: [
      { id: 'hoodie', name: 'Sweat', defaultColor: '#4F46E5' },
      { id: 'pants', name: 'Jean', defaultColor: '#1E293B' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 250" width="160" height="250">
        <defs>
          <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FCD34D" />
            <stop offset="100%" stop-color="#F59E0B" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366F1" />
            <stop offset="70%" stop-color="#4F46E5" />
            <stop offset="100%" stop-color="#3730A3" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="80" cy="242" rx="45" ry="7" fill="#000000" opacity="0.25" filter="blur(4px)" />

        <!-- Cheveux texturés -->
        <path d="M54 42 C54 18 106 18 106 42 C106 32 98 22 80 22 C65 22 56 32 54 42 Z" fill="url(#hairGrad)" />

        <!-- Visage avec anatomie soignée -->
        <path d="M60 40 Q80 34 100 40 L98 68 C98 84 80 88 80 88 C80 88 62 84 62 68 Z" fill="url(#skin)" />
        
        <!-- Cheveux mèche moderne -->
        <path d="M58 35 Q80 26 95 38 Q82 30 65 37 Z" fill="url(#hairGrad)" />

        <!-- Yeux expressifs et regard -->
        <ellipse cx="71" cy="52" rx="3.5" ry="2.5" fill="#0F172A" />
        <ellipse cx="89" cy="52" rx="3.5" ry="2.5" fill="#0F172A" />
        <circle cx="72" cy="51" r="1" fill="#FFFFFF" />
        <circle cx="90" cy="51" r="1" fill="#FFFFFF" />
        <!-- Sourcils -->
        <path d="M66 46 Q72 44 76 46" stroke="#0F172A" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <path d="M84 46 Q88 44 94 46" stroke="#0F172A" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <!-- Nez fin et sourire -->
        <path d="M80 54 L78 61 L82 61" stroke="#D97706" stroke-width="1.5" fill="none" stroke-linecap="round" />
        <path d="M74 69 Q80 74 86 69" stroke="#9A3412" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- Écouteurs audio autour du cou -->
        <path d="M56 75 C56 94 104 94 104 75" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" />
        <rect x="52" y="66" width="9" height="15" rx="4" fill="#0EA5E9" />
        <rect x="99" y="66" width="9" height="15" rx="4" fill="#0EA5E9" />

        <!-- Sweat à capuche moderne avec ombrage volumétrique -->
        <path d="M42 90 C42 84 60 84 80 84 C100 84 118 84 118 90 L126 160 C126 166 112 170 80 170 C48 170 34 166 34 160 Z" fill="url(#hoodieGrad)" />
        
        <!-- Cordons de capuche -->
        <path d="M72 88 L72 120" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
        <path d="M88 88 L88 116" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
        <!-- Poche kangourou sur sweat -->
        <path d="M52 135 L108 135 L114 162 L46 162 Z" fill="#3730A3" opacity="0.6" stroke="#312E81" stroke-width="1" />

        <!-- Bras avec plis réalistes -->
        <path d="M42 92 L24 145 C22 152 28 156 34 152 L45 130 Z" fill="url(#hoodieGrad)" />
        <path d="M118 92 L136 145 C138 152 132 156 126 152 L115 130 Z" fill="url(#hoodieGrad)" />
        <!-- Mains -->
        <circle cx="28" cy="154" r="7" fill="url(#skin)" />
        <circle cx="132" cy="154" r="7" fill="url(#skin)" />

        <!-- Jean stylé avec ombres -->
        <path d="M50 170 L78 170 L76 226 L52 226 Z" fill="#1E293B" />
        <path d="M82 170 L110 170 L108 226 L84 226 Z" fill="#0F172A" />

        <!-- Baskets sneakers modernes (style Air Jordan / Nike) -->
        <path d="M46 226 L76 226 L80 236 L42 236 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />
        <rect x="42" y="235" width="38" height="5" rx="2" fill="#EF4444" />
        <path d="M84 226 L114 226 L118 236 L80 236 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />
        <rect x="80" y="235" width="38" height="5" rx="2" fill="#EF4444" />
      </svg>
    `)
  },
  {
    id: 'char_teacher_realistic',
    title: 'Enseignante professionnelle & tablette',
    category: 'metiers',
    style: 'realiste_vectoriel',
    tags: ['professeur', 'enseignante', 'femme', 'adulte', 'tablette', 'bureau'],
    format: 'svg',
    defaultWidth: 150,
    defaultHeight: 240,
    isRecolorable: true,
    recolorZones: [
      { id: 'blazer', name: 'Veste blazer', defaultColor: '#0D9488' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 260" width="160" height="260">
        <defs>
          <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#14B8A6" />
            <stop offset="70%" stop-color="#0F766E" />
            <stop offset="100%" stop-color="#115E59" />
          </linearGradient>
          <linearGradient id="skinW" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A" />
            <stop offset="100%" stop-color="#F59E0B" />
          </linearGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="80" cy="252" rx="42" ry="7" fill="#000000" opacity="0.25" filter="blur(4px)" />

        <!-- Cheveux ondulés soignés -->
        <path d="M48 45 C48 15 112 15 112 45 C118 65 118 90 108 105 C102 90 105 55 102 45 Z" fill="#78350F" />
        <path d="M48 45 C42 65 42 90 52 105 C58 90 55 55 58 45 Z" fill="#78350F" />

        <!-- Visage -->
        <path d="M60 42 Q80 36 100 42 L98 68 C98 84 80 88 80 88 C80 88 62 84 62 68 Z" fill="url(#skinW)" />
        
        <!-- Lunettes modernes branchées -->
        <rect x="62" y="48" width="16" height="12" rx="3" fill="none" stroke="#1E293B" stroke-width="2" />
        <rect x="82" y="48" width="16" height="12" rx="3" fill="none" stroke="#1E293B" stroke-width="2" />
        <line x1="78" y1="54" x2="82" y2="54" stroke="#1E293B" stroke-width="2" />
        <circle cx="70" cy="54" r="2.5" fill="#1E293B" />
        <circle cx="90" cy="54" r="2.5" fill="#1E293B" />
        <path d="M74 69 Q80 73 86 69" stroke="#B91C1C" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- Haut blanc / chemisier -->
        <polygon points="70,88 90,88 85,120 75,120" fill="#FFFFFF" />

        <!-- Veste blazer élégante -->
        <path d="M42 92 L70 92 L76 150 L34 165 Z" fill="url(#blazerGrad)" />
        <path d="M118 92 L90 92 L84 150 L126 165 Z" fill="url(#blazerGrad)" />

        <!-- Tablette iPad tenue en main -->
        <rect x="88" y="110" width="40" height="52" rx="4" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5" />
        <rect x="91" y="113" width="34" height="46" rx="2" fill="#38BDF8" opacity="0.85" />
        <!-- Main tenant la tablette -->
        <circle cx="88" cy="140" r="7" fill="url(#skinW)" />

        <!-- Pantalon chic tailleur -->
        <path d="M52 165 L78 165 L76 236 L56 236 Z" fill="#334155" />
        <path d="M82 165 L108 165 L104 236 L84 236 Z" fill="#1E293B" />

        <!-- Chaussures escarpins soignées -->
        <path d="M54 236 L76 236 L78 248 L52 248 Z" fill="#0F172A" />
        <path d="M84 236 L106 236 L108 248 L82 248 Z" fill="#0F172A" />
      </svg>
    `)
  },

  // --- 3. TRANSPORTS & VÉHICULES RÉALISTES ---
  {
    id: 'vehicle_car_realistic',
    title: 'Voiture berline moderne réaliste',
    category: 'transports',
    style: 'realiste_vectoriel',
    tags: ['voiture', 'véhicule', 'automobile', 'moderne', 'transport', 'berline'],
    format: 'svg',
    defaultWidth: 260,
    defaultHeight: 120,
    isRecolorable: true,
    recolorZones: [
      { id: 'carBody', name: 'Carrosserie', defaultColor: '#2563EB' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 130" width="280" height="130">
        <defs>
          <linearGradient id="bodyPaint" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="45%" stop-color="#2563EB" />
            <stop offset="85%" stop-color="#1D4ED8" />
            <stop offset="100%" stop-color="#1E3A8A" />
          </linearGradient>
          <linearGradient id="glassTint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.9" />
            <stop offset="60%" stop-color="#7DD3FC" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#0284C7" stop-opacity="0.95" />
          </linearGradient>
          <radialGradient id="rimMetal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F8FAFC" />
            <stop offset="50%" stop-color="#94A3B8" />
            <stop offset="100%" stop-color="#334155" />
          </radialGradient>
        </defs>

        <!-- Ombre sous la voiture -->
        <ellipse cx="140" cy="118" rx="125" ry="10" fill="#000000" opacity="0.35" filter="blur(5px)" />

        <!-- Carrosserie aérodynamique soignée -->
        <path d="M12 85 C12 70 30 55 60 52 L95 28 C115 18 175 18 200 28 L240 50 C265 54 275 68 275 85 C275 96 265 98 255 98 L25 98 C15 98 12 94 12 85 Z" fill="url(#bodyPaint)" />

        <!-- Vitres teintées profilées avec reflets -->
        <path d="M100 32 L150 32 L148 52 L68 52 Z" fill="url(#glassTint)" />
        <path d="M156 32 L195 32 L225 52 L154 52 Z" fill="url(#glassTint)" />
        <line x1="152" y1="30" x2="152" y2="52" stroke="#1E293B" stroke-width="3" />

        <!-- Rétroviseur profilé -->
        <ellipse cx="98" cy="50" rx="8" ry="4" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="1" />

        <!-- Poignées de portes chromées -->
        <rect x="115" y="58" width="16" height="3" rx="1.5" fill="#E2E8F0" />
        <rect x="175" y="58" width="16" height="3" rx="1.5" fill="#E2E8F0" />

        <!-- Phares avant xénon avec reflets -->
        <path d="M255 58 L272 65 C272 72 265 74 252 74 Z" fill="#FEF08A" stroke="#FBBF24" stroke-width="1.5" />
        <!-- Feux arrière LED rouges -->
        <path d="M14 62 L24 64 L22 75 L14 74 Z" fill="#EF4444" />

        <!-- Roue Arrière avec pneu et jantes alliage -->
        <circle cx="68" cy="95" r="24" fill="#0F172A" />
        <circle cx="68" cy="95" r="16" fill="url(#rimMetal)" />
        <circle cx="68" cy="95" r="5" fill="#0F172A" />
        <!-- Rayons de la jante -->
        <line x1="68" y1="80" x2="68" y2="110" stroke="#E2E8F0" stroke-width="2.5" />
        <line x1="53" y1="95" x2="83" y2="95" stroke="#E2E8F0" stroke-width="2.5" />

        <!-- Roue Avant avec pneu et jantes alliage -->
        <circle cx="212" cy="95" r="24" fill="#0F172A" />
        <circle cx="212" cy="95" r="16" fill="url(#rimMetal)" />
        <circle cx="212" cy="95" r="5" fill="#0F172A" />
        <!-- Rayons de la jante -->
        <line x1="212" y1="80" x2="212" y2="110" stroke="#E2E8F0" stroke-width="2.5" />
        <line x1="197" y1="95" x2="227" y2="95" stroke="#E2E8F0" stroke-width="2.5" />
      </svg>
    `)
  },
  {
    id: 'vehicle_bicycle_realistic',
    title: 'Vélo de route moderne réaliste',
    category: 'transports',
    style: 'realiste_vectoriel',
    tags: ['vélo', 'bicyclette', 'sport', 'écologie', 'ville'],
    format: 'svg',
    defaultWidth: 220,
    defaultHeight: 140,
    isRecolorable: true,
    recolorZones: [
      { id: 'bikeFrame', name: 'Cadre vélo', defaultColor: '#10B981' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150" width="240" height="150">
        <defs>
          <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34D399" />
            <stop offset="50%" stop-color="#10B981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="120" cy="142" rx="95" ry="6" fill="#000000" opacity="0.25" filter="blur(4px)" />

        <!-- Roue Arrière détaillée -->
        <circle cx="50" cy="95" r="40" fill="none" stroke="#0F172A" stroke-width="6" />
        <circle cx="50" cy="95" r="35" fill="none" stroke="#64748B" stroke-width="1.5" />
        <!-- Rayons fins -->
        <line x1="50" y1="55" x2="50" y2="135" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="10" y1="95" x2="90" y2="95" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="22" y1="67" x2="78" y2="123" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="22" y1="123" x2="78" y2="67" stroke="#94A3B8" stroke-width="0.8" />
        <circle cx="50" cy="95" r="5" fill="#0F172A" />

        <!-- Roue Avant détaillée -->
        <circle cx="185" cy="95" r="40" fill="none" stroke="#0F172A" stroke-width="6" />
        <circle cx="185" cy="95" r="35" fill="none" stroke="#64748B" stroke-width="1.5" />
        <!-- Rayons fins -->
        <line x1="185" y1="55" x2="185" y2="135" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="145" y1="95" x2="225" y2="95" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="157" y1="67" x2="213" y2="123" stroke="#94A3B8" stroke-width="0.8" />
        <line x1="157" y1="123" x2="213" y2="67" stroke="#94A3B8" stroke-width="0.8" />
        <circle cx="185" cy="95" r="5" fill="#0F172A" />

        <!-- Cadre profilé carbone / aluminium hydroformé -->
        <line x1="50" y1="95" x2="105" y2="95" stroke="url(#frameGrad)" stroke-width="6" stroke-linecap="round" />
        <line x1="105" y1="95" x2="165" y2="48" stroke="url(#frameGrad)" stroke-width="7" stroke-linecap="round" />
        <line x1="50" y1="95" x2="95" y2="52" stroke="url(#frameGrad)" stroke-width="6" stroke-linecap="round" />
        <line x1="95" y1="52" x2="165" y2="48" stroke="url(#frameGrad)" stroke-width="7" stroke-linecap="round" />
        <line x1="95" y1="52" x2="105" y2="95" stroke="url(#frameGrad)" stroke-width="6" stroke-linecap="round" />
        <!-- Fourche avant -->
        <line x1="165" y1="48" x2="185" y2="95" stroke="#334155" stroke-width="6" stroke-linecap="round" />

        <!-- Pédalier & Chaîne -->
        <circle cx="105" cy="95" r="10" fill="#475569" stroke="#1E293B" stroke-width="2" />
        <line x1="105" y1="95" x2="118" y2="108" stroke="#1E293B" stroke-width="4" stroke-linecap="round" />
        <rect x="115" y="106" width="10" height="4" rx="2" fill="#0F172A" />

        <!-- Selle ergonomique -->
        <path d="M82 46 L108 46 C108 46 102 52 92 52 C86 52 82 46 82 46 Z" fill="#0F172A" />
        <line x1="95" y1="52" x2="95" y2="60" stroke="#94A3B8" stroke-width="4" />

        <!-- Guidon de course profilé -->
        <path d="M165 48 L170 34 L180 34 C184 34 186 38 184 44" fill="none" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
      </svg>
    `)
  },

  // --- 4. DÉCORS RÉALISTES & NATURE ---
  {
    id: 'decor_realistic_tree',
    title: 'Arbre majestueux avec ombres réalistes',
    category: 'decors',
    style: 'realiste_vectoriel',
    tags: ['arbre', 'nature', 'parc', 'végétation', 'feuilles'],
    format: 'svg',
    defaultWidth: 160,
    defaultHeight: 220,
    isRecolorable: true,
    recolorZones: [
      { id: 'canopy', name: 'Feuillage', defaultColor: '#16A34A' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240" width="180" height="240">
        <defs>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#451A03" />
            <stop offset="50%" stop-color="#78350F" />
            <stop offset="100%" stop-color="#92400E" />
          </linearGradient>
          <radialGradient id="foliageGrad1" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#86EFAC" />
            <stop offset="45%" stop-color="#22C55E" />
            <stop offset="85%" stop-color="#15803D" />
            <stop offset="100%" stop-color="#14532D" />
          </radialGradient>
        </defs>

        <!-- Ombre au sol -->
        <ellipse cx="90" cy="232" rx="70" ry="8" fill="#000000" opacity="0.25" filter="blur(4px)" />

        <!-- Tronc texturé avec racines -->
        <path d="M78 120 L76 228 C65 232 55 234 50 236 L130 236 C125 234 115 232 104 228 L102 120 Z" fill="url(#trunkGrad)" />
        <path d="M86 140 L70 110" stroke="#78350F" stroke-width="8" stroke-linecap="round" />
        <path d="M96 135 L115 105" stroke="#78350F" stroke-width="8" stroke-linecap="round" />

        <!-- Couches volumétriques de feuillage (ombrage 3D réaliste) -->
        <!-- Couche arrière sombre -->
        <circle cx="65" cy="100" r="42" fill="#14532D" />
        <circle cx="115" cy="100" r="42" fill="#14532D" />
        <circle cx="90" cy="65" r="48" fill="#15803D" />

        <!-- Couche centrale illuminée -->
        <circle cx="58" cy="90" r="38" fill="url(#foliageGrad1)" />
        <circle cx="122" cy="90" r="38" fill="url(#foliageGrad1)" />
        <circle cx="90" cy="55" r="44" fill="url(#foliageGrad1)" />
        
        <!-- Touches de lumière zénithale -->
        <ellipse cx="85" cy="35" rx="22" ry="14" fill="#BBF7D0" opacity="0.6" />
        <ellipse cx="55" cy="75" rx="16" ry="10" fill="#BBF7D0" opacity="0.5" />
      </svg>
    `)
  },
  {
    id: 'decor_glass_board',
    title: 'Tableau vitré & présentoir moderne',
    category: 'ecole',
    style: 'realiste_vectoriel',
    tags: ['tableau', 'verre', 'bureau', 'présentation', 'école', 'cours'],
    format: 'svg',
    defaultWidth: 240,
    defaultHeight: 160,
    isRecolorable: false,
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 170" width="260" height="170">
        <defs>
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
            <stop offset="40%" stop-color="#E0F2FE" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.05" />
          </linearGradient>
        </defs>

        <!-- Pieds en aluminium chromé -->
        <rect x="40" y="145" width="8" height="22" fill="#94A3B8" rx="2" />
        <rect x="212" y="145" width="8" height="22" fill="#94A3B8" rx="2" />
        <rect x="25" y="164" width="38" height="5" rx="2.5" fill="#64748B" />
        <rect x="197" y="164" width="38" height="5" rx="2.5" fill="#64748B" />

        <!-- Cadre élégant en métal brossé -->
        <rect x="15" y="10" width="230" height="140" rx="8" fill="#1E293B" stroke="#CBD5E1" stroke-width="2" />
        
        <!-- Panneau vitré intérieur -->
        <rect x="22" y="16" width="216" height="128" rx="5" fill="#0F172A" />
        <rect x="22" y="16" width="216" height="128" rx="5" fill="url(#glassReflection)" />

        <!-- Inscriptions néon stylées -->
        <text x="38" y="45" fill="#38BDF8" font-size="14" font-weight="bold" font-family="sans-serif">OBJECTIFS DE LA SESSION</text>
        <line x1="38" y1="52" x2="200" y2="52" stroke="#0284C7" stroke-width="1.5" />
        
        <circle cx="45" cy="72" r="3" fill="#4ADE80" />
        <text x="56" y="76" fill="#F8FAFC" font-size="12" font-family="sans-serif">1. Compréhension du sujet</text>
        
        <circle cx="45" cy="96" r="3" fill="#FBBF24" />
        <text x="56" y="100" fill="#F8FAFC" font-size="12" font-family="sans-serif">2. Réalisation du projet</text>

        <!-- Reflet lumineux en diagonale -->
        <polygon points="22,16 90,16 40,144 22,144" fill="#FFFFFF" opacity="0.06" />
      </svg>
    `)
  },

  // --- 5. BULLES DE DIALOGUE PREMIUM ---
  {
    id: 'bubble_speech_premium',
    title: 'Bulle de parole moderne',
    category: 'accessoires',
    style: 'moderne',
    tags: ['bulle', 'dialogue', 'parole', 'texte', 'expression'],
    format: 'svg',
    defaultWidth: 180,
    defaultHeight: 120,
    isRecolorable: true,
    recolorZones: [
      { id: 'bubbleBg', name: 'Fond de bulle', defaultColor: '#FFFFFF' }
    ],
    url: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 130" width="200" height="130">
        <defs>
          <filter id="shadowBubble" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#shadowBubble)">
          <path d="M20 15 L180 15 Q195 15 195 30 L195 80 Q195 95 180 95 L80 95 L50 120 L60 95 L20 95 Q5 95 5 80 L5 30 Q5 15 20 15 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
        </g>
      </svg>
    `)
  }
];
