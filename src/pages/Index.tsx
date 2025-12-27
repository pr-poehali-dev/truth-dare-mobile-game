import { useState } from 'react';
import AddPlayers from '@/components/game/AddPlayers';
import MainMenu from '@/components/game/MainMenu';
import GamePlay from '@/components/game/GamePlay';
import Settings from '@/components/game/Settings';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-4">
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
        />
      )}
    </div>
  );
};

export default Index;
