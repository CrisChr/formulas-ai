'use client'
import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';

export function BuyMeCoffee() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 处理滚动事件，实现滚动时隐藏/显示
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // 向下滚动时隐藏
      } else {
        setIsVisible(true); // 向上滚动时显示
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <a
      href="https://buymeacoffee.com/ponyred"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 right-6 bg-[#FFDD00] text-[#000000] p-3 rounded-full shadow-lg hover:bg-[#FFDD00]/90 transition-all duration-300 z-50 flex items-center gap-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      aria-label="Buy me a coffee"
    >
      <Coffee size={20} />
      <span className="hidden sm:inline font-medium">Buy me a coffee</span>
    </a>
  );
}