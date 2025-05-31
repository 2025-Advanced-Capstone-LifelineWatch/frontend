import React from 'react';

const Home = () => {
  return (
    <div>
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col md:flex-row">
        {/* 왼쪽 메인 콘텐츠 - 배너 */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-gray-400 rounded-lg overflow-hidden relative">
            <div
              className="absolute inset-0 bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/banner.jpg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-8">
              <div className="text-white max-w-lg">
                <p className="text-sm md:text-base">
                  인간의 존엄성 존중과 평등, 다양성, 사회적 연대와 협력을
                  바탕으로 사회구성원 모두가 인간답게 살아갈 수 있도록
                  더불어 사는 공동체를 지향합니다.
                </p>
              </div>
            </div>

            <div className="h-[500px] md:h-[600px]"></div>

            {/* 슬라이드 컨트롤 */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button className="bg-white bg-opacity-50 px-2 rounded">&lt;</button>
              <button className="bg-white bg-opacity-50 px-2 rounded">II</button>
              <button className="bg-white bg-opacity-50 px-2 rounded">&gt;</button>
            </div>
          </div>

          {/* 아이콘 메뉴 */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              {
                icon: "👤",
                title: "민원신청",
                subtitle: "(국민신문고)",
                link: "https://www.epeople.go.kr",
              },
              {
                icon: "📚",
                title: "디지털배움터",
                link: "https://www.xn--vk1b19qntmowyrm8j.kr/",
              },
              {
                icon: "📋",
                title: "민원서식자료실",
                link: "https://www.gov.kr/portal/forms",
              },
              {
                icon: "❤️",
                title: "기초생활보장안내",
                link: "https://www.bokjiro.go.kr/ssis-teu/index.do",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border rounded-lg hover:shadow"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-gray-500">{item.icon}</span>
                </div>
                <div className="text-center text-sm">
                  <div>{item.title}</div>
                  {item.subtitle && (
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* 복지정책과 공지사항 섹션 */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">복지정책</h3>
              <div className="h-32 bg-gray-100"></div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">공지사항</h3>
              <div className="h-32 bg-gray-100"></div>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역 - 활동 소식만 남김 */}
        <div className="w-full md:w-1/3 p-4">
          {/* 활동 소식 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 bg-purple-100 p-2">활동 소식</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="bg-gray-200 h-48 rounded-lg"></div>
                <p className="mt-2 text-sm">어르신을 위한 원예활동봉사</p>
              </div>
              <div>
                <div className="bg-gray-200 h-48 rounded-lg"></div>
                <p className="mt-2 text-sm">세이프72시민안전센터 사랑의 김치나눔 소식</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;