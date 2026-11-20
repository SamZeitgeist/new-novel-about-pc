/* ============================================================
   Данные комплектующих.
   Модели и цены — каталог DNS (dns-shop.ru), ноябрь 2026.
   Цены розничные, Москва, могут меняться.
   ============================================================ */

window.CATEGORIES = [
  { id: 'cpu',    name: 'Процессор',        hint: 'Сердце сборки' },
  { id: 'mb',     name: 'Материнская плата', hint: 'Сокет и память' },
  { id: 'ram',    name: 'Оперативная память', hint: 'DDR4 или DDR5' },
  { id: 'gpu',    name: 'Видеокарта',       hint: 'Картинка и кадры' },
  { id: 'ssd',    name: 'Накопитель',       hint: 'SSD M.2' },
  { id: 'psu',    name: 'Блок питания',     hint: 'Ватты и провода' },
  { id: 'case',   name: 'Корпус',           hint: 'Дом для железа' },
  { id: 'cooler', name: 'Охлаждение',       hint: 'Чтобы не грелось' }
];

window.PARTS = {
  cpu: [
    {
      id: 'r5-5500', short: 'Ryzen 5 5500', name: 'Процессор AMD Ryzen 5 5500 OEM',
      price: 8799, socket: 'AM4', cores: 6, tdp: 65, igpu: false, perf: 62,
      desc: 'Шесть ядер за восемь тысяч. Не космос, но в 1080p всё ещё живой. Встроенной графики нет — видеокарту не забудь.',
      specs: ['AM4', '6 ядер / 12 потоков', '65 Вт', 'без графики']
    },
    {
      id: 'i5-12400f', short: 'Core i5-12400F', name: 'Процессор Intel Core i5-12400F OEM',
      price: 12499, socket: 'LGA1700', cores: 6, tdp: 117, igpu: false, perf: 68,
      desc: 'Народный Интел. Девять из десяти сборок в этом зале — на нём. Греется терпимо, стоит разумно.',
      specs: ['LGA 1700', '6 ядер / 12 потоков', '117 Вт', 'без графики']
    },
    {
      id: 'r5-7500f', short: 'Ryzen 5 7500F', name: 'Процессор AMD Ryzen 5 7500F OEM',
      price: 12299, socket: 'AM5', cores: 6, tdp: 65, igpu: false, perf: 78,
      desc: 'Это AM5. Дороже плата и память, зато потом можно поставить что-то серьёзнее, не меняя всё.',
      specs: ['AM5', '6 ядер / 12 потоков', '65 Вт', 'DDR5']
    },
    {
      id: 'r5-5600g', short: 'Ryzen 5 5600G', name: 'Процессор AMD Ryzen 5 5600G OEM',
      price: 21499, socket: 'AM4', cores: 6, tdp: 65, igpu: true, perf: 58,
      desc: 'Тот же 5500, но со встройкой Vega 7. Если видеокарту пока не берёшь — вот твой вариант.',
      specs: ['AM4', '6 ядер / 12 потоков', '65 Вт', 'Radeon Vega 7']
    },
    {
      id: 'i5-14600kf', short: 'Core i5-14600KF', name: 'Процессор Intel Core i5-14600KF OEM',
      price: 24999, socket: 'LGA1700', cores: 14, tdp: 181, igpu: false, perf: 88,
      desc: 'Четырнадцать ядер. Греется, как чайник, но монтаж летает. Под него нужен нормальный кулер, а не «как-нибудь потом».',
      specs: ['LGA 1700', '14 ядер', '181 Вт', 'без графики']
    },
    {
      id: 'r7-9800x3d', short: 'Ryzen 7 9800X3D', name: 'Процессор AMD Ryzen 7 9800X3D OEM',
      price: 40299, socket: 'AM5', cores: 8, tdp: 120, igpu: true, perf: 100,
      desc: 'Лучший игровой процессор на свете. Стоит как половина сборки. Хочешь — бери, я не мама.',
      specs: ['AM5', '8 ядер / 16 потоков', '120 Вт', 'Radeon Graphics']
    }
  ],

  mb: [
    {
      id: 'b550m-k', short: 'GIGABYTE B550M K', name: 'Материнская плата GIGABYTE B550M K',
      price: 8199, socket: 'AM4', mem: 'DDR4', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'Дешёвая AM4. Два M.2, четыре слота памяти, ничего лишнего. Идеальна, если бюджет — это бюджет.',
      specs: ['AM4', 'B550', 'DDR4', '2 x M.2']
    },
    {
      id: 'b760m-p', short: 'MSI PRO B760M-P DDR4', name: 'Материнская плата MSI PRO B760M-P DDR4',
      price: 9999, socket: 'LGA1700', mem: 'DDR4', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'Под Intel, на DDR4. Если хочешь сэкономить на памяти — вот, но учти, что DDR4 сейчас тоже не подарок.',
      specs: ['LGA 1700', 'B760', 'DDR4', '2 x M.2']
    },
    {
      id: 'b650m-p', short: 'MSI PRO B650M-P', name: 'Материнская плата MSI PRO B650M-P',
      price: 9599, socket: 'AM5', mem: 'DDR5', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'AM5 начального уровня. DDR5 обязательна, и это больно. Зато сокет проживёт ещё пару поколений.',
      specs: ['AM5', 'B650', 'DDR5', '2 x M.2']
    },
    {
      id: 'b650m-rs', short: 'ASRock B650M Pro RS WiFi', name: 'Материнская плата ASRock B650M Pro RS WiFi',
      price: 14499, socket: 'AM5', mem: 'DDR5', form: 'Micro-ATX', m2: 3, wifi: true,
      desc: 'Три M.2 и Wi-Fi. Лучший баланс на AM5: не стыдно, не безумно дорого.',
      specs: ['AM5', 'B650', 'DDR5', '3 x M.2', 'Wi-Fi']
    },
    {
      id: 'b650m-gp', short: 'MSI B650M GAMING PLUS', name: 'Материнская плата MSI B650M GAMING PLUS WIFI',
      price: 16999, socket: 'AM5', mem: 'DDR5', form: 'Micro-ATX', m2: 2, wifi: true,
      desc: 'Нормальное питание и четыре слота памяти. Под 9800X3D — минимум, на котором я бы согласилась собирать.',
      specs: ['AM5', 'B650', 'DDR5', '2 x M.2', 'Wi-Fi']
    },
    {
      id: 'b760m-gx', short: 'GIGABYTE B760M GAMING X', name: 'Материнская плата GIGABYTE B760M GAMING X DDR4 GEN5',
      price: 14699, socket: 'LGA1700', mem: 'DDR4', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'Intel с запасом под 14600KF. DDR4 — чтобы не платить за память как за видеокарту.',
      specs: ['LGA 1700', 'B760', 'DDR4', '2 x M.2', 'PCIe 5.0']
    },
    {
      id: 'b550m-aorus', short: 'GIGABYTE B550M AORUS ELITE', name: 'Материнская плата GIGABYTE B550M AORUS ELITE',
      price: 9699, socket: 'AM4', mem: 'DDR4', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'AM4, но с радиаторами на питании и нормальным звуком. За полторы тысячи сверху получаешь плату, к которой потом не хочется возвращаться.',
      specs: ['AM4', 'B550', 'DDR4', '2 x M.2']
    },
    {
      id: 'b650m-k', short: 'ASUS PRIME B650M-K', name: 'Материнская плата ASUS PRIME B650M-K',
      price: 9399, socket: 'AM5', mem: 'DDR5', form: 'Micro-ATX', m2: 2, wifi: false,
      desc: 'Самый дешёвый вход в AM5. Два слота памяти, два M.2, никакого Wi-Fi. Дёшево — не значит плохо, но значит «без излишеств».',
      specs: ['AM5', 'B650', 'DDR5', '2 x M.2']
    }
  ],

  ram: [
    {
      id: 'd35-16', short: 'XPG GAMMIX D35 16 ГБ', name: 'DDR4 ADATA XPG GAMMIX D35 16 ГБ (2x8) 3200 МГц',
      price: 13999, type: 'DDR4', gb: 16, speed: 3200,
      desc: 'Шестнадцать гигов DDR4. В этом году память подорожала так, что я перестала шутить про курс валют.',
      specs: ['DDR4', '16 ГБ (2x8)', '3200 МГц', 'CL16']
    },
    {
      id: 'fury4-16', short: 'FURY Beast DDR4 16 ГБ', name: 'DDR4 Kingston FURY Beast Black 16 ГБ (2x8) 3200 МГц',
      price: 18999, type: 'DDR4', gb: 16, speed: 3200,
      desc: 'То же самое, но с радиаторами и именем. Пять тысяч рублей за надпись — решай сама.',
      specs: ['DDR4', '16 ГБ (2x8)', '3200 МГц', 'CL16']
    },
    {
      id: 'lancer5-16', short: 'XPG Lancer 16 ГБ DDR5', name: 'DDR5 ADATA XPG Lancer Blade 16 ГБ 6000 МГц',
      price: 30299, type: 'DDR5', gb: 16, speed: 6000,
      desc: 'Одна планка DDR5 на шестнадцать. Вторую воткнёшь потом — если найдёшь по нормальной цене. А она не будет нормальной.',
      specs: ['DDR5', '16 ГБ (1x16)', '6000 МГц', 'CL30']
    },
    {
      id: 'fury5-16', short: 'FURY Beast DDR5 16 ГБ', name: 'DDR5 Kingston FURY Beast Black 16 ГБ 6000 МГц',
      price: 34299, type: 'DDR5', gb: 16, speed: 6000,
      desc: 'DDR5, шесть тысяч, CL30. Дорого. Очень. Но быстрее — и это не маркетинг.',
      specs: ['DDR5', '16 ГБ (1x16)', '6000 МГц', 'CL30']
    },
    {
      id: 'fury5-32', short: 'FURY Beast DDR5 32 ГБ', name: 'DDR5 Kingston FURY Beast Black 32 ГБ (2x16) 6000 МГц',
      price: 54999, type: 'DDR5', gb: 32, speed: 6000,
      desc: 'Тридцать два гигабайта. Для монтажа — то, что надо. Для кошелька — то, что больно.',
      specs: ['DDR5', '32 ГБ (2x16)', '6000 МГц', 'CL36']
    },
    {
      id: 'lancer5-32', short: 'XPG Lancer 32 ГБ DDR5', name: 'DDR5 ADATA XPG Lancer Blade 32 ГБ (2x16) 6000 МГц',
      price: 56999, type: 'DDR5', gb: 32, speed: 6000,
      desc: 'То же, но радиаторы повыше и на две тысячи дороже. Иногда красота стоит именно столько.',
      specs: ['DDR5', '32 ГБ (2x16)', '6000 МГц', 'CL36']
    }
  ],

  gpu: [
    {
      id: 'none', short: 'Без видеокарты', name: 'Без видеокарты — только встроенная графика',
      price: 0, vram: 0, len: 0, tdp: 0, power: 'none', perf: 14, tier: 0,
      desc: 'Пока без видеокарты. Тогда процессор должен быть со встроенной графикой, иначе на экране будет очень красивая чернота.',
      specs: ['0 ₽', 'встройка', '1080p, низкие']
    },
    {
      id: 'rtx3050', short: 'Palit RTX 3050 6 ГБ', name: 'Видеокарта Palit GeForce RTX 3050 StormX 6 ГБ',
      price: 29999, vram: 6, len: 168, tdp: 70, power: '8pin', perf: 34, tier: 1,
      desc: 'Шесть гигов и один вентилятор. В 1080p — да, в остальном — нет. Но за эти деньги она хотя бы новая и с гарантией.',
      specs: ['6 ГБ GDDR6', '168 мм', '70 Вт', '8-pin']
    },
    {
      id: 'rx7600', short: 'ASRock RX 7600 8 ГБ', name: 'Видеокарта ASRock Radeon RX 7600 Challenger OC 8 ГБ',
      price: 39999, vram: 8, len: 267, tdp: 165, power: '8pin', perf: 48, tier: 2,
      desc: 'Восемь гигов, честные 1080p на высоких. Без DLSS, зато дешевле конкурента.',
      specs: ['8 ГБ GDDR6', '267 мм', '165 Вт', '8-pin']
    },
    {
      id: 'rtx5060', short: 'Palit RTX 5060 8 ГБ', name: 'Видеокарта Palit GeForce RTX 5060 Dual 8 ГБ',
      price: 54999, vram: 8, len: 200, tdp: 145, power: '8pin', perf: 56, tier: 3,
      desc: 'Свежая, тихая, с DLSS 4. В 1080p — почти везде шестьдесят кадров и выше. Хороший выбор, если не хочется думать.',
      specs: ['8 ГБ GDDR7', '200 мм', '145 Вт', '8-pin']
    },
    {
      id: 'rtx5070', short: 'Palit RTX 5070 12 ГБ', name: 'Видеокарта Palit GeForce RTX 5070 Infinity 3 12 ГБ',
      price: 104999, vram: 12, len: 300, tdp: 250, power: '12v', perf: 76, tier: 4,
      desc: 'Двенадцать гигов GDDR7. 1440p — её родной режим. Триста миллиметров — проверь корпус, я серьёзно.',
      specs: ['12 ГБ GDDR7', '300 мм', '250 Вт', '12V-2x6']
    },
    {
      id: 'rtx5070ti', short: 'Palit RTX 5070 Ti 16 ГБ', name: 'Видеокарта Palit GeForce RTX 5070 Ti GamingPro-S 16 ГБ',
      price: 159999, vram: 16, len: 330, tdp: 300, power: '12v', perf: 90, tier: 5,
      desc: 'Шестнадцать гигов и триста тридцать миллиметров длины. Сначала измерь корпус, потом уже мечтай.',
      specs: ['16 ГБ GDDR7', '330 мм', '300 Вт', '12V-2x6']
    },
    {
      id: 'rtx3050-8', short: 'MSI RTX 3050 8 ГБ', name: 'Видеокарта MSI GeForce RTX 3050 VENTUS 2X XS OC 8 ГБ',
      price: 37999, vram: 8, len: 200, tdp: 115, power: '8pin', perf: 38, tier: 1,
      desc: 'Восемь гигов на 3050 — уже не смешно, а вполне нормально для 1080p. Два вентилятора, двадцать девять... тридцать восемь тысяч и гарантия.',
      specs: ['8 ГБ GDDR6', '200 мм', '115 Вт', '8-pin']
    }
  ],

  ssd: [
    {
      id: 'apacer', short: 'Apacer AS2280Q4X 1 ТБ', name: 'SSD Apacer AS2280Q4X 1 ТБ M.2 NVMe',
      price: 13499, gb: 1024, read: 5000,
      desc: 'Дешёвый терабайт. Всё равно быстрее, чем всё, что у неё было до этого.',
      specs: ['1 ТБ', 'PCIe 4.0', '5000 МБ/с']
    },
    {
      id: 'nv3', short: 'Kingston NV3 1 ТБ', name: 'SSD Kingston NV3 1 ТБ M.2 NVMe',
      price: 14199, gb: 1024, read: 6000,
      desc: 'Народный NV3. Шесть тысяч на чтение — для неё это будет выглядеть как магия.',
      specs: ['1 ТБ', 'PCIe 4.0', '6000 МБ/с']
    },
    {
      id: 'legend960', short: 'ADATA LEGEND 960 MAX 1 ТБ', name: 'SSD ADATA LEGEND 960 MAX 1 ТБ M.2 NVMe',
      price: 19599, gb: 1024, read: 7400,
      desc: 'Семь тысяч четыреста. Для 4K-монтажа уже имеет смысл, для игр — приятный бонус.',
      specs: ['1 ТБ', 'PCIe 4.0', '7400 МБ/с']
    },
    {
      id: 'kc3000', short: 'Kingston KC3000 1 ТБ', name: 'SSD Kingston KC3000 1 ТБ M.2 NVMe',
      price: 24999, gb: 1024, read: 7000,
      desc: 'Почти легенда, но на четыреста рублей дешевле легенды. Такое тоже бывает.',
      specs: ['1 ТБ', 'PCIe 4.0', '7000 МБ/с']
    },
    {
      id: '990pro', short: 'Samsung 990 PRO 1 ТБ', name: 'SSD Samsung 990 PRO 1 ТБ M.2 NVMe',
      price: 24599, gb: 1024, read: 7450,
      desc: 'Легенда. Дорого, зато не проседает под нагрузкой и не греется как печка.',
      specs: ['1 ТБ', 'PCIe 4.0', '7450 МБ/с']
    },
    {
      id: 'legend900', short: 'ADATA LEGEND 900 1 ТБ', name: 'SSD ADATA LEGEND 900 1 ТБ M.2 NVMe',
      price: 16499, gb: 1024, read: 7000,
      desc: 'Семь тысяч на чтение за шестнадцать с половиной. Чуть медленнее легенды и чуть дешевле — компромисс, который не болит.',
      specs: ['1 ТБ', 'PCIe 4.0', '7000 МБ/с']
    },
    {
      id: 'legend710', short: 'ADATA LEGEND 710 1 ТБ', name: 'SSD ADATA LEGEND 710 1 ТБ M.2 NVMe',
      price: 15299, gb: 1024, read: 2400,
      desc: 'PCIe 3.0. Старый, честный, недорогой. Для системы и игр — хватит, для 4K-монтажа — нет.',
      specs: ['1 ТБ', 'PCIe 3.0', '2400 МБ/с']
    }
  ],

  psu: [
    {
      id: 'stc650', short: 'Cougar STC 650', name: 'Блок питания Cougar STC 650, 650 Вт',
      price: 3199, watt: 650, cert: '80+', connector12: false,
      desc: 'Самый дешёвый в зале. Если что — не я его тебе советовала.',
      specs: ['650 Вт', '80+', 'без 12V-2x6']
    },
    {
      id: 'pf650', short: 'DEEPCOOL PF650', name: 'Блок питания DEEPCOOL PF650, 650 Вт',
      price: 3899, watt: 650, cert: '80+', connector12: false,
      desc: 'Честные шестьсот пятьдесят. Для сборки без видеокарты — за глаза.',
      specs: ['650 Вт', '80+', 'без 12V-2x6']
    },
    {
      id: 'a650bn', short: 'MSI MAG A650BN', name: 'Блок питания MSI MAG A650BN, 650 Вт',
      price: 4999, watt: 650, cert: '80+ Bronze', connector12: false,
      desc: 'Бронза и пять лет гарантии. Мой стандарт для средних сборок.',
      specs: ['650 Вт', '80+ Bronze', 'без 12V-2x6']
    },
    {
      id: 'gec850', short: 'Cougar GEC 850', name: 'Блок питания Cougar GEC 850, 850 Вт',
      price: 7299, watt: 850, cert: '80+ Gold', connector12: false,
      desc: 'Восемьсот пятьдесят и Gold. Хватит на 5070 с запасом, но переходник для карты докупишь отдельно.',
      specs: ['850 Вт', '80+ Gold', 'без 12V-2x6']
    },
    {
      id: 'vita850', short: 'FSP VITA GM 850W', name: 'Блок питания FSP VITA GM 850W White, 850 Вт',
      price: 12299, watt: 850, cert: '80+ Gold', connector12: true,
      desc: 'Белый, модульный, с родным 12V-2x6. Для карт, которые жрут как холодильник.',
      specs: ['850 Вт', '80+ Gold', '12V-2x6']
    }
  ],

  case: [
    {
      id: 'dexp', short: 'DEXP DCM-410B', name: 'Корпус DEXP DCM-410B, белый',
      price: 1650, maxGpu: 280, fans: 0, color: 'белый',
      desc: 'Серый ящик. Вентиляторов нет. Экономия видна глазами, но за тысячу шестьсот — это честно.',
      specs: ['Mid-Tower', 'до 280 мм', 'без вентиляторов']
    },
    {
      id: 'mx160w', short: 'Cougar MX160 ARGB White', name: 'Корпус Cougar MX160 ARGB White',
      price: 3899, maxGpu: 330, fans: 4, color: 'белый',
      desc: 'Четыре ARGB-вентилятора и белый цвет. Берут чаще, чем ты думаешь. И не только девушки.',
      specs: ['Mid-Tower', 'до 330 мм', '4 x 120 мм ARGB']
    },
    {
      id: 'mx160b', short: 'Cougar MX160 ARGB Black', name: 'Корпус Cougar MX160 ARGB, чёрный',
      price: 4099, maxGpu: 330, fans: 4, color: 'чёрный',
      desc: 'То же самое, но чёрный и на двести рублей дороже. Не спрашивай почему, я тоже не знаю.',
      specs: ['Mid-Tower', 'до 330 мм', '4 x 120 мм ARGB']
    },
    {
      id: 'lan215', short: 'LIAN LI LANCOOL 215', name: 'Корпус LIAN LI LANCOOL 215 White',
      price: 4999, maxGpu: 350, fans: 3, color: 'белый',
      desc: 'Два двухсотых вентилятора спереди. Дует так, что слышно в коридоре, зато железо холодное.',
      specs: ['Mid-Tower', 'до 350 мм', '2 x 200 + 1 x 120 мм']
    },
    {
      id: 'o11air', short: 'LIAN LI O11 Air', name: 'Корпус LIAN LI O11 Air, чёрный',
      price: 4099, maxGpu: 380, fans: 2, color: 'чёрный',
      desc: 'Стекло, сетка, простор. Смотрится дороже, чем стоит. Редкий случай, когда я советую без оговорок.',
      specs: ['Mid-Tower', 'до 380 мм', '2 x 120 мм']
    }
  ],

  cooler: [
    {
      id: 'se903', short: 'ID-COOLING SE-903-XT', name: 'Кулер ID-COOLING SE-903-XT',
      price: 999, tdp: 130, kind: 'air',
      desc: 'Девяносто два миллиметра и сто тридцать ватт. На 5500 хватит, на 14600KF — нет.',
      specs: ['башня', '130 Вт', '92 мм']
    },
    {
      id: 'ag400', short: 'DEEPCOOL AG400', name: 'Кулер DEEPCOOL AG400',
      price: 1699, tdp: 220, kind: 'air',
      desc: 'Четыре теплотрубки, двести двадцать ватт. Народный выбор, и не зря.',
      specs: ['башня', '220 Вт', '120 мм']
    },
    {
      id: 'se224', short: 'ID-COOLING SE-224-XTS', name: 'Кулер ID-COOLING SE-224-XTS ARGB',
      price: 1899, tdp: 220, kind: 'air',
      desc: 'То же, но с подсветкой. Двести рублей за красоту — единственная честная наценка в этом зале.',
      specs: ['башня', '220 Вт', 'ARGB']
    },
    {
      id: 'ak620', short: 'DEEPCOOL AK620', name: 'Кулер DEEPCOOL AK620',
      price: 4899, tdp: 260, kind: 'air',
      desc: 'Две башни, двести шестьдесят ватт. Под 14600KF — минимум, меньше ставить страшно.',
      specs: ['двухбашенный', '260 Вт', '2 x 120 мм']
    },
    {
      id: 'le360', short: 'DEEPCOOL LE360 V2', name: 'СЖО DEEPCOOL LE360 V2',
      price: 5999, tdp: 300, kind: 'aio',
      desc: 'Водянка на триста ватт. Тише, чем кажется, и красивее, чем нужно.',
      specs: ['СЖО 360', '300 Вт', 'ARGB']
    },
    {
      id: 'lf3', short: 'Arctic Liquid Freezer III 360', name: 'СЖО ARCTIC Liquid Freezer III Pro 360',
      price: 10399, tdp: 320, kind: 'aio',
      desc: 'Лучшее, что можно поставить на 9800X3D, если не хочешь слушать вентиляторы по ночам.',
      specs: ['СЖО 360', '320 Вт', 'тихая']
    },
    {
      id: 'ak400', short: 'DEEPCOOL AK400', name: 'Кулер DEEPCOOL AK400',
      price: 2050, tdp: 220, kind: 'air',
      desc: 'Брат AG400: те же четыре трубки и двести двадцать ватт, но другой вентилятор и плюс триста пятьдесят рублей. Берут за тишину.',
      specs: ['башня', '220 Вт', '120 мм']
    }
  ]
};

/* Стартовые наборы для трёх стратегий */
window.PRESETS = {
  cheap: {
    plan: 'cheap',
    build: { cpu: 'r5-5600g', mb: 'b550m-k', ram: 'd35-16', gpu: 'none', ssd: 'apacer', psu: 'pf650', case: 'dexp', cooler: 'se903' }
  },
  mid: {
    plan: 'mid',
    build: { cpu: 'r5-7500f', mb: 'b650m-p', ram: 'lancer5-16', gpu: 'rx7600', ssd: 'nv3', psu: 'a650bn', case: 'mx160w', cooler: 'ag400' }
  },
  lux: {
    plan: 'lux',
    build: { cpu: 'r7-9800x3d', mb: 'b650m-gp', ram: 'fury5-32', gpu: 'rtx5070ti', ssd: '990pro', psu: 'vita850', case: 'o11air', cooler: 'lf3' }
  }
};

/* ============================================================
   Режим сборки ноутбука: категории, комплектующие, пресеты.
   ============================================================ */

window.LAPTOP_CONFIG = { cash: 50000 };

window.CATEGORIES_LAPTOP = [
  { id: 'ram', name: 'Оперативная память', hint: 'Добавь объём и скорость' },
  { id: 'storage', name: 'SSD-накопитель', hint: 'Место для системы и файлов' },
  { id: 'wifi', name: 'Wi-Fi и Bluetooth', hint: 'Беспроводная связь' },
  { id: 'battery', name: 'Аккумулятор', hint: 'Время работы без розетки' },
  { id: 'cooling', name: 'Охлаждение', hint: 'Вентилятор и термоинтерфейс' },
  { id: 'display', name: 'Экран', hint: 'Размер, разрешение и плавность' }
];

window.PARTS_LAPTOP = {
  ram: [
    { id: 'ram-8', short: '8 ГБ DDR4', name: 'Оперативная память SO-DIMM 8 ГБ DDR4 3200 МГц', price: 6799, gb: 8, desc: 'Базовый объём для документов, браузера и онлайн-лекций. Перед покупкой проверь тип памяти и свободные слоты.', specs: ['8 ГБ', 'DDR4 SO-DIMM', '3200 МГц'] },
    { id: 'ram-16', short: '16 ГБ DDR4/DDR5', name: 'Оперативная память SO-DIMM 16 ГБ', price: 14999, gb: 16, desc: 'Комфортный вариант для многозадачности. Тип DDR4 или DDR5 должен совпадать с поддержкой ноутбука.', specs: ['16 ГБ', 'SO-DIMM', 'Проверь поколение DDR'] },
    { id: 'ram-32', short: '32 ГБ DDR4/DDR5', name: 'Оперативная память SO-DIMM 32 ГБ', price: 26999, gb: 32, desc: 'Для тяжёлых программ, виртуальных машин и больших проектов. Совместимость зависит от модели ноутбука.', specs: ['32 ГБ', 'SO-DIMM', 'Проверь максимальный объём'] }
  ],
  storage: [
    { id: 'ssd-256', short: 'SSD 256 ГБ', name: 'SSD M.2 NVMe 256 ГБ', price: 6699, gb: 256, desc: 'Базовый объём для системы и учебных файлов. Убедись, что ноутбук поддерживает M.2 NVMe.', specs: ['256 ГБ', 'M.2 NVMe', 'PCIe'] },
    { id: 'ssd-512', short: 'SSD 512 ГБ', name: 'SSD M.2 NVMe 512 ГБ', price: 9999, gb: 512, desc: 'Универсальный объём для системы, программ и личных файлов.', specs: ['512 ГБ', 'M.2 NVMe', 'Проверь длину 2230/2242/2280'] },
    { id: 'ssd-1tb', short: 'SSD 1 ТБ', name: 'SSD M.2 NVMe 1 ТБ', price: 14699, gb: 1024, desc: 'Хороший запас места для игр, проектов и медиафайлов.', specs: ['1 ТБ', 'M.2 NVMe', 'PCIe 4.0'] }
  ],
  wifi: [
    { id: 'wifi-ac', short: 'Wi-Fi 5', name: 'Модуль Wi-Fi 5 + Bluetooth', price: 2499, desc: 'Базовое беспроводное подключение. Подходит только для ноутбуков со сменным совместимым модулем.', specs: ['802.11ac', 'Bluetooth', 'Проверь формат и разъём'] },
    { id: 'wifi-ax', short: 'Wi-Fi 6', name: 'Модуль Wi-Fi 6 + Bluetooth 5.x', price: 3999, desc: 'Более современный стандарт Wi-Fi для стабильной работы в загруженных сетях.', specs: ['802.11ax', 'Bluetooth 5.x', 'M.2 Key E — если поддерживается'] },
    { id: 'wifi-none', short: 'Оставить штатный', name: 'Оставить установленный модуль Wi-Fi', price: 0, desc: 'Ничего менять не нужно, если штатный модуль работает нормально.', specs: ['Без замены', 'Без дополнительных затрат'] }
  ],
  battery: [
    { id: 'bat-45', short: '45 Вт·ч', name: 'Совместимый аккумулятор 45 Вт·ч', price: 6999, desc: 'Замена для компактных моделей. Нужен аккумулятор с точным совпадением парт-номера и разъёма.', specs: ['45 Вт·ч', 'Проверь парт-номер', 'Совместимость с корпусом'] },
    { id: 'bat-60', short: '60 Вт·ч', name: 'Совместимый аккумулятор 60 Вт·ч', price: 8999, desc: 'Сбалансированный вариант, если такая ёмкость предусмотрена производителем ноутбука.', specs: ['60 Вт·ч', 'Проверь парт-номер', 'Совместимость с корпусом'] },
    { id: 'bat-80', short: '80 Вт·ч', name: 'Совместимый аккумулятор 80 Вт·ч', price: 11999, desc: 'Повышенная ёмкость только для моделей, в которых такой аккумулятор физически и электрически поддерживается.', specs: ['80 Вт·ч', 'Проверь парт-номер', 'Совместимость с корпусом'] }
  ],
  cooling: [
    { id: 'fan-basic', short: 'Штатный вентилятор', name: 'Совместимый вентилятор охлаждения', price: 3999, desc: 'Замена шумного или неисправного вентилятора. Подбирается строго по модели ноутбука.', specs: ['Вентилятор', 'Проверь модель и ревизию'] },
    { id: 'thermal', short: 'Термопаста', name: 'Обслуживание охлаждения: термопаста', price: 999, desc: 'Замена термоинтерфейса может помочь при перегреве, если обслуживание разрешено конструкцией устройства.', specs: ['Термопаста', 'Требуется разборка'] },
    { id: 'cooling-pad', short: 'Охлаждающая подставка', name: 'Внешняя охлаждающая подставка для ноутбука', price: 2499, desc: 'Не требует разборки ноутбука и может улучшить приток воздуха.', specs: ['USB-питание', 'Внешний аксессуар'] }
  ],
  display: [
    { id: 'fhd-60', short: '15.6″ FHD 60 Гц', name: 'Совместимая матрица 15.6″ Full HD IPS 60 Гц', price: 8999, desc: 'Экран для замены повреждённой матрицы. Перед покупкой проверь диагональ, крепления и разъём.', specs: ['15.6″', '1920×1080', 'IPS', '60 Гц'] },
    { id: 'fhd-ips', short: '15.6″ FHD 144 Гц', name: 'Совместимая матрица 15.6″ Full HD 144 Гц', price: 12999, desc: 'Более плавное изображение, если ноутбук поддерживает такую матрицу и её частоту.', specs: ['15.6″', '1920×1080', '144 Гц', 'Проверь eDP и крепления'] },
    { id: 'qhd-16', short: '16″ 2.5K', name: 'Совместимая матрица 16″ 2560×1600 IPS', price: 16999, desc: 'Экран с высокой чёткостью. Установка возможна только при полной совместимости с конкретной моделью.', specs: ['16″', '2560×1600', 'IPS', 'Проверь разъём и крепления'] }
  ]
};

window.PRESETS_LAPTOP = {
  cheap: {
    plan: 'cheap',
    build: { ram: 'ram-8', storage: 'ssd-256', wifi: 'wifi-none', battery: 'bat-45', cooling: 'cooling-pad', display: 'fhd-60' }
  },
  mid: {
    plan: 'mid',
    build: { ram: 'ram-16', storage: 'ssd-512', wifi: 'wifi-ax', battery: 'bat-60', cooling: 'thermal', display: 'fhd-60' }
  },
  lux: {
    plan: 'lux',
    build: { ram: 'ram-32', storage: 'ssd-1tb', wifi: 'wifi-ax', battery: 'bat-80', cooling: 'fan-basic', display: 'qhd-16' }
  }
};
