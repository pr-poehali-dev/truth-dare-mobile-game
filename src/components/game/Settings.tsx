import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Question } from '@/pages/Index';
import { useToast } from '@/hooks/use-toast';

type Props = {
  customQuestions: Question[];
  setCustomQuestions: (questions: Question[]) => void;
  onBack: () => void;
  user: { id: string; username: string; token: string } | null;
};

const API_URL = 'https://functions.poehali.dev/058056a9-1ad8-4173-94c8-2c161a2fa6d7';

const Settings = ({ customQuestions, setCustomQuestions, onBack, user }: Props) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<'truth' | 'dare'>('truth');
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadQuestions();
    }
  }, [user]);

  const loadQuestions = async () => {
    if (!user) return;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'X-User-Id': user.id,
        },
      });

      const data = await response.json();
      if (response.ok && data.questions) {
        setCustomQuestions(data.questions.map((q: any) => ({
          text: q.text,
          type: q.type,
          adult: q.adult
        })));
      }
    } catch (error) {
      console.error('Failed to load questions:', error);
    }
  };

  const addQuestion = async () => {
    if (!questionText.trim()) return;

    if (!user) {
      setCustomQuestions([
        ...customQuestions,
        { text: questionText.trim(), type: questionType, adult: isAdult }
      ]);
      setQuestionText('');
      toast({
        title: 'Вопрос добавлен',
        description: 'Войдите в аккаунт, чтобы сохранить вопросы',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id,
        },
        body: JSON.stringify({
          text: questionText.trim(),
          type: questionType,
          adult: isAdult
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        await loadQuestions();
        setQuestionText('');
        toast({
          title: 'Успешно!',
          description: 'Вопрос сохранен',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить вопрос',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeQuestion = (index: number) => {
    if (!user) {
      setCustomQuestions(customQuestions.filter((_, i) => i !== index));
      return;
    }
  };

  const truthQuestions = customQuestions.filter(q => q.type === 'truth');
  const dareQuestions = customQuestions.filter(q => q.type === 'dare');

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
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Настройки игры
        </h1>

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Добавить вопрос/действие</label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Введите текст..."
              className="min-h-[100px] text-lg"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant={questionType === 'truth' ? 'default' : 'outline'}
              className={`flex-1 h-12 ${questionType === 'truth' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              onClick={() => setQuestionType('truth')}
            >
              <Icon name="MessageCircle" className="mr-2" />
              Правда
            </Button>
            <Button
              type="button"
              variant={questionType === 'dare' ? 'default' : 'outline'}
              className={`flex-1 h-12 ${questionType === 'dare' ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
              onClick={() => setQuestionType('dare')}
            >
              <Icon name="Zap" className="mr-2" />
              Действие
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔞</span>
              <span className="font-semibold text-gray-700">Только для 21+</span>
            </div>
            <Button
              type="button"
              variant={isAdult ? 'default' : 'outline'}
              size="sm"
              className={isAdult ? 'bg-red-500 hover:bg-red-600' : ''}
              onClick={() => setIsAdult(!isAdult)}
            >
              {isAdult ? 'Да' : 'Нет'}
            </Button>
          </div>

          <Button
            onClick={addQuestion}
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={!questionText.trim() || loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Icon name="Plus" className="mr-2" />
                {user ? 'Сохранить' : 'Добавить (без сохранения)'}
              </>
            )}
          </Button>
          
          {!user && (
            <p className="text-sm text-center text-orange-600 font-semibold">
              ⚠️ Войдите в аккаунт, чтобы вопросы сохранялись
            </p>
          )}
        </div>

        {customQuestions.length > 0 && (
          <Tabs defaultValue="truth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="truth" className="text-lg">
                <Icon name="MessageCircle" className="mr-2" size={18} />
                Правда ({truthQuestions.length})
              </TabsTrigger>
              <TabsTrigger value="dare" className="text-lg">
                <Icon name="Zap" className="mr-2" size={18} />
                Действие ({dareQuestions.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="truth" className="space-y-3 mt-4">
              {truthQuestions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет добавленных вопросов</p>
              ) : (
                truthQuestions.map((q, index) => {
                  const originalIndex = customQuestions.findIndex(cq => cq === q);
                  return (
                    <Card key={originalIndex} className="p-4 bg-blue-50 animate-slide-up">
                      <div className="flex justify-between items-start gap-3">
                        <p className="flex-1 text-gray-800">{q.text}</p>
                        <div className="flex items-center gap-2">
                          {q.adult && <span className="text-sm">🔞</span>}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(originalIndex)}
                            className="hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </TabsContent>
            
            <TabsContent value="dare" className="space-y-3 mt-4">
              {dareQuestions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет добавленных действий</p>
              ) : (
                dareQuestions.map((q, index) => {
                  const originalIndex = customQuestions.findIndex(cq => cq === q);
                  return (
                    <Card key={originalIndex} className="p-4 bg-pink-50 animate-slide-up">
                      <div className="flex justify-between items-start gap-3">
                        <p className="flex-1 text-gray-800">{q.text}</p>
                        <div className="flex items-center gap-2">
                          {q.adult && <span className="text-sm">🔞</span>}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(originalIndex)}
                            className="hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        )}
      </Card>
    </div>
  );
};

export default Settings;