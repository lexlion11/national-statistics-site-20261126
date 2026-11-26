// data/regions.js — prefectures: population, GDP per capita and unemployment by region.
// One job: the regional breakdown, from the Population Census and the prefectural accounts.

export const REGIONS = [
  {
    code: '01', name: 'Hokkaido', region: 'Hokkaido', capital: 'Sapporo',
    population: 5170460, gdpPerCapita: 27800, unemployment: 3.0, agedShare: 29.6, area: 83871,
    note: 'Largest prefecture by area, the fewest people per square kilometre in the country.',
  },
  {
    code: '02', name: 'Aomori', region: 'Tohoku', capital: 'Aomori',
    population: 1237982, gdpPerCapita: 23800, unemployment: 4.3, agedShare: 30.9, area: 13107,
    note: 'Oldest age structure of any prefecture, with a long history of out-migration.',
  },
  {
    code: '03', name: 'Iwate', region: 'Tohoku', capital: 'Morioka',
    population: 1196198, gdpPerCapita: 25200, unemployment: 4.0, agedShare: 29.9, area: 15277,
    note: 'Post-earthquake reconstruction has driven heavy public investment since 2011.',
  },
  {
    code: '04', name: 'Miyagi', region: 'Tohoku', capital: 'Sendai',
    population: 2258062, gdpPerCapita: 26800, unemployment: 3.8, agedShare: 28.2, area: 8282,
    note: 'Regional capital of the Tohoku region, an academic and manufacturing centre.',
  },
  {
    code: '05', name: 'Akita', region: 'Tohoku', capital: 'Akita',
    population: 963611, gdpPerCapita: 24000, unemployment: 4.1, agedShare: 31.8, area: 10373,
    note: 'The smallest population of the northern mainland and among the fastest shrinking.',
  },
  {
    code: '06', name: 'Yamagata', region: 'Tohoku', capital: 'Yamagata',
    population: 1073148, gdpPerCapita: 23300, unemployment: 3.9, agedShare: 30.6, area: 9213,
    note: 'Fruit growing and food processing shape the local economy.',
  },
  {
    code: '07', name: 'Fukushima', region: 'Tohoku', capital: 'Fukushima',
    population: 1833168, gdpPerCapita: 24500, unemployment: 4.2, agedShare: 29.4, area: 12375,
    note: 'Population has recovered to about three quarters of its pre-disaster level.',
  },
  {
    code: '08', name: 'Ibaraki', region: 'Kanto', capital: 'Mito',
    population: 2835887, gdpPerCapita: 33100, unemployment: 2.7, agedShare: 26.7, area: 6099,
    note: 'A manufacturing belt on the north-east side of the Kanto plain.',
  },
  {
    code: '09', name: 'Tochigi', region: 'Kanto', capital: 'Utsunomiya',
    population: 1926335, gdpPerCapita: 31400, unemployment: 2.8, agedShare: 27.2, area: 6498,
    note: 'Home to the Kanto plain\'s largest inland industrial zone.',
  },
  {
    code: '10', name: 'Gunma', region: 'Kanto', capital: 'Maebashi',
    population: 1938266, gdpPerCapita: 31300, unemployment: 2.7, agedShare: 27.0, area: 7463,
    note: 'Automobile and pharmaceutical manufacturing cluster.',
  },
  {
    code: '11', name: 'Saitama', region: 'Kanto', capital: 'Saitama',
    population: 7237356, gdpPerCapita: 32200, unemployment: 2.6, agedShare: 25.2, area: 3798,
    note: 'The most populous prefecture outside Tokyo itself, largely residential.',
  },
  {
    code: '12', name: 'Chiba', region: 'Kanto', capital: 'Chiba',
    population: 6289947, gdpPerCapita: 33800, unemployment: 2.8, agedShare: 26.0, area: 5174,
    note: 'Narita airport and the Tokyo Bay industrial belt sit inside its borders.',
  },
  {
    code: '13', name: 'Tokyo', region: 'Kanto', capital: 'Tokyo',
    population: 14118967, gdpPerCapita: 74000, unemployment: 2.2, agedShare: 20.6, area: 2194,
    note: 'The largest economy of the country by output, and the densest prefecture by far.',
  },
  {
    code: '14', name: 'Kanagawa', region: 'Kanto', capital: 'Yokohama',
    population: 9236853, gdpPerCapita: 42500, unemployment: 2.5, agedShare: 24.8, area: 2416,
    note: 'Yokohama port handles a large share of the country\'s container traffic.',
  },
  {
    code: '15', name: 'Niigata', region: 'Chubu', capital: 'Niigata',
    population: 2190064, gdpPerCapita: 27600, unemployment: 3.3, agedShare: 29.3, area: 12490,
    note: 'Rice farming on the Sea of Japan coast, and a nuclear power station.',
  },
  {
    code: '16', name: 'Toyama', region: 'Chubu', capital: 'Toyama',
    population: 1046673, gdpPerCapita: 30500, unemployment: 2.9, agedShare: 28.8, area: 4252,
    note: 'Pharmaceutical manufacturing makes up a large share of prefecture output.',
  },
  {
    code: '17', name: 'Ishikawa', region: 'Chubu', capital: 'Kanazawa',
    population: 1137936, gdpPerCapita: 28800, unemployment: 3.0, agedShare: 27.9, area: 4498,
    note: 'Kanazawa hosts one of the country\'s oldest universities.',
  },
  {
    code: '18', name: 'Fukui', region: 'Chubu', capital: 'Fukui',
    population: 773087, gdpPerCapita: 29700, unemployment: 2.7, agedShare: 28.9, area: 4180,
    note: 'Narrow streets and old textile mills in the old castle town of Fukui.',
  },
  {
    code: '19', name: 'Yamanashi', region: 'Chubu', capital: 'Kofu',
    population: 723361, gdpPerCapita: 27200, unemployment: 3.1, agedShare: 29.0, area: 4463,
    note: 'Wine and jewellery production sit alongside semiconductor manufacturing.',
  },
  {
    code: '20', name: 'Nagano', region: 'Chubu', capital: 'Nagano',
    population: 2090911, gdpPerCapita: 29800, unemployment: 2.9, agedShare: 28.3, area: 18345,
    note: 'Highland resort and semiconductor economy, with the fewest people of any large prefecture.',
  },
  {
    code: '21', name: 'Gifu', region: 'Chubu', capital: 'Gifu',
    population: 1841267, gdpPerCapita: 29000, unemployment: 2.9, agedShare: 28.1, area: 10621,
    note: 'A manufacturing prefecture of small, high-value component makers.',
  },
  {
    code: '22', name: 'Shizuoka', region: 'Chubu', capital: 'Shizuoka',
    population: 3682387, gdpPerCapita: 34100, unemployment: 2.4, agedShare: 27.7, area: 7778,
    note: 'Tea, ceramics and precision instruments, with Fuji and the Izu peninsula.',
  },
  {
    code: '23', name: 'Aichi', region: 'Chubu', capital: 'Nagoya',
    population: 7525273, gdpPerCapita: 39600, unemployment: 2.3, agedShare: 25.6, area: 5166,
    note: 'Automotive manufacturing capital of the country, centred on Toyota in Toyota City.',
  },
  {
    code: '24', name: 'Mie', region: 'Kinki', capital: 'Tsu',
    population: 1805628, gdpPerCapita: 28100, unemployment: 2.9, agedShare: 28.5, area: 5774,
    note: 'The industrial belt around the Yokkaichi petrochemical complex.',
  },
  {
    code: '25', name: 'Shiga', region: 'Kinki', capital: 'Otsu',
    population: 1417994, gdpPerCapita: 35000, unemployment: 2.4, agedShare: 25.7, area: 4018,
    note: 'The only prefecture whose name contains no kanji, and a centre of electronics.',
  },
  {
    code: '26', name: 'Kyoto', region: 'Kinki', capital: 'Kyoto',
    population: 2583330, gdpPerCapita: 39800, unemployment: 2.2, agedShare: 26.1, area: 4611,
    note: 'Tourism, electronics and machine tools share the prefectural economy.',
  },
  {
    code: '27', name: 'Osaka', region: 'Kinki', capital: 'Osaka',
    population: 8841551, gdpPerCapita: 44300, unemployment: 2.8, agedShare: 26.4, area: 2255,
    note: 'Japan\'s second city by output, a hub of trade, food and pharmaceuticals.',
  },
  {
    code: '28', name: 'Hyogo', region: 'Kinki', capital: 'Kobe',
    population: 5435167, gdpPerCapita: 33100, unemployment: 2.8, agedShare: 27.0, area: 8398,
    note: 'Kobe port carries a large share of Japan\'s freight.',
  },
  {
    code: '29', name: 'Nara', region: 'Kinki', capital: 'Nara',
    population: 1355272, gdpPerCapita: 27500, unemployment: 2.9, agedShare: 29.2, area: 5773,
    note: 'The prefecture with the lowest share of people in urban areas.',
  },
  {
    code: '30', name: 'Wakayama', region: 'Kinki', capital: 'Wakayama',
    population: 946034, gdpPerCapita: 25600, unemployment: 3.2, agedShare: 30.1, area: 4774,
    note: 'Orchards, steel and a long narrow coastline on the Kii peninsula.',
  },
  {
    code: '31', name: 'Tottori', region: 'Chugoku', capital: 'Tottori',
    population: 555696, gdpPerCapita: 23800, unemployment: 3.2, agedShare: 30.2, area: 5773,
    note: 'The least populous prefecture in the country, with heavy depopulation.',
  },
  {
    code: '32', name: 'Shimane', region: 'Chugoku', capital: 'Matsue',
    population: 674703, gdpPerCapita: 24200, unemployment: 3.1, agedShare: 30.0, area: 6607,
    note: 'A prefecture of old towns, the Oki islands and a young population in the capital.',
  },
  {
    code: '33', name: 'Okayama', region: 'Chugoku', capital: 'Okayama',
    population: 1875765, gdpPerCapita: 28800, unemployment: 2.8, agedShare: 28.4, area: 6927,
    note: 'The Kibi plateau, the Kibonomoto park and a long manufacturing tradition.',
  },
  {
    code: '34', name: 'Hiroshima', region: 'Chugoku', capital: 'Hiroshima',
    population: 2790843, gdpPerCapita: 31300, unemployment: 2.7, agedShare: 28.1, area: 8475,
    note: 'Car manufacturing in the northern prefecture and paper in the south.',
  },
  {
    code: '35', name: 'Yamaguchi', region: 'Chugoku', capital: 'Yamaguchi',
    population: 1318166, gdpPerCapita: 26200, unemployment: 3.0, agedShare: 29.5, area: 6108,
    note: 'Petrochemicals, shinkansen and the southern industrial coast.',
  },
  {
    code: '36', name: 'Tokushima', region: 'Shikoku', capital: 'Tokushima',
    population: 718221, gdpPerCapita: 24600, unemployment: 3.3, agedShare: 30.3, area: 4146,
    note: 'The smallest of the four Shikoku prefectures, with a narrow coastal plain.',
  },
  {
    code: '37', name: 'Kagawa', region: 'Shikoku', capital: 'Takamatsu',
    population: 985962, gdpPerCapita: 26800, unemployment: 3.2, agedShare: 29.1, area: 1876,
    note: 'The smallest prefecture by area, and a centre of small machine-tool makers.',
  },
  {
    code: '38', name: 'Ehime', region: 'Shikoku', capital: 'Matsuyama',
    population: 1336090, gdpPerCapita: 25400, unemployment: 3.1, agedShare: 29.4, area: 5958,
    note: 'Chemicals and citrus fruit, with a long ferry route across the Seto Inland Sea.',
  },
  {
    code: '39', name: 'Kochi', region: 'Shikoku', capital: 'Kochi',
    population: 698522, gdpPerCapita: 22900, unemployment: 3.4, agedShare: 31.4, area: 7103,
    note: 'The smallest prefecture by population, and the oldest age profile in Shikoku.',
  },
  {
    code: '40', name: 'Fukuoka', region: 'Kyushu', capital: 'Fukuoka',
    population: 5151364, gdpPerCapita: 31600, unemployment: 3.0, agedShare: 25.5, area: 4984,
    note: 'The commercial hub of Kyushu, with a young and growing population.',
  },
  {
    code: '41', name: 'Saga', region: 'Kyushu', capital: 'Saga',
    population: 799709, gdpPerCapita: 25300, unemployment: 2.9, agedShare: 28.7, area: 2442,
    note: 'Rice, ceramics and the hot springs of Ureshino.',
  },
  {
    code: '42', name: 'Nagasaki', region: 'Kyushu', capital: 'Nagasaki',
    population: 1324507, gdpPerCapita: 25600, unemployment: 3.0, agedShare: 29.3, area: 4192,
    note: 'Shipbuilding and a long, sheltered harbour on the west of Kyushu.',
  },
  {
    code: '43', name: 'Kumamoto', region: 'Kyushu', capital: 'Kumamoto',
    population: 1792618, gdpPerCapita: 26000, unemployment: 3.1, agedShare: 28.2, area: 7409,
    note: 'Semiconductor manufacturing moved here after the 2016 Kumamoto earthquake.',
  },
  {
    code: '44', name: 'Oita', region: 'Kyushu', capital: 'Oita',
    population: 1157695, gdpPerCapita: 25100, unemployment: 2.9, agedShare: 29.1, area: 6337,
    note: 'Hot spring resorts and a large petrochemical complex near Kitakyushu.',
  },
  {
    code: '45', name: 'Miyazaki', region: 'Kyushu', capital: 'Miyazaki',
    population: 1068082, gdpPerCapita: 23400, unemployment: 3.2, agedShare: 29.9, area: 6414,
    note: 'Poultry, tobacco and tourism in a warm southern climate.',
  },
  {
    code: '46', name: 'Kagoshima', region: 'Kyushu', capital: 'Kagoshima',
    population: 1626412, gdpPerCapita: 25300, unemployment: 3.1, agedShare: 28.8, area: 8036,
    note: 'Active volcanism, agriculture and a space centre on the southern coast.',
  },
  {
    code: '47', name: 'Okinawa', region: 'Okinawa', capital: 'Naha',
    population: 1423566, gdpPerCapita: 23300, unemployment: 4.1, agedShare: 26.4, area: 2198,
    note: 'The country\'s southernmost prefecture, an island economy built on tourism.',
  },
];

/** The eight regions of Japan, in geographic order. */
export const REGION_GROUPS = ['Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kinki', 'Chugoku', 'Shikoku', 'Kyushu', 'Okinawa'];

/** Find a prefecture by its two-digit code. */
export function regionByCode(code) {
  return REGIONS.find((item) => item.code === code) || null;
}

/** Find a prefecture by name (case-insensitive). */
export function regionByName(name) {
  const wanted = String(name || '').trim().toLowerCase();
  return REGIONS.find((item) => item.name.toLowerCase() === wanted)
    || REGIONS.find((item) => item.name.toLowerCase().startsWith(wanted))
    || null;
}

/** Prefecture totals for a numeric field, summed or averaged. */
export function regionTotals(field, mode = 'sum') {
  const values = REGIONS.map((item) => item[field]).filter((value) => Number.isFinite(value));
  if (mode === 'mean') {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }
  return values.reduce((sum, value) => sum + value, 0);
}

/** The share of Japan's population living in one region, in per cent. */
export function shareOfJapan(field, region) {
  const total = regionTotals(field, 'sum');
  if (!total) return 0;
  return (region[field] / total) * 100;
}
