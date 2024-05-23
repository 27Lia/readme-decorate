"use client";

import React, { useEffect, useState } from "react";
import SvgRequest from "./components/SvgRequest";

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
      setIsMobile(true);
      setShowWarning(true);
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-5">
        {isMobile && showWarning && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-xs mt-5 p-3 bg-red-100 text-red-700 border border-red-400 rounded text-center z-50 transition-opacity duration-500">
            이 콘텐츠는 모바일 기기에서 제대로 작동하지 않을 수 있습니다. 최상의
            경험을 위해 데스크톱 웹 브라우저를 사용해 주세요.
          </div>
        )}
        <SvgRequest />
      </div>
    </div>
  );
};

export default Home;
