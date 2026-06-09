export const company = {
  name: 'ECONLAB',
  nameKo: '이콘랩',
  fullName: '이콘랩 경제교육 연구소',
  tagline: '경제를 쉽게, 미래를 바르게',
  subTagline: '전문가가 직접 설명하는 경제 동영상 교육 플랫폼',
  copyright: '© 2026 ECONLAB 이콘랩. All rights reserved.',
  intro: [
    '이콘랩은 복잡한 경제 개념을 누구나 이해할 수 있도록 쉽고 재미있게 전달합니다.',
    '경제 기초부터 실전 투자, 글로벌 금융까지 체계적인 커리큘럼으로 경제적 사고력을 키워드립니다.',
  ],
  contact: {
    email: 'info@econlab.kr',
    tel: '02-1234-5678',
    address: '서울특별시 강남구 테헤란로 123 이콘빌딩 10층',
  },
  footerLinks: [
    { label: '이용약관', to: '/terms' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
    { label: '고객센터', to: '/support' },
  ],
  stats: [
    { value: '120+', label: '강의 영상', icon: 'fa-regular fa-circle-play' },
    { value: '6', label: '주제 카테고리', icon: 'fa-solid fa-layer-group' },
    { value: '50,000+', label: '누적 시청', icon: 'fa-regular fa-eye' },
    { value: '98%', label: '수강생 만족도', icon: 'fa-regular fa-face-smile' },
  ],
}

export const nav = [
  {
    label: '동영상',
    to: '/videos/all',
    children: [
      { label: '전체 영상', to: '/videos/all' },
      { label: '경제 기초', to: '/videos/basic' },
      { label: '경제 용어', to: '/videos/terms' },
      { label: '투자·자산관리', to: '/videos/invest' },
      { label: '시사 경제', to: '/videos/current' },
      { label: '금융', to: '/videos/finance' },
    ],
  },
  {
    label: '회사소개',
    to: '/about/intro',
    children: [
      { label: '회사 소개', to: '/about/intro' },
      { label: '미션 & 비전', to: '/about/mission' },
      { label: '강사 소개', to: '/about/team' },
    ],
  },
  {
    label: '고객센터',
    to: '/support',
    children: [
      { label: 'FAQ', to: '/support' },
      { label: '문의하기', to: '/support' },
    ],
  },
]

export const videoCategories = [
  {
    key: 'all',
    label: '전체 영상',
    icon: 'fa-regular fa-circle-play',
    desc: '모든 경제 교육 영상',
    colorClass:
      'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300 border-brand-200 dark:border-brand-700',
  },
  {
    key: 'basic',
    label: '경제 기초',
    icon: 'fa-solid fa-graduation-cap',
    desc: 'GDP, 인플레이션, 금리의 기초',
    colorClass:
      'bg-sage-50 text-sage-600 dark:bg-sage-900/30 dark:text-sage-300 border-sage-200 dark:border-sage-700',
  },
  {
    key: 'terms',
    label: '경제 용어',
    icon: 'fa-regular fa-lightbulb',
    desc: '핵심 경제 용어 해설',
    colorClass:
      'bg-iris-50 text-iris-600 dark:bg-iris-900/30 dark:text-iris-300 border-iris-200 dark:border-iris-700',
  },
  {
    key: 'invest',
    label: '투자·자산관리',
    icon: 'fa-solid fa-chart-line',
    desc: '주식, 채권, 부동산 투자 입문',
    colorClass:
      'bg-sol-50 text-sol-600 dark:bg-sol-900/30 dark:text-sol-300 border-sol-200 dark:border-sol-700',
  },
  {
    key: 'current',
    label: '시사 경제',
    icon: 'fa-regular fa-newspaper',
    desc: '경제 이슈 심층 분석',
    colorClass:
      'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300 border-brand-200 dark:border-brand-700',
  },
  {
    key: 'finance',
    label: '금융',
    icon: 'fa-solid fa-coins',
    desc: '은행, 보험, 금융 상품',
    colorClass:
      'bg-sage-50 text-sage-600 dark:bg-sage-900/30 dark:text-sage-300 border-sage-200 dark:border-sage-700',
  },
]

export const videos = [
  // ── 경제 기초 ──────────────────────────────────────────────
  {
    id: 1,
    title: '경제의 기초 GDP 쉽고 재밌게 이해하기',
    category: 'basic',
    youtubeId: '2bH1GqaHBKk',
    desc: '국내총생산(GDP)의 개념과 계산 방법, 경제 성장률과의 관계를 경제번역기 채널이 쉽게 설명합니다.',
    date: '2026-05-20',
  },
  {
    id: 2,
    title: "경제의 기본 중에 기본! '금리'부터 알아야지!",
    category: 'basic',
    youtubeId: 'enUMnwVRtZc',
    desc: '금리 결정의 메커니즘과 우리 생활에 미치는 영향을 경제번역기 채널이 알기 쉽게 풀어줍니다.',
    date: '2026-05-18',
  },
  {
    id: 3,
    title: '대만에 뒤처지는 한국 GDP…5년 뒤 1만 달러 격차',
    category: 'basic',
    youtubeId: 'PJ5x9F3NF3Y',
    desc: '한국과 대만의 1인당 GDP 역전 현상과 그 배경, 향후 전망을 심층 분석합니다.',
    date: '2026-05-15',
  },
  {
    id: 4,
    title: "1분기 GDP 역성장 '충격'…단기 부진 vs 장기 불황",
    category: 'basic',
    youtubeId: 'RHq8_0nrAeQ',
    desc: 'GDP 역성장의 의미와 단기 조정인지 장기 불황의 시작인지 전문가 시각으로 분석합니다.',
    date: '2026-05-12',
  },
  {
    id: 5,
    title: "미 연준 '양적 긴축(QT)' 시사 — QE와 다른 점은?",
    category: 'basic',
    youtubeId: 'ptflT4PELYA',
    desc: '양적 완화(QE)와 양적 긴축(QT)의 차이, 연준 정책이 글로벌 경제에 미치는 영향을 설명합니다.',
    date: '2026-05-10',
  },
  {
    id: 6,
    title: '美 CPI 쇼크? 서프라이즈? — 빅 이벤트 전략',
    category: 'basic',
    youtubeId: 'VRG_d83kqpo',
    desc: '소비자물가지수(CPI) 발표의 의미와 금융 시장에 미치는 파급 효과를 분석합니다.',
    date: '2026-05-07',
  },
  {
    id: 7,
    title: '경제번역기 시사경제용어사전 — 기저효과 편',
    category: 'basic',
    youtubeId: 'kb-SwwZmC5Q',
    desc: '통계 수치를 이해하는 핵심 개념 "기저효과"를 실생활 예시로 쉽게 설명합니다.',
    date: '2026-05-05',
  },

  // ── 경제 용어 ──────────────────────────────────────────────
  {
    id: 8,
    title: '금융 위기를 슬기롭게 극복하자! QE 양적완화 완전 정복',
    category: 'terms',
    youtubeId: 'ZTzoLpK9c6M',
    desc: '중앙은행의 양적 완화(QE) 정책이 무엇인지, 왜 시행하는지 재미있게 설명합니다.',
    date: '2026-05-22',
  },
  {
    id: 9,
    title: '인플레이션은 저리가라~ 스태그플레이션이 온다!!',
    category: 'terms',
    youtubeId: 'HHyZuibVh5k',
    desc: '경기 침체와 인플레이션이 동시에 발생하는 스태그플레이션의 공포를 분석합니다.',
    date: '2026-05-19',
  },
  {
    id: 10,
    title: '중국은 디플레이션에 진입하는가',
    category: 'terms',
    youtubeId: 'riLPpPAnxYI',
    desc: '중국 경제의 디플레이션 진입 여부와 글로벌 경제에 미치는 영향을 심층 분석합니다.',
    date: '2026-05-16',
  },
  {
    id: 11,
    title: '경제번역기 시사경제용어사전 — 글로벌 가치사슬 편',
    category: 'terms',
    youtubeId: 'sZbLGgSjtbM',
    desc: '세계 무역의 핵심 개념 "글로벌 가치사슬(GVC)"을 알기 쉽게 풀어줍니다.',
    date: '2026-05-13',
  },
  {
    id: 12,
    title: '멈출 줄 모르고 치솟는 달러값! 환율은 어떻게 결정될까?',
    category: 'terms',
    youtubeId: 'jYULSkbEckc',
    desc: '환율 결정 원리, 달러 강세·약세의 원인과 우리 생활에 미치는 영향을 설명합니다.',
    date: '2026-05-10',
  },
  {
    id: 13,
    title: '경제번역기 시사경제용어사전 — 재미있는 경제용어 편',
    category: 'terms',
    youtubeId: 'TPaVTPEmhr4',
    desc: '일상에서 자주 쓰이는 경제 용어들을 재미있고 쉽게 정리해 드립니다.',
    date: '2026-05-07',
  },

  // ── 투자·자산관리 ───────────────────────────────────────────
  {
    id: 14,
    title: '"뭔지 모르고 투자한다고?" ETF가 머니? | 슈카월드',
    category: 'invest',
    youtubeId: 'uzbIyFxLpzo',
    desc: 'ETF란 무엇인지, 주식·펀드와 어떻게 다른지 슈카월드가 친절하게 설명합니다.',
    date: '2026-05-21',
  },
  {
    id: 15,
    title: '이래도 주식이 어려워?! 슈카의 핵심정리 1편',
    category: 'invest',
    youtubeId: 'jXllNG8lB44',
    desc: '주식 투자를 시작하기 전에 반드시 알아야 할 핵심 개념을 슈카월드가 정리합니다.',
    date: '2026-05-17',
  },
  {
    id: 16,
    title: '돈은 어떻게 버는가? feat. 부동산 시장 | 슈카월드',
    category: 'invest',
    youtubeId: 'mlilJBer0c0',
    desc: '부동산 시장의 특성과 투자 접근법, 돈 버는 원리를 슈카월드 아재토크로 알아봅니다.',
    date: '2026-05-14',
  },
  {
    id: 17,
    title: '주식투자하는 사람들이 반드시 지켜야 할 원리 | 삼프로TV',
    category: 'invest',
    youtubeId: 'OCMJUbf6Uno',
    desc: '김동환 삼프로TV 대표가 주식 투자자가 꼭 알아야 할 원칙을 명쾌하게 설명합니다.',
    date: '2026-05-11',
  },

  // ── 시사 경제 ──────────────────────────────────────────────
  {
    id: 18,
    title: '1분기 사상 최대 매출 네이버…AI 기업일까? | 삼프로TV',
    category: 'current',
    youtubeId: 'sqknQ4KqtGk',
    desc: '네이버의 AI 전환 전략과 플랫폼 기업의 미래 가치를 삼프로TV 취재팀이 분석합니다.',
    date: '2026-06-01',
  },
  {
    id: 19,
    title: 'AI 올라탄 한국 전력기기…AI 병목은 메모리보다 전력기기',
    category: 'current',
    youtubeId: 'lUBr2VaWy0M',
    desc: 'AI 인프라 확장으로 주목받는 전력기기 산업과 한국 기업의 수혜 가능성을 분석합니다.',
    date: '2026-05-28',
  },
  {
    id: 20,
    title: '2026년 미국보다 한국 시장이 더 좋은 이유! 코스피 5000',
    category: 'current',
    youtubeId: 'M7CNAVLh_uQ',
    desc: '2026년 글로벌 증시 전망과 한국 시장의 상대적 매력, 코스피 전망을 분석합니다.',
    date: '2026-05-24',
  },
  {
    id: 21,
    title: '세계 경제, 진짜 망했을까? [2026 경제 전망]',
    category: 'current',
    youtubeId: 'gNZKncP199Y',
    desc: '2026년 글로벌 경제 전망, 침체 가능성과 회복 시나리오를 전문가가 분석합니다.',
    date: '2026-05-20',
  },

  // ── 금융 ───────────────────────────────────────────────────
  {
    id: 22,
    title: '채권 투자 전략 — 대내외 금리 변수 점검',
    category: 'finance',
    youtubeId: 'GnjtRhbpAmE',
    desc: '채권 투자의 기초와 금리 변화에 따른 채권 가격 변동, 투자 전략을 설명합니다.',
    date: '2026-05-23',
  },
  {
    id: 23,
    title: '미국채 금리 4% 돌파 — 한국 장기 채권 투자가 유리한 이유',
    category: 'finance',
    youtubeId: 'oQGJj6SMe-g',
    desc: '미국채 금리 상승 국면에서 한국 장기 채권 투자의 기회와 리스크를 분석합니다.',
    date: '2026-05-19',
  },
  {
    id: 24,
    title: '국민연금 개혁, 쉽게 이해하기',
    category: 'finance',
    youtubeId: 'WsWZPnPyQrY',
    desc: '국민연금 개혁의 핵심 내용과 노후 준비에 미치는 영향을 알기 쉽게 설명합니다.',
    date: '2026-05-15',
  },
  {
    id: 25,
    title: 'MZ들의 재테크 — 저축? 투자? 일단 이거부터 하자!',
    category: 'finance',
    youtubeId: 'Qq1HEKBRflU',
    desc: 'MZ세대를 위한 재테크 입문 가이드. 예적금부터 투자까지 첫걸음을 제시합니다.',
    date: '2026-05-11',
  },
]
