import { Question } from '@/pages/Index';

export const defaultQuestions: Question[] = [
  { text: 'Что самое смешное ты делал(а) в детстве?', type: 'truth', adult: false },
  { text: 'Какой твой самый неловкий момент в школе?', type: 'truth', adult: false },
  { text: 'О чем ты мечтаешь больше всего?', type: 'truth', adult: false },
  { text: 'Кто твой тайный герой?', type: 'truth', adult: false },
  { text: 'Какую суперспособность ты бы хотел(а)?', type: 'truth', adult: false },
  { text: 'Расскажи самую странную историю из твоей жизни', type: 'truth', adult: false },
  { text: 'Кого из знаменитостей ты бы пригласил(а) на ужин?', type: 'truth', adult: false },
  { text: 'Какой самый странный комплимент ты получал(а)?', type: 'truth', adult: false },
  
  { text: 'Станцуй танец без музыки 30 секунд', type: 'dare', adult: false },
  { text: 'Спой свою любимую песню', type: 'dare', adult: false },
  { text: 'Покажи свою лучшую позу для фото', type: 'dare', adult: false },
  { text: 'Расскажи анекдот или смешную историю', type: 'dare', adult: false },
  { text: 'Попробуй говорить как робот 1 минуту', type: 'dare', adult: false },
  { text: 'Сделай 10 приседаний', type: 'dare', adult: false },
  { text: 'Покажи свою лучшую имитацию животного', type: 'dare', adult: false },
  { text: 'Говори рифмами следующие 3 хода', type: 'dare', adult: false },
];

export const adultQuestions: Question[] = [
  { text: 'Какая у тебя самая пикантная фантазия?', type: 'truth', adult: true },
  { text: 'Расскажи о своем самом страстном поцелуе', type: 'truth', adult: true },
  { text: 'Где самое необычное место, где ты целовался(ась)?', type: 'truth', adult: true },
  { text: 'Какой самый смелый комплимент ты получал(а)?', type: 'truth', adult: true },
  { text: 'Опиши свой идеальный романтический вечер', type: 'truth', adult: true },
  { text: 'Что самое рискованное ты делал(а) на свидании?', type: 'truth', adult: true },
  { text: 'Какая у тебя самая секретная мечта о романтике?', type: 'truth', adult: true },
  { text: 'Расскажи о самом запоминающемся флирте', type: 'truth', adult: true },
  
  { text: 'Сделай комплимент каждому игроку в сексуальной манере', type: 'dare', adult: true },
  { text: 'Станцуй соблазнительный танец 30 секунд', type: 'dare', adult: true },
  { text: 'Поцелуй любого игрока в щеку страстно', type: 'dare', adult: true },
  { text: 'Покажи свою лучшую соблазнительную позу', type: 'dare', adult: true },
  { text: 'Расскажи эротическую историю за 30 секунд', type: 'dare', adult: true },
  { text: 'Флиртуй с любым игроком 1 минуту', type: 'dare', adult: true },
  { text: 'Покажи свой лучший соблазнительный взгляд', type: 'dare', adult: true },
  { text: 'Признайся в тайной симпатии к кому-то из игроков', type: 'dare', adult: true },
];
