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
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Правда или Действие
        </h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Имя игрока</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="text-lg"
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Пол</label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={gender === 'male' ? 'default' : 'outline'}
                className={`flex-1 h-14 text-lg ${gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                onClick={() => setGender('male')}
              >
                <Icon name="User" className="mr-2" />
                Мужской
              </Button>
              <Button
                type="button"
                variant={gender === 'female' ? 'default' : 'outline'}
                className={`flex-1 h-14 text-lg ${gender === 'female' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                onClick={() => setGender('female')}
              >
                <Icon name="User" className="mr-2" />
                Женский
              </Button>
            </div>
          </div>

          <Button
            onClick={addPlayer}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Icon name="Plus" className="mr-2" />
            Добавить игрока
          </Button>

          {players.length > 0 && (
            <div className="space-y-3 mt-6">
              <h3 className="font-semibold text-gray-700">Игроки ({players.length}):</h3>
              {players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-slide-up"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      player.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'
                    }`}>
                      <Icon name="User" className="text-white" size={20} />
                    </div>
                    <span className="font-semibold text-gray-800">{player.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(index)}
                    className="hover:bg-red-100 hover:text-red-600"
                  >
                    <Icon name="Trash2" size={20} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {players.length >= 2 && (
            <Button
              onClick={onStart}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse-glow"
            >
              <Icon name="Play" className="mr-2" size={24} />
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
