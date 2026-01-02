
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SportsPage from './pages/SportsPage';
import CasinoPage from './pages/CasinoPage';
import LiveCasinoPage from './pages/LiveCasinoPage';
import MyBetsPage from './pages/MyBetsPage';
import AdminPage from './pages/AdminPage';
import MenuPage from './pages/MenuPage';
import GameLoader from './components/GameLoader';
import LiveSupport from './components/LiveSupport';
import JoyfulCascades from './games/JoyfulCascades';
import ClassicSlots from './games/ClassicSlots';
import { UserData } from './types.ts';
import { auth, db } from './firebase.ts';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { X, Play } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingGame, setLoadingGame] = useState<{ isVisible: boolean; title: string; url: string; videoUrl?: string }>({
    isVisible: false,
    title: '',
    url: ''
  });
  
  const [activeGame, setActiveGame] = useState<{ title: string; url: string; videoUrl?: string } | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              username: data.username || firebaseUser.email?.split('@')[0],
              email: firebaseUser.email,
              balance: data.balance || 0,
              currency: 'TRY'
            } as any);
          }
        });
        return () => unsubscribeDoc();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleUpdateUser = (updatedUser: UserData | null) => {
    setUser(updatedUser);
  };

  const launchGame = useCallback((title: string, url: string = 'https://games.betkolik790.com/LaunchGame', videoUrl?: string) => {
    let finalUrl = url;
    if (title === 'Joyful Cascades' || url === 'internal:joyful-cascades') finalUrl = 'internal:joyful-cascades';
    if (title === 'Classic Slots' || url === 'internal:classic-slots') finalUrl = 'internal:classic-slots';
      
    setLoadingGame({ isVisible: true, title, url: finalUrl, videoUrl });
  }, []);

  const handleLoaderComplete = () => {
    const { title, url, videoUrl } = loadingGame;
    setLoadingGame({ isVisible: false, title: '', url: '', videoUrl: undefined });
    setActiveGame({ title, url, videoUrl });
  };

  const handleVideoClick = () => {
    if (user) {
      setActiveGame(null);
      setShowWalletModal(true);
    } else {
      setActiveGame(null);
      setAuthModal({ isOpen: true, mode: 'login' });
    }
  };

  return (
    <Router>
      <GameLoader 
        isVisible={loadingGame.isVisible} 
        gameTitle={loadingGame.title} 
        onComplete={handleLoaderComplete} 
      />

      {activeGame && (
        <div className="fixed inset-0 z-[600] bg-black flex flex-col animate-in fade-in duration-500">
           <div className="h-14 bg-[#003820] border-b border-white/10 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-2xl z-[610]">
              <div className="flex items-center gap-3">
                 <div className="hidden md:block w-1 h-6 bg-[#ffcc00] rounded-full"></div>
                 <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white italic truncate max-w-[150px] md:max-w-none">
                   {activeGame.title} 
                   <span className="ml-2 text-gray-500 font-bold not-italic hidden sm:inline">| REAL PLAY</span>
                 </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                 {user && (
                    <div className="px-3 py-1 bg-black/40 rounded-lg border border-white/5 hidden sm:flex flex-col items-end">
                       <span className="text-[8px] font-black text-gray-500 uppercase">BAKİYE</span>
                       <span className="text-[11px] font-black text-[#ffcc00]">{user.balance.toLocaleString('tr-TR')} TL</span>
                    </div>
                 )}
                 <button 
                   onClick={() => setActiveGame(null)} 
                   className="p-2.5 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all active:scale-95"
                 >
                   <X size={20} strokeWidth={3} />
                 </button>
              </div>
           </div>
           
           <div className="flex-1 relative bg-black overflow-hidden">
              {activeGame.url === 'internal:joyful-cascades' ? (
                <JoyfulCascades 
                  user={user} 
                  onUpdateUser={handleUpdateUser} 
                  onClose={() => setActiveGame(null)} 
                  onLogin={() => {
                    setActiveGame(null);
                    setAuthModal({ isOpen: true, mode: 'login' });
                  }}
                />
              ) : activeGame.url === 'internal:classic-slots' ? (
                <ClassicSlots
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onClose={() => setActiveGame(null)}
                  onLogin={() => {
                    setActiveGame(null);
                    setAuthModal({ isOpen: true, mode: 'login' });
                  }}
                />
              ) : activeGame.videoUrl ? (
                <div 
                  onClick={handleVideoClick}
                  className="w-full h-full bg-black relative group select-none cursor-pointer"
                >
                  <div className="absolute inset-0 z-10"></div>
                  <video 
                    src={activeGame.videoUrl} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted={false} 
                    playsInline 
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                  />
                  {!user && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-[20]">
                       <div className="w-20 h-20 bg-[#ffcc00] rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,204,0,0.3)]">
                          <Play size={40} className="text-black ml-1" fill="currentColor" />
                       </div>
                       <h3 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tighter">BU OYUNU OYNAMAK İÇİN GİRİŞ YAPMALISINIZ</h3>
                       <button className="bg-[#ffcc00] text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 hover:scale-105 transition-all">GİRİŞ YAP</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <iframe 
                    src={activeGame.url.startsWith('http') ? activeGame.url : `https://${activeGame.url}`} 
                    className="w-full h-full border-none"
                    title={activeGame.title}
                    allow="autoplay; fullscreen; encrypted-media"
                    loading="lazy"
                  />
                  {!user && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-50">
                       <h3 className="text-xl font-black text-white uppercase italic mb-4">BU OYUNU OYNAMAK İÇİN GİRİŞ YAPMALISINIZ</h3>
                       <button onClick={() => {setActiveGame(null); setAuthModal({isOpen: true, mode: 'login'});}} className="bg-[#ffcc00] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95">GİRİŞ YAP</button>
                    </div>
                  )}
                </div>
              )}
           </div>
        </div>
      )}

      <Layout 
        user={user} 
        onUpdateUser={handleUpdateUser}
        authModal={authModal}
        setAuthModal={setAuthModal}
        showWalletModal={showWalletModal}
        setShowWalletModal={setShowWalletModal}
      >
        <Routes>
          <Route path="/" element={<HomePage onLaunchGame={launchGame} />} />
          <Route 
            path="/sports" 
            element={
              <SportsPage 
                user={user} 
                onUpdateUser={handleUpdateUser} 
                onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
                onOpenWallet={() => setShowWalletModal(true)}
              />
            } 
          />
          <Route path="/casino" element={<CasinoPage onLaunchGame={launchGame} />} />
          <Route path="/live-casino" element={<LiveCasinoPage onLaunchGame={launchGame} />} />
          <Route path="/slots" element={<CasinoPage onLaunchGame={launchGame} />} />
          <Route path="/my-bets" element={<MyBetsPage />} />
          <Route path="/menu" element={<MenuPage onLaunchGame={launchGame} onOpenWallet={() => setShowWalletModal(true)} />} />
          {user?.email === 'admin@trendbet.com' && <Route path="/admin" element={<AdminPage />} />}
        </Routes>
      </Layout>
      <LiveSupport />
    </Router>
  );
};

export default App;
