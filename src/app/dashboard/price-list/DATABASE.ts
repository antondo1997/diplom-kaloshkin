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
  feature: ProductFeature[];
}

export const DATABASE: Product[] = [
  {
    id: '0', name: 'МОНИТОР МЕДИЦИНСКИЙ «ИНТЕГРАЛ»', imgLink: 'https://integral.by/sites/default/files/monitor.gif',
    quantity: 4, price: 123,
    feature: [
      {name: 'ЭКГ кабель пациента', value: '3 проводной/5 проводной'},
      {name: 'Количество отведений измерения ЭКГ', value: '3/7'},
      {name: 'при 3-проводном кабеле пациента', value: 'I, II, III'}
    ]
  },
  {
    id: '1', name: 'ТЕРМОМЕТР ЭЛЕКТРОННЫЙ "ИНТЕГРАЛ ТЭ-04"', imgLink: 'https://integral.by/sites/default/files/termometr_integral_te06.gif',
    quantity: 9, price: 12,
    feature: [
      {name: 'Диапазон измеряемых температур, °C', value: 'от 32,0 до 42,0'},
      {name: 'Абсолютная погрешность измерений, °C', value: '±0,10'},
      {name: 'Срок энергетической автономности (ресурс) элемента питания, лет, не менее', value: '2'},
      {name: 'Масса, не более, г', value: '20'},
    ]
  },
  // {
  //   id: '', name: '', imgLink: '',
  //   quantity: 0, price: 0,
  //   feature: [
  //     {name: '', value: ''}
  //   ]
  // }
]
