export interface ProductFeature {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  imgLink: string;
  price: number;
  quantity: number;
  features: ProductFeature[];
}

export const DATABASE: Product[] = [
  {
    id: '0', name: 'МОНИТОР МЕДИЦИНСКИЙ «ИНТЕГРАЛ»', imgLink: 'https://integral.by/sites/default/files/monitor.gif',
    quantity: 7, price: 6500,
    features: [
      {name: 'ЭКГ кабель пациента', value: '3 проводной/5 проводной'},
      {name: 'Количество отведений измерения ЭКГ', value: '3/7'},
      {name: 'при 3-проводном кабеле пациента', value: 'I, II, III'},
      {name: 'Скорость отображения, мм/с', value: 'от 25 до 250'},
      {name: 'Диапазон измерений давления для взрослых, мм рт. ст.', value: 'от 20 до 250'},
      {name: 'Диапазон измерений давления для детей, мм рт. ст.', value: 'от 20 до 180'},

    ]
  },
  {
    id: '1', name: 'ТЕРМОМЕТР ЭЛЕКТРОННЫЙ "ИНТЕГРАЛ ТЭ-04"', imgLink: 'https://integral.by/sites/default/files/termometr_integral_te06.gif',
    quantity: 75, price: 8,
    features: [
      {name: 'Диапазон измеряемых температур, °C', value: 'от 32,0 до 42,0'},
      {name: 'Абсолютная погрешность измерений, °C', value: '±0,10'},
      {name: 'Срок энергетической автономности (ресурс) элемента питания, лет, не менее', value: '2'},
      {name: 'Масса, не более, г', value: '20'},
    ]
  },
  {
    id: '2', name: 'ИНДИКАТОР ПИКОВОЙ СКОРОСТИ ВЫДОХА', imgLink: 'https://integral.by/sites/default/files/ipsv_1.jpg',
    quantity: 45, price: 12,
    features: [
      {name: 'Тип прибора', value: 'Механический, объемный'},
      {name: 'Диапазон показаний', value: 'Цветовая шкала'},
      {name: 'ТЦена деления шкалы', value: 'Не нормирована'},
      {name: 'Внутренний диаметр мундштука, не менее, мм', value: '16'},
      {name: 'Габаритные размеры, (длина х ширина х высота), мм', value: '186 х 61 х 38,2'},
      {name: 'Масса, г', value: '70 ± 10'},
      {name: 'Срок службы не менее, лет', value: '3'},
    ]
  },
  {
    id: '3', name: 'АППАРАТ ИСКУССТВЕННОЙ ВЕНТИЛЯЦИИ ЛЕГКИХ «ИВЛ ИНТЕГРАЛ»', imgLink: 'https://integral.by/sites/default/files/15_1.gif',
    quantity: 10, price: 45000,
    features: [
      {name: 'Концентрация О2, %', value: 'от 21 до 100'},
      {name: 'Время вдоха, с', value: 'от 0,1 до 3,0'},
      {name: 'Постоянное положительное давление в дыхательных путях, мбар', value: 'от 0 до 20'},
      {name: 'Давление на вдохе, мбар', value: 'от 0 до 65'},
      {name: 'Дыхательный объем, мл', value: 'от 30 до 200'},
      {name: 'Скорость потока, л/мин', value: ' от 0,2 до 32'},
      {name: 'Объем выдоха, мл', value: 'от 0 до 999'},
      {name: 'Пиковое давление, мбар', value: 'от 11,2:2 до 1: 600'},
    ]
  },
  {
    id: '4', name: 'АППАРАТ МОБИЛЬНЫЙ ИСКУССТВЕННОЙ ВЕНТИЛЯЦИИ ЛЁГКИХ', imgLink: 'https://integral.by/sites/default/files/17.jpg',
    quantity: 32, price: 15000,
    features: [
      {name: 'Частота дыхания, мин-1', value: 'от 5 до 70'},
      {name: 'Предел давления, мбар', value: 'от 5 до 50'},
      {name: 'Положительное давление конца выдоха (PEEP), мбар', value: 'от 0 до 20'},
      {name: 'Минутный объём (Vi), л/мин', value: 'от 1 до 16'},
      {name: 'Дыхательный объём (Vt), мл', value: 'от 20 до 300'},
      {name: 'Соотношение времени вдоха ко времени выдоха (I:E)', value: '1:1,5'},
      {name: 'Концентрация кислорода, %', value: '50'},
    ]
  },
  {
    id: '5',
    name: 'ГЕНЕРАТОР ЭЛЕКТРОХИРУРГИЧЕСКИЙ «ЭХГ ИНТЕГРАЛ»',
    imgLink: 'https://integral.by/sites/default/files/generator_elektrohirurgicheskii1.gif',
    quantity: 44, price: 7000,
    features: [
      {name: 'Напряжение питания от сети переменного тока частотой 50, В', value: '230±23'},
      {name: 'Максимальная потребляемая мощность, Вт, не более', value: '800'},
      {name: 'Номинальная частота переменного напряжения на выходах, кГц', value: '410±8,2'},
      {name: 'Вспомогательный ток нейтрального электрода, не более, мкА', value: '300'},
      {name: 'Ток потребления в режиме ожидания, не более, мкА', value: '120'},
      {name: 'Габаритные размеры, мм', value: '470x380x160'},
      {name: 'Масса, не более, кг', value: '9,0'},
    ]
  },
  {
    id: '6',
    name: 'ДОЗАТОР ЭЛЕКТРОННЫЙ АВТОМАТИЧЕСКИЙ ДЭА-100',
    imgLink: 'https://integral.by/sites/default/files/dozator_elektronnii_dea100.gif',
    quantity: 0, price: 500,
    features: [
      {name: 'Диапазон установки скорости инфузии (дискретность 0,1 мл/ч), мл/ч', value: '0,1 – 1500'},
      {name: 'Диапазон установки объема вводимой жидкости (дискретность 0,1 мл), мл', value: '0,1 – 999,9'},
      {name: 'Диапазон времени инфузии', value: 'от 1 мин до 99 ч 59 мин'},
      {name: 'Диапазон установки скорости болюсного введения, мл/ч', value: '1 – 1500'},
      {name: 'Диапазон установки вводимого объема болюса, мл', value: '0,1 – 25'},
      {name: 'Напряжение питания от сети переменного тока частотой 50 Гц, В', value: '230±23'},
      {name: 'Напряжение питания от встроенного источника питания (аккумуляторной батареи), В', value: '12'},
    ]
  },
  {
    id: '7', name: 'ИЗМЕРИТЕЛЬ АРТЕРИАЛЬНОГО ДАВЛЕНИЯ ИАД-05', imgLink: 'https://integral.by/sites/default/files/49_1.jpg',
    quantity: 23, price: 95,
    features: [
      {name: 'Вес с элементом питания (без манжеты), г', value: '500'},
      {name: 'Размер (без манжеты), мм', value: '147 х 105 х 80'},
      {name: 'Диапазон давления, мм рт. ст.', value: '20-280'},
      {name: 'Диапазон пульса, ударов в минуту', value: '40-199'},
      {name: 'Разрешение , мм рт. ст.', value: '1'},
      {name: 'Диапазон измерения диастолического давления, мм рт. ст.', value: '25-195'},
    ]
  },
  {
    id: '8', name: 'КОЙКА БОЛЬНИЧНАЯ «ИНТЕГРАЛ» КБМ-01', imgLink: 'https://integral.by/sites/default/files/kbm.gif',
    quantity: 34, price: 1800,
    features: [
      {name: 'Длина койки, мм, не более', value: '2115'},
      {name: 'Ширина койки, мм, не более', value: '1080'},
      {name: 'Высота койки (без штатива), мм, не более', value: '1150'},
      {name: 'Высота от пола до поверхности матраца, мм, не более', value: '640'},
      {name: 'Нагрузка на ложе, кг, не более', value: '170'},
      {name: 'Боковые ограждения', value: 'есть'},
      {name: 'Держатель для капельниц', value: 'есть'},
    ]
  },
  {
    id: '9', name: 'КАТАЛКА "ИНТЕГРАЛ КЭМ"', imgLink: 'https://integral.by/sites/default/files/36_1.jpg',
    quantity: 35, price: 4000,
    features: [
      {name: 'Регулировка высоты ложа каталки от уровня пола, мм', value: 'от 500 до 900'},
      {name: 'Угол наклона секции опоры спины, град.', value: 'от 0 до 70'},
      {name: 'Угол наклона секции опоры бедра и голени, град.', value: 'от 0 до 20'},
      {name: 'Положение Тренделенбурга, град.', value: 'от 0 до 10'},
      {name: 'Положение анти-Тренделенбурга, град.', value: 'от 0 до 10'},
      {name: 'Потребляемая мощность при зарядке аккумулятора, В (не более)', value: '140'},
      {name: 'Габаритные размеры, мм (не более)', value: '2100х750'},
      {name: 'Масса, кг (не более)', value: '110'},
    ]
  },
  // {
  //   id: '', name: '', imgLink: '',
  //   quantity: 0, price: 0,
  //   features: [
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //     {name: '', value: ''},
  //   ]
  // },
];
