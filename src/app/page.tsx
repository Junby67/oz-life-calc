"use client";

import { useState, useMemo, ReactNode } from 'react';
import { Sparkles, Car, Home, Utensils, PiggyBank, CheckCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
}

export default function CalculatorPage() {
  const [totalBudget, setTotalBudget] = useState('');
  const [carCost, setCarCost] = useState('');
  const [weeklyRent, setWeeklyRent] = useState('');
  const [weeklyLiving, setWeeklyLiving] = useState('');

  const weeksOfSurvival = useMemo(() => {
    const numTotalBudget = parseFloat(totalBudget) || 0;
    const numCarCost = parseFloat(carCost) || 0;
    const numWeeklyRent = parseFloat(weeklyRent) || 0;
    const numWeeklyLiving = parseFloat(weeklyLiving) || 0;

    const remainingBudget = numTotalBudget - numCarCost;
    const weeklyExpenses = numWeeklyRent + numWeeklyLiving;

    if (remainingBudget < 0) {
      return "예산이 부족해요!";
    }
    if (weeklyExpenses <= 0) {
      return "∞";
    }

    const survivalWeeks = remainingBudget / weeklyExpenses;
    return survivalWeeks.toFixed(1);
  }, [totalBudget, carCost, weeklyRent, weeklyLiving]);

  const checklistItems = [
    "여권 및 비자 서류",
    "항공권",
    "해외 사용 가능 카드 & 현금",
    "상비약 (감기, 소화제 등)",
    "여행용 어댑터 (호주용)",
    "선크림 및 모자",
    "가벼운 외투 및 편한 신발",
    "영문 이력서 (CV)",
  ];

  const InputField = ({ label, value, setValue, icon, placeholder }: InputFieldProps) => (
    <div className="relative">
      <label className="block text-sm font-medium text-green-800 mb-1 ml-1">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-700">
          {icon}
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-80 border border-green-200 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
        />
      </div>
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-10 space-y-8">
        
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" />
            호주 워홀 생존 계산기
          </h1>
          <p className="text-green-700 mt-2">수입이 없어도 얼마나 버틸 수 있을까요?</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField label="총 예산" value={totalBudget} setValue={setTotalBudget} icon={<PiggyBank size={20} />} placeholder="예: 3000000" />
            <InputField label="차량 구매비" value={carCost} setValue={setCarCost} icon={<Car size={20} />} placeholder="예: 500000" />
            <InputField label="주당 방값" value={weeklyRent} setValue={setWeeklyRent} icon={<Home size={20} />} placeholder="예: 300" />
            <InputField label="주당 생활비" value={weeklyLiving} setValue={setWeeklyLiving} icon={<Utensils size={20} />} placeholder="예: 150" />
          </div>

          <div className="bg-green-800 text-white rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-inner">
            <h2 className="text-lg font-medium text-green-200">버틸 수 있는 기간</h2>
            <div className="my-2">
              <span className="text-6xl font-black text-yellow-300 tracking-tight">{weeksOfSurvival}</span>
              <span className="text-2xl font-bold text-yellow-200 ml-1">주</span>
            </div>
            <p className="text-xs text-green-300 max-w-xs">
              {weeksOfSurvival === "예산이 부족해요!" 
                ? "차량 구매 후 남는 예산이 없어요." 
                : "차량 구매 비용을 제외한 예산 기준입니다."
              }
            </p>
          </div>
        </div>
        
        <section className="pt-6 border-t border-green-200">
          <h2 className="text-xl font-semibold text-green-900 text-center mb-4">호주 워홀 필수 준비물 체크리스트</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-green-800">
                <CheckCircle className="text-yellow-500 mr-2 flex-shrink-0" size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      
      <footer className="text-center mt-8">
        <p className="text-xs text-green-600">
          © {new Date().getFullYear()} Aus WH Calculator. Just for fun!
        </p>
      </footer>
    </main>
  );
}
