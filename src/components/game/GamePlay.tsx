import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Player, Question } from '@/pages/Index';
import { defaultQuestions, adultQuestions } from '@/data/questions';

type Props = {
  players: Player[];
  adultMode: boolean;
  customQuestions: Question[];
  onBack: () => void;
};

const GamePlay = ({ players, adultMode, customQuestions, onBack }: Props) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameMode, setGameMode] = useState<'choose' | 'question'>('choose');
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isFlipping, setIsFlipping] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  const getRandomQuestion = (type: 'truth' | 'dare') => {
    const allQuestions = [
      ...defaultQuestions,
      ...(adultMode ? adultQuestions : []),
      ...customQuestions
    ];
    
    const filteredQuestions = allQuestions.filter(
      q => q.type === type && (adultMode || !q.adult)
    );
    
    if (filteredQuestions.length === 0) {
      return type === 'truth' 
        ? 'Расскажи что-нибудь интересное о себе!'
        : 'Придумай свое действие!';
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex].text;
  };

  const handleChoose = (type: 'truth' | 'dare') => {
    setIsFlipping(true);
    setSelectedType(type);
    
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion(type));
      setGameMode('question');
      setIsFlipping(false);
    }, 600);
  };

  const nextPlayer = () => {
    setGameMode('choose');
    setSelectedType(null);
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-3 text-white hover:bg-white/20 h-9 text-sm"
      >
        <Icon name="ArrowLeft" className="mr-1" size={16} />
        Назад
      </Button>

      <Card className="p-4 sm:p-5 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-5">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 ${
            currentPlayer.gender === 'male' 
              ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
              : 'bg-gradient-to-r from-pink-400 to-pink-600'
          }`}>
            <Icon name="User" className="text-white" size={18} />
            <span className="text-lg font-bold text-white">{currentPlayer.name}</span>
          </div>
          
          {adultMode && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 rounded-full">
              <span className="text-base">🔞</span>
              <span className="text-xs font-semibold text-red-700">Режим 21+</span>
            </div>
          )}
        </div>

        {gameMode === 'choose' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-5">
              Выбери: Правда или Действие?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                className={`p-5 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isFlipping && selectedType === 'truth' ? 'animate-flip' : ''
                } bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-blue-300`}
                onClick={() => handleChoose('truth')}
              >
                <div className="text-center">
                  <Icon name="MessageCircle" size={48} className="mx-auto mb-3 text-white" />
                  <h3 className="text-xl font-bold text-white mb-1">Правда</h3>
                  <p className="text-sm text-white/90">Ответь честно</p>
                </div>
              </Card>

              <Card
                className={`p-5 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isFlipping && selectedType === 'dare' ? 'animate-flip' : ''
                } bg-gradient-to-br from-pink-400 to-red-600 border-2 border-pink-300`}
                onClick={() => handleChoose('dare')}
              >
                <div className="text-center">
                  <Icon name="Zap" size={48} className="mx-auto mb-3 text-white" />
                  <h3 className="text-xl font-bold text-white mb-1">Действие</h3>
                  <p className="text-sm text-white/90">Выполни задание</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {gameMode === 'question' && (
          <div className="space-y-4 animate-fade-in">
            <div className={`p-5 rounded-xl ${
              selectedType === 'truth'
                ? 'bg-gradient-to-br from-blue-100 to-purple-100'
                : 'bg-gradient-to-br from-pink-100 to-red-100'
            }`}>
              <div className="flex items-center justify-center mb-3">
                <Icon 
                  name={selectedType === 'truth' ? 'MessageCircle' : 'Zap'} 
                  size={36}
                  className={selectedType === 'truth' ? 'text-blue-600' : 'text-pink-600'}
                />
              </div>
              
              <h3 className={`text-lg font-bold text-center mb-3 ${
                selectedType === 'truth' ? 'text-blue-800' : 'text-pink-800'
              }`}>
                {selectedType === 'truth' ? 'Правда' : 'Действие'}
              </h3>
              
              <p className="text-base sm:text-lg text-center font-semibold text-gray-800 leading-relaxed">
                {currentQuestion}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setCurrentQuestion(getRandomQuestion(selectedType!))}
                variant="outline"
                className="flex-1 h-10 text-sm"
              >
                <Icon name="RefreshCw" className="mr-1.5" size={16} />
                Другой
              </Button>
              
              <Button
                onClick={nextPlayer}
                className="flex-1 h-10 text-sm bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Следующий
                <Icon name="ArrowRight" className="ml-1.5" size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GamePlay;