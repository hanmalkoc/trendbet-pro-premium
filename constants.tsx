
import { Match, Game, Banner } from './types';

export const BANNERS: Banner[] = [
  {
    id: '1',
    title: '%100 HOŞ GELDİN BONUSU',
    subtitle: 'İlk yatırımınıza özel 5000 TL bonus!',
    imageUrl: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?auto=format&fit=crop&q=80&w=800',
    accentColor: '#f3c41b'
  },
  {
    id: '2',
    title: 'CANLI CASİNO ŞÖLENİ',
    subtitle: 'Evolution masalarında %30 kayıp bonusu',
    imageUrl: 'https://images.unsplash.com/photo-1596742572447-57205ed4064d?auto=format&fit=crop&q=80&w=800',
    accentColor: '#4ade80'
  }
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Galatasaray',
    awayTeam: 'Fenerbahçe',
    league: 'Trendyol Süper Lig',
    country: 'Türkiye',
    status: '78\' Canlı',
    score: '2 - 1',
    isLive: true,
    minute: 78,
    odds: { home: '1.45', draw: '4.20', away: '6.50' }
  },
  {
    id: 'm2',
    homeTeam: 'Beşiktaş',
    awayTeam: 'Trabzonspor',
    league: 'Ziraat Türkiye Kupası',
    country: 'Türkiye',
    status: '20:45',
    isLive: false,
    odds: { home: '2.10', draw: '3.30', away: '3.10' }
  }
];

export const MOCK_GAMES: Game[] = [
  { 
    id: 'joyful-cascades', 
    title: 'Joyful Cascades', 
    provider: 'Trendbet Originals', 
    category: 'slot', 
    badge: 'TURNUVA', 
    imageUrl: 'https://i.imgur.com/XIV0mpb.jpeg', 
    gameUrl: 'internal:joyful-cascades' 
  },
  { 
    id: 'classic-slots', 
    title: 'Classic Slots', 
    provider: 'Trendbet Originals', 
    category: 'slot', 
    badge: 'YENİ', 
    imageUrl: 'https://i.imgur.com/2ADaY7W.jpeg', 
    gameUrl: 'internal:classic-slots' 
  },
  { id: 'g1', title: 'Starlight Princess', provider: 'Pragmatic Play', category: 'slot', badge: 'YENİ', imageUrl: 'https://i.imgur.com/K3tG9tE.jpeg' },
  { id: 'g2', title: 'Sweet Rush Bonanza', provider: 'Pragmatic Play', category: 'slot', imageUrl: 'https://i.imgur.com/GLfeXKm.jpeg' },
  { id: 'g3', title: 'Sweet Bonanza', provider: 'Pragmatic Play', category: 'slot', imageUrl: 'https://i.imgur.com/JqbRG6i.jpeg' },
  { id: 'g4', title: 'Gates of Olympus', provider: 'Pragmatic Play', category: 'slot', imageUrl: 'https://i.imgur.com/nWyVkhK.jpeg' },
  { id: 'g14', title: 'Aviator', provider: 'Spribe', category: 'slot', imageUrl: 'https://i.imgur.com/jj8TYjD.jpeg' },
];

export const MOCK_LIVE_CASINO: Game[] = [
  { id: 'lc1', title: 'Crazy Time', provider: 'Evolution', category: 'live-casino', imageUrl: 'https://i.imgur.com/quCjmOU.jpeg' },
  { id: 'lc2', title: 'Lightning Roulette', provider: 'Evolution', category: 'live-casino', imageUrl: 'https://i.imgur.com/zlGyePT.jpeg' },
];
