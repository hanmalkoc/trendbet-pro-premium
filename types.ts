
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  league: string;
  leagueLogo?: string;
  country?: string;
  status: string;
  rawStatus?: string;
  odds: {
    home: string;
    draw: string;
    away: string;
  };
  score?: string;
  isLive?: boolean;
  minute?: number;
  marketCount?: number;
  startTime?: string;
}

export interface BetSelection {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  selection: '1' | 'X' | '2';
  odd: number;
  stake: number;
}

export interface UserBet {
  id: string;
  selections: BetSelection[];
  stake: number;
  totalOdds: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost';
  createdAt: string;
}

export interface WalletInfo {
  address: string;
  provider: string;
  lastSync: string;
  isConnected: boolean;
}

export interface UserData {
  uid: string;
  username: string;
  email?: string;
  balance: number;
  currency: string;
  wallet?: WalletInfo;
}

export interface Game {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  videoUrl?: string; // Oyunun kartında dönecek video teaser linki
  gameUrl?: string; // Oyunun açılacağı gerçek link
  category: 'slot' | 'live-casino' | 'crash';
  badge?: 'YENİ' | 'TURNUVA' | 'DROPS & WINS' | 'JACKPOT' | 'PRIZE STORM';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  accentColor: string;
}
