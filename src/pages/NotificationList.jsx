import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../lib/axiosInstance";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [elderlyInfo, setElderlyInfo] = useState({});
  const [readNotifications, setReadNotifications] = useState(new Set()); 

  //  담당 노인 정보 가져오기
  const fetchAssignedElderlyInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/elderly/assigned");
      const elderlyList = response.data.results || response.data || [];

      const elderlyCache = {};
      elderlyList.forEach((elderly) => {
        const elderlyId = elderly.user?.id || elderly.id;
        if (elderlyId) {
          elderlyCache[elderlyId] = {
            name: elderly.user?.name || elderly.name || `사용자${elderlyId}`,
            phone: elderly.user?.phoneNumber || elderly.phoneNumber || "",
          };
        }
      });

      setElderlyInfo(elderlyCache);
    } catch (error) {
      console.error("담당 노인 정보 조회 실패:", error);
    }
  };

  //  읽은 알림 상태 로드
  const loadReadNotifications = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("readNotifications") || "[]");
    setReadNotifications(new Set(saved));
  }, []);

  //  읽은 알림 상태 저장
  const saveReadNotifications = useCallback((readSet) => {
    localStorage.setItem("readNotifications", JSON.stringify([...readSet]));
  }, []);

  //  알림을 읽음 처리
  const markAsRead = useCallback((notificationId) => {
    setReadNotifications(prev => {
      const newSet = new Set(prev);
      newSet.add(notificationId);
      saveReadNotifications(newSet);
      return newSet;
    });
  }, [saveReadNotifications]);

  //  알림 제목 향상
  const enhanceNotificationTitle = useCallback((notification) => {
    const title = notification.data?.title || notification.title;
    const elderlyName = notification.data?.elderlyName;

    if (elderlyName && title?.includes("응급상황")) {
      return `🚨 ${elderlyName}님 응급상황 발생!`;
    } else if (elderlyName && title?.includes("약 복용")) {
      return `💊 ${elderlyName}님 약 복용 알림`;
    }

    return title || notification.title;
  }, []);

  //  알림 본문 향상
  const enhanceNotificationBody = useCallback(
    (notification) => {
      const elderlyName = notification.data?.elderlyName;
      const elderlyId = notification.data?.elderlyId;
      const body = notification.data?.body || notification.body;
      const title = notification.data?.title || notification.title;

      if (
        (elderlyName && title?.includes("응급상황")) ||
        (elderlyName && title?.includes("약 복용"))
      ) {
        const phone = elderlyInfo[elderlyId]?.phone || "";
        return `대상자: ${elderlyName}${phone ? ` (${phone})` : ""}\n${body}`;
      }

      return body;
    },
    [elderlyInfo]
  );

  //  알림 로드
  const loadNotifications = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(saved);
  }, []);

  //  알림 클릭 핸들러
  const handleNotificationClick = useCallback((notification, index) => {
    const notificationId = `${notification.time}-${index}`;
    markAsRead(notificationId);
  }, [markAsRead]);

  useEffect(() => {
    fetchAssignedElderlyInfo();
    loadNotifications();
    loadReadNotifications();
    localStorage.setItem("notifications_last_read", new Date().toISOString());

    const handleNotificationUpdate = () => {
      loadNotifications();
    };

    window.addEventListener("notificationUpdated", handleNotificationUpdate);
    return () => {
      window.removeEventListener("notificationUpdated", handleNotificationUpdate);
    };
  }, [loadNotifications, loadReadNotifications]);

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    localStorage.removeItem("readNotifications");
    setNotifications([]);
    setReadNotifications(new Set());
  };

  const deleteNotification = (index) => {
    const updated = [...notifications];
    const deletedNotification = updated[index];
    const notificationId = `${deletedNotification.time}-${index}`;
    
    updated.splice(index, 1);
    localStorage.setItem("notifications", JSON.stringify(updated));
    setNotifications(updated);

    // 읽음 상태에서도 제거
    const newReadSet = new Set(readNotifications);
    newReadSet.delete(notificationId);
    setReadNotifications(newReadSet);
    saveReadNotifications(newReadSet);
  };

  const uniqueNotifications = [];
  const seenKeys = new Set();

  notifications.forEach((n) => {
    const title = n.data?.title || n.title || "";
    const body = n.data?.body || n.body || "";
    const elderlyId = n.data?.elderlyId || "";
    const key = `${title}-${body}-${elderlyId}`;
    const isEmergency = title.includes("응급상황");

    if (isEmergency || !seenKeys.has(key)) {
      uniqueNotifications.push(n);
      if (!isEmergency) {
        seenKeys.add(key);
      }
    }
  });

  const unreadCount = uniqueNotifications.filter((n, index) => {
    const notificationId = `${n.time}-${index}`;
    return !readNotifications.has(notificationId);
  }).length;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">📬 받은 알림 목록</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
          >
            🗑 모두 삭제
          </button>
        )}
      </div>

      {uniqueNotifications.length === 0 ? (
        <div className="text-gray-500 text-sm">알림이 없습니다.</div>
      ) : (
        <ul className="space-y-4">
          {uniqueNotifications.map((n, i) => {
            const enhancedTitle = enhanceNotificationTitle(n);
            const enhancedBody = enhanceNotificationBody(n);
            const isEmergency = enhancedTitle.includes("응급상황");
            const isMedicine = enhancedTitle.includes("약 복용");
            const notificationId = `${n.time}-${i}`;
            const isRead = readNotifications.has(notificationId);

            return (
              <li
                key={notificationId}
                onClick={() => handleNotificationClick(n, i)}
                className={`border rounded-lg shadow p-4 flex justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isEmergency
                    ? isRead 
                      ? "bg-red-50 border-red-200 opacity-75" 
                      : "bg-red-100 border-red-300 shadow-lg"
                    : isMedicine
                    ? isRead 
                      ? "bg-blue-50 border-blue-200 opacity-75" 
                      : "bg-blue-100 border-blue-300 shadow-lg"
                    : isRead 
                      ? "bg-gray-50 border-gray-200 opacity-75" 
                      : "bg-white border-gray-300 shadow-lg"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {!isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                    <div
                      className={`font-semibold text-base ${
                        isEmergency
                          ? isRead ? "text-red-600" : "text-red-700"
                          : isMedicine
                          ? isRead ? "text-blue-600" : "text-blue-700"
                          : isRead ? "text-gray-600" : "text-gray-800"
                      } ${!isRead ? "font-bold" : "font-medium"}`}
                    >
                      {enhancedTitle}
                    </div>
                  </div>
                  <div className={`text-sm mb-2 whitespace-pre-line ${
                    isRead ? "text-gray-500" : "text-gray-700"
                  } ${!isRead ? "font-medium" : ""}`}>
                    {enhancedBody}
                  </div>
                  <div className={`text-xs ${isRead ? "text-gray-400" : "text-gray-500"}`}>
                    {new Date(n.time).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(i);
                  }}
                  className="ml-4 text-gray-400 hover:text-red-500 flex-shrink-0 self-start"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;