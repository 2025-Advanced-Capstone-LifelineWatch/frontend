import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { navbarStyles } from '../styles/NavbarStyle';

const menuItems = {
  "복지서비스": [
    {
      category: "서비스 찾기",
      items: ["서비스 목록", "사회서비스 목록"],
    },
    {
      category: "모의계산",
      items: [
        "기초연금", "초·중·고 교육비지원", "장애(아동)수당", "국민기초 생활보장",
        "장애인연금", "한부모 가족지원", "산모신생아 건강관리", "아이돌봄 서비스",
        "청년월세지원", "자산형성지원"
      ],
    },
    {
      category: "맞춤형급여안내(복지멤버십)",
      items: ["제도 안내", "이용 방법", "안내 대상 사업"],
    },
    {
      category: "전자바우처 서비스 안내",
      items: [
        "국가바우처", "사업안내", "사업현황", "국민행복카드", "바우처 판매점",
        "제공기관 참여 및 평가"
      ],
    },
  ],
  "서비스신청": [
    {
      category: "복지서비스 신청",
      items: ["복지급여 신청", "화면 따라하기", "복지서비스 신청서식"],
    },
    {
      category: "민원서비스 신청",
      items: [
        "민원서비스 신청", "가족정보 제공동의", "복지급여계좌변경 동의",
        "직권신청요청 동의", "증빙서류 제출", "화면 따라하기"
      ],
    },
    {
      category: "증명서발급·진위확인",
      items: ["증명서발급", "증명서 진위 확인", "장애인등록증 진위 확인"],
    },
    {
      category: "사회서비스 신청",
      items: ["시설 이용 신청"],
    },
  ],
};

const navMenus = [
  { name: "복지서비스" },
  { name: "서비스신청" },
  { name: "채팅상담", to: "/chat" },
  { name: "약 알람 관리", to: "/alarm-groups", role: "SOCIAL_WORKER" },
];

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, loading } = useUser();
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    const checkNotifications = () => {
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const lastRead = localStorage.getItem("notifications_last_read");
      if (notifications.length > 0) {
        const latestTime = new Date(notifications[0].time).getTime();
        const lastReadTime = lastRead ? new Date(lastRead).getTime() : 0;
        setHasNewNotification(latestTime > lastReadTime);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('로그아웃 되었습니다.');
  };

  const handleMenuEnter = (menuName) => setHovered(menuName);
  const handleMenuLeave = () => setTimeout(() => setHovered(null), 100);

  const isSocialWorker = user?.role === 'SOCIAL_WORKER';

  return (
    <nav className={navbarStyles.navWrapper}>
      <div className={navbarStyles.container}>
        <div className={navbarStyles.inner}>
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="LifeLine 로고" className={navbarStyles.logo} />
            </Link>
          </div>

          <div className={navbarStyles.menuWrapper}>
            <div className="flex space-x-4">
              {navMenus.map((menu) => {
                if (menu.role && user?.role !== menu.role) return null;
                return menu.to ? (
                  <Link
                    key={menu.name}
                    to={menu.to}
                    className={`${navbarStyles.menuItemBase} ${navbarStyles.menuItemInactive}`}
                  >
                    {menu.name}
                  </Link>
                ) : (
                  <div
                    key={menu.name}
                    className="relative group"
                    onMouseEnter={() => handleMenuEnter(menu.name)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button
                      className={`${navbarStyles.menuItemBase} ${
                        hovered === menu.name ? navbarStyles.menuItemActive : navbarStyles.menuItemInactive
                      } flex items-center`}
                    >
                      {menu.name}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {hovered === menu.name && (
                      <div
                        className={navbarStyles.dropdownWrapper}
                        onMouseEnter={() => setHovered(menu.name)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className={navbarStyles.invisibleSpacer}></div>
                        {menuItems[menu.name].map((subMenu, index) => (
                          <div key={index}>
                            <h4 className={navbarStyles.dropdownTitle}>{subMenu.category}</h4>
                            <ul className="space-y-1">
                              {subMenu.items.map((item, idx) => (
                                <li key={idx} className={navbarStyles.dropdownItem}>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={navbarStyles.authWrapper}>
            {loading ? (
              <div className={navbarStyles.loadingText}>로딩 중...</div>
            ) : isLoggedIn ? (
              <>
                {isSocialWorker && (
                  <Link to="/assign-elderly" className={navbarStyles.linkBase}>
                    노인 할당
                  </Link>
                )}
                <Link to="/notifications" className="relative mr-3 group">
                  <svg
                    className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {hasNewNotification && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
                <Link to="/mypage-auth" className="flex items-center space-x-1 group">
                  <span className={navbarStyles.linkBase}>
                    {user?.name ? `${user.name}님` : '마이페이지'}
                  </span>
                  <svg className={navbarStyles.iconBase} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button onClick={handleLogout} className={navbarStyles.linkBase}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 group">
                  <span className={navbarStyles.linkBase}>로그인</span>
                  <svg className={navbarStyles.iconBase} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <Link to="/signup" className={navbarStyles.linkBase}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;