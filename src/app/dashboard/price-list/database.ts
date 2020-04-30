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
    quantity: 4, price: 123,
    features: [
      {name: 'ЭКГ кабель пациента', value: '3 проводной/5 проводной'},
      {name: 'Количество отведений измерения ЭКГ', value: '3/7'},
      {name: 'при 3-проводном кабеле пациента', value: 'I, II, III'}
    ]
  },
  {
    id: '1', name: 'ТЕРМОМЕТР ЭЛЕКТРОННЫЙ "ИНТЕГРАЛ ТЭ-04"', imgLink: 'https://integral.by/sites/default/files/termometr_integral_te06.gif',
    quantity: 9, price: 12,
    features: [
      {name: 'Диапазон измеряемых температур, °C', value: 'от 32,0 до 42,0'},
      {name: 'Абсолютная погрешность измерений, °C', value: '±0,10'},
      {name: 'Срок энергетической автономности (ресурс) элемента питания, лет, не менее', value: '2'},
      {name: 'Масса, не более, г', value: '20'},
    ]
  },
  {
    id: '2', name: 'ИНДИКАТОР ПИКОВОЙ СКОРОСТИ ВЫДОХА', imgLink: 'https://integral.by/sites/default/files/ipsv_1.jpg',
    quantity: 7, price: 65,
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
    quantity: 10, price: 321,
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
    quantity: 32, price: 99,
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
    id: '5', name: 'ГЕНЕРАТОР ЭЛЕКТРОХИРУРГИЧЕСКИЙ «ЭХГ ИНТЕГРАЛ»', imgLink: 'https://integral.by/sites/default/files/generator_elektrohirurgicheskii1.gif',
    quantity: 17, price: 66,
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
]
