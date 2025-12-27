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
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-white hover:bg-white/20"
      >
        <Icon name="ArrowLeft" className="mr-2" />
        Назад в меню
      </Button>

      <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 ${
            currentPlayer.gender === 'male' 
              ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
              : 'bg-gradient-to-r from-pink-400 to-pink-600'
          }`}>
            <Icon name="User" className="text-white" size={24} />
            <span className="text-2xl font-bold text-white">{currentPlayer.name}</span>
          </div>
          
          {adultMode && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
              <span className="text-xl">🔞</span>
              <span className="font-semibold text-red-700">Режим 21+</span>
            </div>
          )}
        </div>

        {gameMode === 'choose' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Выбери: Правда или Действие?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isFlipping && selectedType === 'truth' ? 'animate-flip' : ''
                } bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-blue-300`}
                onClick={() => handleChoose('truth')}
              >
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-white" />
                  <h3 className="text-3xl font-bold text-white mb-2">Правда</h3>
                  <p className="text-white/90">Ответь честно на вопрос</p>
                </div>
              </Card>

              <Card
                className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isFlipping && selectedType === 'dare' ? 'animate-flip' : ''
                } bg-gradient-to-br from-pink-400 to-red-600 border-4 border-pink-300`}
                onClick={() => handleChoose('dare')}
              >
                <div className="text-center">
                  <Icon name="Zap" size={64} className="mx-auto mb-4 text-white" />
                  <h3 className="text-3xl font-bold text-white mb-2">Действие</h3>
                  <p className="text-white/90">Выполни задание</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {gameMode === 'question' && (
          <div className="space-y-8 animate-fade-in">
            <div className={`p-8 rounded-2xl ${
              selectedType === 'truth'
                ? 'bg-gradient-to-br from-blue-100 to-purple-100'
                : 'bg-gradient-to-br from-pink-100 to-red-100'
            }`}>
              <div className="flex items-center justify-center mb-4">
                <Icon 
                  name={selectedType === 'truth' ? 'MessageCircle' : 'Zap'} 
                  size={48}
                  className={selectedType === 'truth' ? 'text-blue-600' : 'text-pink-600'}
                />
              </div>
              
              <h3 className={`text-2xl font-bold text-center mb-6 ${
                selectedType === 'truth' ? 'text-blue-800' : 'text-pink-800'
              }`}>
                {selectedType === 'truth' ? 'Правда' : 'Действие'}
              </h3>
              
              <p className="text-2xl text-center font-semibold text-gray-800 leading-relaxed">
                {currentQuestion}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentQuestion(getRandomQuestion(selectedType!))}
                variant="outline"
                className="flex-1 h-14 text-lg"
              >
                <Icon name="RefreshCw" className="mr-2" />
                Другой вопрос
              </Button>
              
              <Button
                onClick={nextPlayer}
                className="flex-1 h-14 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Следующий игрок
                <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GamePlay;
