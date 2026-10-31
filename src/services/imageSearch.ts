export interface RealisticImageResult {
  id: string;
  title: string;
  category: string;
  author: string;
  url: string;
  thumbUrl: string;
  source: 'unsplash' | 'curated';
}

// Curated high-resolution realistic photos & cutouts categorized for instant fast browsing
export const CURATED_REALISTIC_PHOTOS: RealisticImageResult[] = [
  // Éducation & École
  {
    id: 'photo_student_study',
    title: 'Élève étudiant avec cahier & stylo',
    category: 'ecole',
    author: 'Unsplash Education',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_classroom',
    title: 'Salle de classe moderne & lumineuse',
    category: 'ecole',
    author: 'Unsplash Class',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_teacher',
    title: 'Enseignante souriante avec livre',
    category: 'ecole',
    author: 'Unsplash Teacher',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_books_library',
    title: 'Livres scolaires et bibliothèque',
    category: 'ecole',
    author: 'Unsplash Library',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },

  // Personnages & Métiers
  {
    id: 'photo_person_happy_girl',
    title: 'Jeune fille avec sac à dos',
    category: 'personnages',
    author: 'Unsplash People',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_person_young_man',
    title: 'Jeune homme souriant en extérieur',
    category: 'personnages',
    author: 'Unsplash People',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_scientist_doctor',
    title: 'Scientifique au laboratoire',
    category: 'personnages',
    author: 'Unsplash Science',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },

  // Sports
  {
    id: 'photo_sport_runner',
    title: 'Athlète en pleine course',
    category: 'sports',
    author: 'Unsplash Sport',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_soccer_action',
    title: 'Ballon de football sur gazon',
    category: 'sports',
    author: 'Unsplash Soccer',
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_cycling',
    title: 'Cycliste sur route au soleil',
    category: 'sports',
    author: 'Unsplash Bike',
    url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },

  // Transports
  {
    id: 'photo_electric_car',
    title: 'Voiture moderne en ville',
    category: 'transports',
    author: 'Unsplash Auto',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_city_bus',
    title: 'Bus et tramway urbain',
    category: 'transports',
    author: 'Unsplash Transit',
    url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_airplane_sky',
    title: 'Avion volant au-dessus des nuages',
    category: 'transports',
    author: 'Unsplash Sky',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },

  // Décors & Nature
  {
    id: 'photo_green_park',
    title: 'Arbres et allée de parc ensoleillé',
    category: 'decors',
    author: 'Unsplash Nature',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_mountain_lake',
    title: 'Paysage de montagne et lac bleu',
    category: 'decors',
    author: 'Unsplash Landscape',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },

  // Technologie & Objets
  {
    id: 'photo_laptop_desk',
    title: 'Ordinateur portable sur bureau moderne',
    category: 'technologie',
    author: 'Unsplash Tech',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  },
  {
    id: 'photo_smartphone',
    title: 'Smartphone moderne écran allumé',
    category: 'technologie',
    author: 'Unsplash Mobile',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=350&q=70',
    source: 'unsplash'
  }
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/** Recherche locale dans la banque curatée (pas d’URLs Unsplash fictives). */
export const searchRealisticImages = async (
  query: string,
  category: string = 'all'
): Promise<RealisticImageResult[]> => {
  const cleanQuery = normalize(query.trim());

  return CURATED_REALISTIC_PHOTOS.filter((img) => {
    const matchCat = category === 'all' || img.category === category;
    if (!matchCat) return false;
    if (!cleanQuery) return true;

    const haystack = normalize(`${img.title} ${img.category} ${img.author}`);
    return haystack.includes(cleanQuery);
  });
};
