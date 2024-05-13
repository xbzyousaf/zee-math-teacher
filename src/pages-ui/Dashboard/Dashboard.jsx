import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Messages from './Components/Messages/Messages'
import { useSelector } from 'react-redux'
import Main from './Components/Main/Main'
import Setting from './Components/Setting/Setting'
import { Badge } from '@mui/material'
import GuestProfile from '../Profile/GuestProfile'
import { useRouter,useSearchParams } from 'next/navigation'
import Link from 'next/link'
const DashBoard = () => {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState("dashboard");
  const { isGuest } = useSelector((state) => state.main);
  const unreadMessageCount = useSelector(
    (state) => state.profile?.messages?.filter((message) => !message.isRead).length
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tabName = params.get("tab");

    if (tabName && tabName !== "") {
      setTab(tabName);
    } else {
      if (isGuest) {
        setTab("setting");
      } else {
        setTab("dashboard");
      }
    }
  }, [isGuest, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        {isGuest || (
          <Link
            className={"tab" + (tab === "dashboard" ? " active" : "")}
            href="/dashboard"
          >
            Dashboard
          </Link>
        )}
        <Link
          className={"tab" + (tab === "setting" ? " active" : "")}
          href="/dashboard?tab=setting"
        >
          Account Setting
        </Link>
        {
            isGuest && <Link
            className={"tab" + (tab === "profile" ? " active" : "")}
            href="/dashboard?tab=profile"
          >
            Profile
          </Link>
        }
        {(
          <Link
            className={"tab" + (tab === "message" ? " active" : "")}
            href="/dashboard?tab=message"
          >
            {unreadMessageCount > 0 ? (
              <Badge  badgeContent={unreadMessageCount} color="error">
                Messages
              </Badge>
            ) : (
              "Messages"
            )}
          </Link>
        )}
      </div>
      <div className="dashboard-content">
        {isGuest || (tab === "dashboard" && <Main />)}
        {tab === "setting" && <Setting />}
        {isGuest && (tab === "profile" && <GuestProfile />)}
        {(tab === "message" && <Messages />)}
      </div>
    </div>
  );
};

export default DashBoard;
