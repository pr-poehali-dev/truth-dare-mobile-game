import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

type Props = {
  onStartGame: () => void;
  onSettings: () => void;
  adultMode: boolean;
  setAdultMode: (value: boolean) => void;
};

const MainMenu = ({ onStartGame, onSettings, adultMode, setAdultMode }: Props) => {
  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Правда или Действие
        </h1>
        <p className="text-center text-gray-600 mb-5 text-sm">Выберите режим игры</p>

        <div className="space-y-3">
          <Card 
            className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onStartGame}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Играть</h2>
                  <p className="text-xs text-gray-600">Начать новую игру</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={24} className="text-purple-600 flex-shrink-0" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔞</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Режим 21+</h2>
                  <p className="text-xs text-gray-600">Только для взрослых</p>
                </div>
              </div>
              <Switch
                checked={adultMode}
                onCheckedChange={setAdultMode}
                className="data-[state=checked]:bg-red-500 flex-shrink-0"
              />
            </div>
          </Card>

          <Card 
            className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-300 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onSettings}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Settings" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Настройки</h2>
                  <p className="text-xs text-gray-600">Свои вопросы и действия</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={24} className="text-blue-600 flex-shrink-0" />
            </div>
          </Card>
        </div>

        <div className="mt-5 text-center text-xs text-gray-500">
          <p>🎉 Веселитесь ответственно!</p>
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;