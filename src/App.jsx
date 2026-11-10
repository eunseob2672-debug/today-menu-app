import React, { useState, useEffect, useMemo } from 'react';

// 초기 데이터베이스
const INITIAL_ITEMS = [
  // 식사/메뉴 (food)
  { id: 'f1', theme: 'food', name: '김치찌개', emoji: '🥘', category: '한식', price: '1만원 이하', distance: '500m 이내', desc: '한국인의 소울푸드, 얼큰하고 든든한 국물!' },
  { id: 'f2', theme: 'food', name: '삼겹살 & 소주', emoji: '🥓', category: '한식', price: '2만원대', distance: '1km 이내', desc: '회식과 모임의 절대 강자, 지글지글 삼겹살!' },
  { id: 'f3', theme: 'food', name: '국밥 (돼지/순대)', emoji: '🍲', category: '한식', price: '1만원 이하', distance: '500m 이내', desc: '빠르고 든든하게 속을 채우는 뜨끈한 국밥!' },
  { id: 'f4', theme: 'food', name: '초밥 (스시)', emoji: '🍣', category: '일식', price: '2만원대', distance: '1km 이내', desc: '깔끔하고 신선하게 즐기는 입안의 행복!' },
  { id: 'f5', theme: 'food', name: '돈카츠 & 우동', emoji: '🍱', category: '일식', price: '1만원대', distance: '500m 이내', desc: '겉바속촉 바삭한 돈카츠와 따뜻한 우동 한 그릇!' },
  { id: 'f6', theme: 'food', name: '라멘', emoji: '🍜', category: '일식', price: '1만원대', distance: '1km 이내', desc: '진한 육수와 쫄깃한 면발의 완벽한 조화!' },
  { id: 'f7', theme: 'food', name: '마라탕 & 꿔바로우', emoji: '🌶️', category: '중식', price: '1만원대', distance: '500m 이내', desc: '스트레스 확 풀리는 얼얼하고 매콤한 맛!' },
  { id: 'f8', theme: 'food', name: '짜장면 & 탕수육', emoji: '🥢', category: '중식', price: '1만원대', distance: '500m 이내', desc: '고민될 때 실패 없는 영원한 단짝 메뉴!' },
  { id: 'f9', theme: 'food', name: '파스타 & 화덕피자', emoji: '🍝', category: '양식', price: '2만원대', distance: '1km 이내', desc: '분위기 내기 좋은 감성 가득 이탈리안!' },
  { id: 'f10', theme: 'food', name: '수제버거', emoji: '🍔', category: '양식', price: '1만원대', distance: '1km 이내', desc: '육즙 가득한 패티와 감자튀김의 헤비한 매력!' },
  { id: 'f11', theme: 'food', name: '떡볶이 & 튀김', emoji: '🍢', category: '분식/야식', price: '1만원 이하', distance: '500m 이내', desc: '언제 먹어도 맛있는 매콤달콤 국민 간식!' },
  { id: 'f12', theme: 'food', name: '치킨 & 맥주', emoji: '🍗', category: '분식/야식', price: '2만원대', distance: '1km 이내', desc: '오늘 하루의 피로를 날려버릴 치맥 타임!' },
  { id: 'f13', theme: 'food', name: '쌀국수 & 분짜', emoji: '🥗', category: '아시안', price: '1만원대', distance: '500m 이내', desc: '가볍고 개운하게 즐기는 베트남 현지의 맛!' },
  { id: 'f14', theme: 'food', name: '스테이크 & 와인', emoji: '🥩', category: '양식', price: '3만원 이상', distance: '차량 이동', desc: '특별한 날, 제대로 기분 내는 럭셔리 디너!' },
  { id: 'f15', theme: 'food', name: '곱창 / 대창구이', emoji: '🔥', category: '한식', price: '2만원대', distance: '1km 이내', desc: '고소한 기름기와 쫄깃함으로 술이 술술!' },
  { id: 'f16', theme: 'food', name: '회 & 해산물 포차', emoji: '🐟', category: '일식', price: '3만원 이상', distance: '1km 이내', desc: '싱싱한 바다의 맛과 함께하는 진솔한 대화!' },

  // 장소/모임 (place)
  { id: 'p1', theme: 'place', name: '감성 로스터리 카페', emoji: '☕', category: '힐링/수다', price: '1만원 이하', distance: '500m 이내', desc: '향긋한 커피와 디저트를 곁들인 여유로운 수다 타임!' },
  { id: 'p2', theme: 'place', name: '보드게임 카페', emoji: '🎲', category: '실내오락', price: '1만원대', distance: '500m 이내', desc: '시간 가는 줄 모르는 두뇌 싸움과 웃음 폭탄!' },
  { id: 'p3', theme: 'place', name: '코인 노래방', emoji: '🎤', category: '실내오락', price: '1만원 이하', distance: '500m 이내', desc: '목청껏 부르며 텐션 올리는 가성비 최고의 코스!' },
  { id: 'p4', theme: 'place', name: '방탈출 카페', emoji: '🔐', category: '액티비티', price: '2만원대', distance: '1km 이내', desc: '친구들과 협동해 단서를 푸는 짜릿한 몰입감!' },
  { id: 'p5', theme: 'place', name: '볼링장 (펍 볼링)', emoji: '🎳', category: '액티비티', price: '1만원대', distance: '1km 이내', desc: '맥주 한 잔과 함께 팀전으로 즐기는 신나는 내기!' },
  { id: 'p6', theme: 'place', name: '한강 / 호수공원 산책', emoji: '🌳', category: '야외/산책', price: '1만원 이하', distance: '1km 이내', desc: '선선한 바람을 맞으며 걷고 벤치에서 쉬어가는 힐링!' },
  { id: 'p7', theme: 'place', name: '영화관 관람', emoji: '🍿', category: '문화/전시', price: '1만원대', distance: '1km 이내', desc: '팝콘 냄새와 함께 최신 화제작에 푹 빠져보는 시간!' },
  { id: 'p8', theme: 'place', name: '미술관 / 팝업스토어', emoji: '🖼️', category: '문화/전시', price: '1만원대', distance: '차량 이동', desc: '인생샷도 건지고 새로운 영감도 얻는 트렌디한 나들이!' },
  { id: 'p9', theme: 'place', name: '만화카페 & 뒹굴기', emoji: '📚', category: '힐링/수다', price: '1만원대', distance: '500m 이내', desc: '편안한 굴방에서 짜파게티 먹으며 만화책 정주행!' },
  { id: 'p10', theme: 'place', name: '수제맥주 펍 / 와인바', emoji: '🍺', category: '술 한잔', price: '2만원대', distance: '500m 이내', desc: '좋은 음악과 무드 있는 조명 아래 가볍게 한잔!' },
  { id: 'p11', theme: 'place', name: '포켓볼 / 당구장', emoji: '🎱', category: '실내오락', price: '1만원대', distance: '500m 이내', desc: '소화도 시킬 겸 가볍게 승부욕 자극하는 클래식 게임!' },
  { id: 'p12', theme: 'place', name: '근교 드라이브 & 대형카페', emoji: '🚗', category: '야외/산책', price: '2만원대', distance: '차량 이동', desc: '답답한 도심을 벗어나 확 트인 뷰를 보며 리프레시!' }
];

const FILTER_OPTIONS = {
  food: {
    categories: ['전체', '한식', '일식', '중식', '양식', '분식/야식', '아시안'],
    prices: ['전체', '1만원 이하', '1만원대', '2만원대', '3만원 이상'],
    distances: ['전체', '500m 이내', '1km 이내', '차량 이동']
  },
  place: {
    categories: ['전체', '힐링/수다', '실내오락', '액티비티', '야외/산책', '문화/전시', '술 한잔'],
    prices: ['전체', '1만원 이하', '1만원대', '2만원대'],
    distances: ['전체', '500m 이내', '1km 이내', '차량 이동']
  }
};

export default function App() {
  // 외부 스타일(Tailwind) 및 폭죽(Confetti) 스크립트 자동 주입
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const tw = document.createElement('script');
      tw.id = 'tailwind-cdn';
      tw.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tw);
    }
    if (!document.getElementById('confetti-cdn')) {
      const cf = document.createElement('script');
      cf.id = 'confetti-cdn';
      cf.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
      document.head.appendChild(cf);
    }
  }, []);

  // 1. 테마 및 조건 필터 상태
  const [theme, setTheme] = useState('food'); // 'food' | 'place'
  const [category, setCategory] = useState('전체');
  const [price, setPrice] = useState('전체');
  const [distance, setDistance] = useState('전체');

  // 2. 후보 목록 관리 상태
  const [allItems, setAllItems] = useState(INITIAL_ITEMS);
  const [excludedIds, setExcludedIds] = useState([]);
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomEmoji, setNewCustomEmoji] = useState('✨');

  // 3. 화면 단계 및 게임 모드 상태 ('setup' | 'worldcup' | 'ladder' | 'result')
  const [screen, setScreen] = useState('setup');
  const [gameMode, setGameMode] = useState('worldcup'); // 'worldcup' | 'ladder'
  const [finalWinner, setFinalWinner] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // 월드컵 전용 상태
  const [wcRoundSize, setWcRoundSize] = useState(8);
  const [wcCurrentList, setWcCurrentList] = useState([]);
  const [wcNextList, setWcNextList] = useState([]);
  const [wcMatchIndex, setWcMatchIndex] = useState(0);
  const [wcSelectingIdx, setWcSelectingIdx] = useState(null);

  // 사다리타기 전용 상태
  const [ladderCount, setLadderCount] = useState(4);
  const [ladderMode, setLadderMode] = useState('all'); // 'all' | 'single'
  const [ladderPlayers, setLadderPlayers] = useState(['참가자1', '참가자2', '참가자3', '참가자4']);
  const [ladderBottoms, setLadderBottoms] = useState([]);
  const [ladderBridges, setLadderBridges] = useState([]);
  const [ladderBlind, setLadderBlind] = useState(false);
  const [activePlayerIdx, setActivePlayerIdx] = useState(null);
  const [revealedPlayers, setRevealedPlayers] = useState({});

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setCategory('전체');
    setPrice('전체');
    setDistance('전체');
    setExcludedIds([]);
  };

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (item.theme !== theme) return false;
      if (category !== '전체' && item.category !== category) return false;
      if (price !== '전체' && item.price !== price) return false;
      if (distance !== '전체' && item.distance !== distance) return false;
      return true;
    });
  }, [allItems, theme, category, price, distance]);

  const activePool = useMemo(() => {
    return filteredItems.filter(item => !excludedIds.includes(item.id));
  }, [filteredItems, excludedIds]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!newCustomName.trim()) return;
    const newItem = {
      id: 'custom_' + Date.now(),
      theme,
      name: newCustomName.trim(),
      emoji: newCustomEmoji || '⭐',
      category: category === '전체' ? '직접추가' : category,
      price: price === '전체' ? '자유예산' : price,
      distance: distance === '전체' ? '자유거리' : distance,
      desc: '직접 추가한 오늘의 스페셜 후보!'
    };
    setAllItems(prev => [newItem, ...prev]);
    setNewCustomName('');
    showToast(`'${newItem.name}' 후보가 추가되었습니다!`);
  };

  const toggleItemSelection = (id) => {
    setExcludedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // 이상형 월드컵 로직
  const startWorldCup = () => {
    if (activePool.length < 2) {
      showToast('최소 2개 이상의 후보를 선택해주세요!');
      return;
    }
    const shuffled = shuffleArray(activePool);
    let targetSize = wcRoundSize;
    if (shuffled.length < targetSize) {
      if (shuffled.length >= 8) targetSize = 8;
      else if (shuffled.length >= 4) targetSize = 4;
      else targetSize = 2;
    }
    const selected = shuffled.slice(0, targetSize);
    setWcCurrentList(selected);
    setWcNextList([]);
    setWcMatchIndex(0);
    setWcSelectingIdx(null);
    setScreen('worldcup');
  };

  const handlePickWorldCup = (item, idx) => {
    if (wcSelectingIdx !== null) return;
    setWcSelectingIdx(idx);

    setTimeout(() => {
      const updatedNext = [...wcNextList, item];
      const isLastMatchInRound = (wcMatchIndex + 1) * 2 >= wcCurrentList.length;

      if (isLastMatchInRound) {
        if (updatedNext.length === 1) {
          setFinalWinner(updatedNext[0]);
          setScreen('result');
          triggerConfetti();
        } else {
          setWcCurrentList(updatedNext);
          setWcNextList([]);
          setWcMatchIndex(0);
        }
      } else {
        setWcNextList(updatedNext);
        setWcMatchIndex(prev => prev + 1);
      }
      setWcSelectingIdx(null);
    }, 350);
  };

  // 사다리타기 로직
  const handleLadderCountChange = (count) => {
    setLadderCount(count);
    setLadderPlayers(prev => {
      const next = [...prev];
      while (next.length < count) next.push(`참가자${next.length + 1}`);
      return next.slice(0, count);
    });
  };

  const startLadderGame = () => {
    if (activePool.length < 1) {
      showToast('최소 1개 이상의 후보가 필요합니다!');
      return;
    }

    const shuffled = shuffleArray(activePool);
    let bottoms = [];

    if (ladderMode === 'single') {
      const winItem = shuffled[0];
      bottoms = Array(ladderCount).fill(null).map((_, idx) =>
        idx === 0
          ? { ...winItem, isWin: true }
          : { id: `boom_${idx}`, name: '꽝 (다음 기회에)', emoji: '💣', isBoom: true, desc: '아쉽지만 꽝입니다!' }
      );
      bottoms = shuffleArray(bottoms);
    } else {
      for (let i = 0; i < ladderCount; i++) {
        bottoms.push({ ...shuffled[i % shuffled.length], isWin: true });
      }
      bottoms = shuffleArray(bottoms);
    }

    const rows = 7;
    const bridges = [];
    for (let r = 0; r < rows; r++) {
      const rowBridges = Array(ladderCount - 1).fill(false);
      for (let c = 0; c < ladderCount - 1; c++) {
        if (c > 0 && rowBridges[c - 1]) continue;
        rowBridges[c] = Math.random() < 0.55;
      }
      bridges.push(rowBridges);
    }

    for (let c = 0; c < ladderCount - 1; c++) {
      const hasAny = bridges.some(r => r[c]);
      if (!hasAny) {
        const randomRow = Math.floor(Math.random() * rows);
        if ((c === 0 || !bridges[randomRow][c - 1]) && (c === ladderCount - 2 || !bridges[randomRow][c + 1])) {
          bridges[randomRow][c] = true;
        }
      }
    }

    setLadderBottoms(bottoms);
    setLadderBridges(bridges);
    setActivePlayerIdx(null);
    setRevealedPlayers({});
    setScreen('ladder');
  };

  const computeLadderPath = (startCol) => {
    if (!ladderBridges.length) return { endCol: startCol, points: [] };
    const rows = ladderBridges.length;
    let col = startCol;
    const getX = (c) => ((c + 0.5) / ladderCount) * 100;
    const getY = (r) => ((r + 1) / (rows + 1)) * 100;

    const pts = [{ x: getX(col), y: 0 }];

    for (let r = 0; r < rows; r++) {
      const y = getY(r);
      pts.push({ x: getX(col), y });
      if (col < ladderCount - 1 && ladderBridges[r][col]) {
        col += 1;
        pts.push({ x: getX(col), y });
      } else if (col > 0 && ladderBridges[r][col - 1]) {
        col -= 1;
        pts.push({ x: getX(col), y });
      }
    }
    pts.push({ x: getX(col), y: 100 });
    return { endCol: col, points: pts };
  };

  const handleSelectLadderPlayer = (pIdx) => {
    setActivePlayerIdx(pIdx);
    const { endCol } = computeLadderPath(pIdx);
    setRevealedPlayers(prev => ({ ...prev, [pIdx]: endCol }));
  };

  const revealAllLadder = () => {
    const allMap = {};
    for (let i = 0; i < ladderCount; i++) {
      allMap[i] = computeLadderPath(i).endCol;
    }
    setRevealedPlayers(allMap);
    setActivePlayerIdx(null);
  };

  const copyShareText = (winnerItem) => {
    const title = theme === 'food' ? '🍴 오늘의 메뉴 결정!' : '🎈 오늘의 모임 장소 결정!';
    const text = `[${title}]\n👉 최종 선택: ${winnerItem.emoji} ${winnerItem.name}\n💬 한줄평: ${winnerItem.desc}\n📌 조건: ${winnerItem.category} · ${winnerItem.price} · ${winnerItem.distance}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('단톡방 공유용 텍스트가 복사되었습니다! 📋');
    } else {
      showToast('복사 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-xl mx-auto min-h-screen flex flex-col justify-between pb-10">
        {/* 상단 헤더 */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 shadow-sm flex items-center justify-between">
          <div
            onClick={() => setScreen('setup')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">{theme === 'food' ? '🍽️' : '🎡'}</span>
            <div>
              <h1 className="font-extrabold text-lg text-slate-900 leading-tight">
                오늘 뭐 {theme === 'food' ? '먹지?' : '하지?'}
              </h1>
              <p className="text-xs text-slate-500">결정장애 해결 월드컵 & 사다리타기</p>
            </div>
          </div>
          {screen !== 'setup' && (
            <button
              onClick={() => setScreen('setup')}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              ⚙️ 조건 다시 설정
            </button>
          )}
        </header>

        {/* 토스트 메시지 */}
        {toastMsg && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg">
            {toastMsg}
          </div>
        )}

        {/* 메인 컨텐츠 영역 */}
        <main className="p-4 flex-1 space-y-5">
          {screen === 'setup' && (
            <>
              {/* STEP 1: 테마 선택 탭 */}
              <section className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleThemeChange('food')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                    theme === 'food'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🍔</span> 오늘 뭐 먹지? (식사)
                </button>
                <button
                  onClick={() => handleThemeChange('place')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                    theme === 'place'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🎈</span> 어디로 놀러 가지? (장소)
                </button>
              </section>

              {/* STEP 2: 조건 필터 */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <span>🔍</span> 원하는 조건을 골라보세요
                  </h2>
                  <button
                    onClick={() => {
                      setCategory('전체');
                      setPrice('전체');
                      setDistance('전체');
                      setExcludedIds([]);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    조건 초기화
                  </button>
                </div>

                {/* 카테고리 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">
                    {theme === 'food' ? '종류' : '테마/분위기'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {FILTER_OPTIONS[theme].categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          category === cat
                            ? theme === 'food'
                              ? 'bg-orange-500 text-white'
                              : 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 가격대 & 거리 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">1인 예산</label>
                    <div className="flex flex-wrap gap-1.5">
                      {FILTER_OPTIONS[theme].prices.map(p => (
                        <button
                          key={p}
                          onClick={() => setPrice(p)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            price === p
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">이동 거리</label>
                    <div className="flex flex-wrap gap-1.5">
                      {FILTER_OPTIONS[theme].distances.map(d => (
                        <button
                          key={d}
                          onClick={() => setDistance(d)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            distance === d
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* STEP 3: 필터링된 후보 확인 및 직접 추가 */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 text-sm">
                    🎯 대진표 후보 ({activePool.length}개 선택됨)
                  </h2>
                  <span className="text-xs text-slate-400">클릭해서 빼거나 넣을 수 있어요</span>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="text-center py-6 bg-slate-50 rounded-xl text-slate-400 text-xs">
                    조건에 맞는 후보가 없습니다. 조건을 완화하거나 아래에서 직접 추가해보세요!
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
                    {filteredItems.map(item => {
                      const isSelected = !excludedIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 border transition ${
                            isSelected
                              ? 'bg-amber-50 border-amber-300 text-slate-800'
                              : 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-60'
                          }`}
                        >
                          <span>{item.emoji}</span>
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 커스텀 후보 추가 폼 */}
                <form onSubmit={handleAddCustomItem} className="flex gap-1.5 pt-2 border-t border-slate-100">
                  <select
                    value={newCustomEmoji}
                    onChange={e => setNewCustomEmoji(e.target.value)}
                    className="bg-slate-100 rounded-xl px-2 text-sm border border-slate-200 focus:outline-none"
                  >
                    <option value="✨">✨</option>
                    <option value="🍖">🍖</option>
                    <option value="🍕">🍕</option>
                    <option value="🍻">🍻</option>
                    <option value="☕">☕</option>
                    <option value="🎮">🎮</option>
                  </select>
                  <input
                    type="text"
                    placeholder="원하는 메뉴나 가게 이름 직접 추가..."
                    value={newCustomName}
                    onChange={e => setNewCustomName(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-slate-400"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
                  >
                    + 추가
                  </button>
                </form>
              </section>

              {/* STEP 4: 게임 방식 선택 및 시작 */}
              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-bold text-slate-800 text-sm">🕹️ 어떤 게임으로 정할까요?</h2>

                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setGameMode('worldcup')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                      gameMode === 'worldcup'
                        ? 'border-orange-500 bg-orange-50/40'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="font-bold text-sm text-slate-900">이상형 월드컵</div>
                    <div className="text-xs text-slate-500 mt-0.5">1:1 토너먼트로 진짜 먹고 싶은 곳 찾기</div>
                  </div>

                  <div
                    onClick={() => setGameMode('ladder')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                      gameMode === 'ladder'
                        ? 'border-indigo-500 bg-indigo-50/40'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🪜</div>
                    <div className="font-bold text-sm text-slate-900">운명의 사다리타기</div>
                    <div className="text-xs text-slate-500 mt-0.5">친구들과 한 줄씩 골라 스릴 있게 결정!</div>
                  </div>
                </div>

                {/* 게임 모드별 세부 옵션 */}
                {gameMode === 'worldcup' ? (
                  <div className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">진행 라운드 (강수)</span>
                    <div className="flex gap-1.5">
                      {[4, 8, 16].map(size => (
                        <button
                          key={size}
                          onClick={() => setWcRoundSize(size)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            wcRoundSize === size
                              ? 'bg-orange-500 text-white'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          {size}강
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3.5 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">참가 인원 (줄 개수)</span>
                      <div className="flex gap-1">
                        {[2, 3, 4, 5, 6].map(cnt => (
                          <button
                            key={cnt}
                            onClick={() => handleLadderCountChange(cnt)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                              ladderCount === cnt
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white border border-slate-200 text-slate-600'
                            }`}
                          >
                            {cnt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">당첨 방식</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setLadderMode('all')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            ladderMode === 'all'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          모두 메뉴 배치
                        </button>
                        <button
                          onClick={() => setLadderMode('single')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            ladderMode === 'single'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          당첨 1개 + 나머지 꽝
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={gameMode === 'worldcup' ? startWorldCup : startLadderGame}
                  className={`w-full py-4 rounded-2xl font-extrabold text-white text-base shadow-md transition transform active:scale-95 ${
                    gameMode === 'worldcup'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700'
                  }`}
                >
                  {gameMode === 'worldcup' ? '🏆 월드컵 토너먼트 시작하기' : '🪜 사다리 게임 시작하기'}
                </button>
              </section>
            </>
          )}

          {/* 화면 2: 이상형 월드컵 진행 화면 */}
          {screen === 'worldcup' && wcCurrentList.length >= 2 && (
            <section className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-center space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-extrabold text-xs">
                  {wcCurrentList.length === 2 ? '🔥 대망의 결승전!' : `🏆 ${wcCurrentList.length}강 토너먼트`}
                </span>
                <h2 className="font-extrabold text-lg text-slate-900 pt-1">
                  지금 더 끌리는 쪽을 선택하세요! ({wcMatchIndex + 1} / {wcCurrentList.length / 2})
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 relative">
                {[0, 1].map(offset => {
                  const item = wcCurrentList[wcMatchIndex * 2 + offset];
                  if (!item) return null;
                  const isSelected = wcSelectingIdx === offset;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handlePickWorldCup(item, offset)}
                      className={`bg-white p-6 rounded-3xl border-2 shadow-sm cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-200'
                          : 'border-slate-200 hover:border-orange-400 hover:shadow-md'
                      }`}
                    >
                      <div className="text-6xl mb-3">{item.emoji}</div>
                      <h3 className="text-xl font-extrabold text-slate-900">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      <div className="flex gap-1.5 mt-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {item.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {item.price}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {item.distance}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                  VS
                </div>
              </div>
            </section>
          )}

          {/* 화면 3: 사다리타기 진행 화면 */}
          {screen === 'ladder' && (
            <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900">🪜 운명의 사다리타기</h2>
                  <p className="text-xs text-slate-500">상단 참가자 버튼을 누르면 사다리를 타고 내려갑니다!</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setLadderBlind(!ladderBlind)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                      ladderBlind
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {ladderBlind ? '🙈 가리기 해제' : '🙈 사다리 가리기'}
                  </button>
                  <button
                    onClick={revealAllLadder}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                  >
                    전체 결과 보기
                  </button>
                </div>
              </div>

              {/* 상단 참가자 입력 및 출발 버튼 */}
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: `repeat(${ladderCount}, minmax(0, 1fr))` }}
              >
                {ladderPlayers.map((pName, idx) => {
                  const isActive = activePlayerIdx === idx;
                  const isDone = revealedPlayers[idx] !== undefined;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <input
                        type="text"
                        value={pName}
                        onChange={e => {
                          const copy = [...ladderPlayers];
                          copy[idx] = e.target.value;
                          setLadderPlayers(copy);
                        }}
                        className="w-full text-center text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg py-1 px-1 focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        onClick={() => handleSelectLadderPlayer(idx)}
                        className={`w-full py-1.5 rounded-xl text-xs font-extrabold transition ${
                          isActive
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                            : isDone
                            ? 'bg-slate-800 text-white'
                            : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                        }`}
                      >
                        {isDone ? '확인완료' : '출발 👇'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* 사다리 그래픽 영역 (SVG) */}
              <div className="relative h-64 w-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                {ladderBlind && (
                  <div className="absolute inset-0 z-20 bg-slate-900/90 flex flex-col items-center justify-center text-white p-4 text-center">
                    <span className="text-3xl mb-2">🙈</span>
                    <p className="font-bold text-sm">스릴 만점 블라인드 모드!</p>
                    <p className="text-xs text-slate-300 mt-0.5">위에서 자기 자리를 먼저 고른 뒤 결과를 확인하세요</p>
                  </div>
                )}

                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  {Array.from({ length: ladderCount }).map((_, c) => {
                    const x = ((c + 0.5) / ladderCount) * 100;
                    return (
                      <line
                        key={`v_${c}`}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={100}
                        stroke="#cbd5e1"
                        strokeWidth="1.2"
                      />
                    );
                  })}

                  {ladderBridges.map((rowArr, r) => {
                    const y = ((r + 1) / (ladderBridges.length + 1)) * 100;
                    return rowArr.map((hasBridge, c) => {
                      if (!hasBridge) return null;
                      const x1 = ((c + 0.5) / ladderCount) * 100;
                      const x2 = ((c + 1.5) / ladderCount) * 100;
                      return (
                        <line
                          key={`h_${r}_${c}`}
                          x1={x1}
                          y1={y}
                          x2={x2}
                          y2={y}
                          stroke="#94a3b8"
                          strokeWidth="1.2"
                        />
                      );
                    });
                  })}

                  {activePlayerIdx !== null && (() => {
                    const { points } = computeLadderPath(activePlayerIdx);
                    const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');
                    return (
                      <polyline
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={polyPoints}
                      />
                    );
                  })()}
                </svg>
              </div>

              {/* 하단 결과 슬롯 */}
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: `repeat(${ladderCount}, minmax(0, 1fr))` }}
              >
                {ladderBottoms.map((bItem, bIdx) => {
                  const matchedPlayers = Object.entries(revealedPlayers)
                    .filter(([_, endCol]) => endCol === bIdx)
                    .map(([pIdx]) => ladderPlayers[Number(pIdx)]);

                  const isRevealed = matchedPlayers.length > 0;

                  return (
                    <div
                      key={bIdx}
                      onClick={() => {
                        if (isRevealed && !bItem.isBoom) {
                          setFinalWinner(bItem);
                          setScreen('result');
                          triggerConfetti();
                        }
                      }}
                      className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center min-h-20 ${
                        isRevealed
                          ? bItem.isBoom
                            ? 'bg-slate-100 border-slate-300 text-slate-500'
                            : 'bg-amber-50 border-amber-400 cursor-pointer'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <span className="text-xl">{bItem.emoji}</span>
                          <span className="font-bold text-xs text-slate-900 mt-0.5 break-keep">
                            {bItem.name}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 mt-1 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                            {matchedPlayers.join(', ')}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-bold">❓</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 하단 액션 버튼 */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={startLadderGame}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  🔄 사다리 다시 섞기
                </button>
                {activePlayerIdx !== null &&
                  revealedPlayers[activePlayerIdx] !== undefined &&
                  !ladderBottoms[revealedPlayers[activePlayerIdx]]?.isBoom && (
                    <button
                      onClick={() => {
                        const target = ladderBottoms[revealedPlayers[activePlayerIdx]];
                        setFinalWinner(target);
                        setScreen('result');
                        triggerConfetti();
                      }}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm"
                    >
                      🎉 이 결과로 최종 확정하기!
                    </button>
                  )}
              </div>
            </section>
          )}

          {/* 화면 4: 최종 결과 발표 및 공유 화면 */}
          {screen === 'result' && finalWinner && (
            <section className="bg-white p-6 rounded-3xl shadow-md border border-slate-200 text-center space-y-5">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
                  🎉 오늘의 고민 해결 완료!
                </span>
                <h2 className="text-2xl font-black text-slate-900 pt-2">
                  오늘의 최종 선택은 바로!
                </h2>
              </div>

              <div className="py-6 px-4 bg-gradient-to-b from-amber-50/70 to-orange-50/40 rounded-3xl border-2 border-amber-200 space-y-3">
                <div className="text-7xl">{finalWinner.emoji}</div>
                <h3 className="text-3xl font-black text-slate-900">{finalWinner.name}</h3>
                <p className="text-sm text-slate-600 font-medium">{finalWinner.desc}</p>

                <div className="flex justify-center gap-1.5 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white border border-amber-200 text-slate-700 text-xs font-bold">
                    #{finalWinner.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-amber-200 text-slate-700 text-xs font-bold">
                    #{finalWinner.price}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-amber-200 text-slate-700 text-xs font-bold">
                    #{finalWinner.distance}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => copyShareText(finalWinner)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>📋</span> 단톡방 공유용 결과 복사하기
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const query = encodeURIComponent(finalWinner.name);
                      window.open(`https://map.naver.com/p/search/${query}`, '_blank');
                    }}
                    className="py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition"
                  >
                    🗺️ 네이버 지도에서 주변 검색
                  </button>
                  <button
                    onClick={() => setScreen('setup')}
                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                  >
                    🔄 처음부터 다시 하기
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="text-center text-xs text-slate-400 py-4">
          오늘의 메뉴 & 모임 장소 결정기
        </footer>
      </div>
    </div>
  );
}