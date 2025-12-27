import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Player } from '@/pages/Index';

type Props = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  onStart: () => void;
};

const AddPlayers = ({ players, setPlayers, onStart }: Props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const addPlayer = () => {
    if (name.trim()) {
      setPlayers([...players, { name: name.trim(), gender }]);
      setName('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Правда или Действие
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-gray-700">Имя игрока</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="text-base h-10"
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-gray-700">Пол</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={gender === 'male' ? 'default' : 'outline'}
                className={`flex-1 h-10 text-sm ${gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                onClick={() => setGender('male')}
              >
                <Icon name="User" className="mr-1" size={16} />
                Мужской
              </Button>
              <Button
                type="button"
                variant={gender === 'female' ? 'default' : 'outline'}
                className={`flex-1 h-10 text-sm ${gender === 'female' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                onClick={() => setGender('female')}
              >
                <Icon name="User" className="mr-1" size={16} />
                Женский
              </Button>
            </div>
          </div>

          <Button
            onClick={addPlayer}
            className="w-full h-10 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Icon name="Plus" className="mr-1" size={16} />
            Добавить
          </Button>

          {players.length > 0 && (
            <div className="space-y-2 mt-4">
              <h3 className="text-sm font-semibold text-gray-700">Игроки ({players.length}):</h3>
              {players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-slide-up"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      player.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'
                    }`}>
                      <Icon name="User" className="text-white" size={16} />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{player.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(index)}
                    className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {players.length >= 2 && (
            <Button
              onClick={onStart}
              className="w-full h-12 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse-glow"
            >
              <Icon name="Play" className="mr-1.5" size={20} />
              Начать игру
            </Button>
          )}
          
          {players.length < 2 && players.length > 0 && (
            <p className="text-center text-sm text-gray-500">Добавьте минимум 2 игрока</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AddPlayers;