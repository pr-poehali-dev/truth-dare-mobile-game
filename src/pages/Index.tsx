import { useState, useEffect } from 'react';
import AddPlayers from '@/components/game/AddPlayers';
import MainMenu from '@/components/game/MainMenu';
import GamePlay from '@/components/game/GamePlay';
import Settings from '@/components/game/Settings';
import AuthModal from '@/components/game/AuthModal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export type Player = {
  name: string;
  gender: 'male' | 'female';
};

export type Question = {
  text: string;
  type: 'truth' | 'dare';
  adult: boolean;
};

const Index = () => {
  const [screen, setScreen] = useState<'add-players' | 'menu' | 'game' | 'settings'>('add-players');
  const [players, setPlayers] = useState<Player[]>([]);
  const [adultMode, setAdultMode] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ id: string; username: string; token: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('truthOrDareUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userId: string, username: string, token: string) => {
    const userData = { id: userId, username, token };
    setUser(userData);
    localStorage.setItem('truthOrDareUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('truthOrDareUser');
    setCustomQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-4">
      <div className="fixed top-4 right-4 z-50">
        {user ? (
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Icon name="User" className="text-purple-600" size={20} />
              <span className="font-semibold text-gray-800">{user.username}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-red-100 hover:text-red-600"
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowAuth(true)}
            className="bg-white/95 backdrop-blur-sm text-purple-600 hover:bg-white shadow-lg"
          >
            <Icon name="LogIn" className="mr-2" size={18} />
            Войти
          </Button>
        )}
      </div>

      {screen === 'add-players' && (
        <AddPlayers 
          players={players}
          setPlayers={setPlayers}
          onStart={() => setScreen('menu')}
        />
      )}
      
      {screen === 'menu' && (
        <MainMenu 
          onStartGame={() => setScreen('game')}
          onSettings={() => setScreen('settings')}
          adultMode={adultMode}
          setAdultMode={setAdultMode}
        />
      )}
      
      {screen === 'game' && (
        <GamePlay 
          players={players}
          adultMode={adultMode}
          customQuestions={customQuestions}
          onBack={() => setScreen('menu')}
        />
      )}
      
      {screen === 'settings' && (
        <Settings 
          customQuestions={customQuestions}
          setCustomQuestions={setCustomQuestions}
          onBack={() => setScreen('menu')}
          user={user}
        />
      )}

      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;