import { useParams, useNavigate, Link } from 'react-router-dom'
import { company } from '../data/site.js'

const tabs = [
  { key: 'intro', label: '회사 소개' },
  { key: 'mission', label: '미션 & 비전' },
  { key: 'team', label: '강사 소개' },
]

const instructors = [
  {
    id: 1,
    name: '김경제',
    title: '경제 기초·시사 경제 담당',
    bio: '서울대학교 경제학과를 졸업하고 한국은행에서 10년간 근무한 경제 전문가입니다. 복잡한 거시경제 이슈를 쉽고 명쾌하게 설명하는 것으로 유명합니다.',
    subjects: ['경제 기초', '시사 경제', 'GDP·인플레이션'],
    color: 'from-brand-300 to-brand-500',
    icon: 'fa-solid fa-chalkboard-user',
  },
  {
    id: 2,
    name: '이투자',
    title: '투자·자산관리 담당',
    bio: 'CFA(공인재무분석사) 자격증 보유자로 20년 이상의 투자 경험을 가진 전문가입니다. 주식, ETF, 부동산 등 다양한 투자 전략을 현실적인 관점에서 가르칩니다.',
    subjects: ['주식 투자', 'ETF', '포트폴리오 관리'],
    color: 'from-sol-300 to-sol-500',
    icon: 'fa-solid fa-chart-line',
  },
  {
    id: 3,
    name: '박금융',
    title: '금융·경제 용어 담당',
    bio: '금융감독원 출신으로 은행, 보험, 금융 상품에 대한 깊은 이해를 바탕으로 일상에서 꼭 필요한 금융 지식을 가르칩니다. 금융 소비자 보호 분야의 전문가입니다.',
    subjects: ['금융 상품', '경제 용어', '개인 금융'],
    color: 'from-sage-300 to-sage-500',
    icon: 'fa-solid fa-scale-balanced',
  },
]

function IntroTab() {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-ink-800 px-4 py-1.5 text-sm font-semibold text-brand-500 dark:text-brand-300 mb-4">
            우리의 이야기
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-ink-900 dark:text-white mb-4 leading-tight">
            경제 지식은 모두의 권리입니다
          </h2>
          <div className="space-y-4 text-ink-700 dark:text-slate-300 leading-relaxed">
            <p>
              이콘랩은 2020년, "경제 교육의 민주화"라는 비전 아래 설립되었습니다.
              복잡하고 어렵게만 느껴지는 경제를 누구나 이해할 수 있도록,
              최고의 전문가들이 모여 콘텐츠를 만들어가고 있습니다.
            </p>
            <p>
              유튜브를 통해 제공되는 무료 경제 교육 영상은 기초 개념부터
              실전 투자 전략까지, 체계적인 커리큘럼으로 구성되어 있습니다.
            </p>
            <p>
              이콘랩의 콘텐츠는 학생부터 직장인, 은퇴 준비자까지 모든 연령대가
              활용할 수 있도록 설계되었습니다.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-gradient-to-br from-brand-50 to-sage-50 dark:from-ink-800 dark:to-ink-700 border border-brand-100 dark:border-ink-600 p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-black text-brand-500 dark:text-brand-300">{stat.value}</div>
              <div className="text-sm text-ink-300 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company info */}
      <div className="rounded-2xl bg-brand-50 dark:bg-ink-800 border border-brand-100 dark:border-ink-700 p-8">
        <h3 className="text-xl font-bold text-ink-900 dark:text-white mb-6">회사 정보</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: '회사명', value: company.fullName },
            { label: '설립연도', value: '2020년' },
            { label: '이메일', value: company.contact.email },
            { label: '전화', value: company.contact.tel },
            { label: '주소', value: company.contact.address },
            { label: '주요 서비스', value: 'YouTube 경제 교육 동영상' },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-bold uppercase tracking-wider text-ink-300 dark:text-slate-500 mb-1">
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-ink-800 dark:text-slate-200">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function MissionTab() {
  const missions = [
    {
      color: 'bg-brand-400',
      label: '미션',
      title: '경제 지식을 모두에게',
      desc: '복잡한 경제 개념을 쉽고 재미있게 전달하여, 모든 사람이 경제적 의사 결정을 올바르게 내릴 수 있도록 돕습니다.',
      icon: 'fa-solid fa-bullseye',
    },
    {
      color: 'bg-sage-400',
      label: '비전',
      title: '대한민국 경제 리터러시 향상',
      desc: '2030년까지 100만 명에게 실질적인 경제 교육을 제공하여 대한민국 경제 리터러시 수준을 세계 최고로 높입니다.',
      icon: 'fa-solid fa-binoculars',
    },
    {
      color: 'bg-iris-400',
      label: '가치관',
      title: '접근성, 신뢰, 실용성',
      desc: '누구나 접근할 수 있고, 전문가가 검증한 신뢰 가능한 콘텐츠로, 실생활에 즉시 적용 가능한 실용적 지식을 제공합니다.',
      icon: 'fa-regular fa-lightbulb',
    },
  ]

  const visions = [
    '2026년: YouTube 구독자 50만 명 달성',
    '2027년: 학교 연계 경제 교육 프로그램 론칭',
    '2028년: 모바일 앱 출시 및 개인 맞춤형 교육 서비스 시작',
    '2029년: 글로벌 한국어 경제 교육 플랫폼으로 확장',
    '2030년: 누적 수강생 100만 명 달성',
  ]

  return (
    <div className="space-y-12">
      {/* Mission/Vision/Values cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white dark:bg-ink-800 border border-brand-100 dark:border-ink-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} text-white mb-4 shadow-sm`}>
              <i className={`${item.icon} text-xl`} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-ink-300 dark:text-slate-500 mb-1">
              {item.label}
            </div>
            <h3 className="text-lg font-bold text-ink-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-ink-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div>
        <h3 className="text-xl font-bold text-ink-900 dark:text-white mb-6">성장 로드맵</h3>
        <div className="space-y-3">
          {visions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-xl bg-brand-50 dark:bg-ink-800 border border-brand-100 dark:border-ink-700 px-5 py-4"
            >
              <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-400 text-white text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-sm text-ink-800 dark:text-slate-200 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core values */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-400 to-sage-400 p-8 text-white">
        <h3 className="text-xl font-bold mb-6">핵심 가치</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: 'fa-solid fa-handshake', title: '신뢰', desc: '검증된 전문가가 만드는 정확한 정보' },
            { icon: 'fa-solid fa-earth-asia', title: '접근성', desc: '모든 사람을 위한 무료 양질의 콘텐츠' },
            { icon: 'fa-solid fa-rocket', title: '혁신', desc: '끊임없이 더 나은 교육 방법을 추구' },
          ].map((val) => (
            <div key={val.title} className="rounded-xl bg-white/15 p-5">
              <i className={`${val.icon} text-xl`} />
              <h4 className="font-bold mt-3 mb-1">{val.title}</h4>
              <p className="text-sm opacity-80">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <p className="text-ink-700 dark:text-slate-300 leading-relaxed">
          이콘랩의 강사진은 각 분야 최고의 전문가들로 구성되어 있습니다.
          실무 경험과 학문적 깊이를 겸비한 강사들이 여러분의 경제 학습을 이끌어 드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="card dark:bg-ink-800 dark:border-ink-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Card header */}
            <div className={`bg-gradient-to-br ${inst.color} p-8 flex flex-col items-center text-white`}>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 border-2 border-white/30 mb-4">
                <i className={`${inst.icon} text-2xl`} />
              </div>
              <h3 className="text-lg font-black">{inst.name}</h3>
              <p className="text-sm opacity-85 text-center mt-1">{inst.title}</p>
            </div>

            {/* Card body */}
            <div className="p-6">
              <p className="text-sm text-ink-700 dark:text-slate-300 leading-relaxed mb-4">
                {inst.bio}
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink-300 dark:text-slate-500 mb-2">
                  담당 과목
                </p>
                <div className="flex flex-wrap gap-2">
                  {inst.subjects.map((subj) => (
                    <span
                      key={subj}
                      className="rounded-full bg-brand-50 dark:bg-ink-700 border border-brand-100 dark:border-ink-600 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { tab = 'intro' } = useParams()
  const navigate = useNavigate()

  const activeTab = tabs.find((t) => t.key === tab) || tabs[0]

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950">
      {/* Page header */}
      <div className="bg-gradient-to-br from-brand-50 to-iris-50 dark:from-ink-900 dark:to-ink-800 border-b border-brand-100 dark:border-ink-700">
        <div className="container-max section-x py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-300 dark:text-slate-500 mb-4">
            <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-300 transition-colors">
              홈
            </Link>
            <span>/</span>
            <span className="text-brand-500 dark:text-brand-300 font-semibold">회사소개</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-black text-ink-900 dark:text-white">
            {company.fullName}
          </h1>
          <p className="text-ink-300 dark:text-slate-400 mt-1">{company.tagline}</p>
        </div>
      </div>

      <div className="container-max section-x py-8">
        {/* Tab navigation */}
        <div className="flex gap-2 border-b border-brand-100 dark:border-ink-700 mb-10 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => navigate(`/about/${t.key}`)}
              className={`flex-shrink-0 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                tab === t.key
                  ? 'border-brand-400 text-brand-500 dark:text-brand-300 dark:border-brand-400'
                  : 'border-transparent text-ink-300 dark:text-slate-500 hover:text-ink-700 dark:hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pb-16">
          {tab === 'intro' && <IntroTab />}
          {tab === 'mission' && <MissionTab />}
          {tab === 'team' && <TeamTab />}
          {!['intro', 'mission', 'team'].includes(tab) && <IntroTab />}
        </div>
      </div>
    </div>
  )
}
