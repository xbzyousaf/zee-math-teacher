"use client";
import React, { useEffect, useRef, useState } from 'react';
import Logo from "../../../public/assets/logo.svg";
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/main';
import { initProfile } from '../../store/setProfile';
import { Badge, Box, Chip } from '@mui/material';
import { API_URL } from '../../api';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation'




const Navbar = () => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.main);
  const isAuth = useSelector((state) => !!state.main.userId);
  const { firstName, lastName, isGuest } = useSelector((state) => state.main);
  const {
    avatar: tutorAvatar,
    gender
  } = useSelector((state) => state.profile.user);
  const {
    avatar: guestAvatar,
  } = useSelector((state) => state.profile.guestInformation);

  const unreadMessageCount = useSelector(
    (state) => state.profile?.messages?.filter((message) => !message.isRead).length
  );
  const fullName = isAuth
    ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
        lastName.length > 0 ? lastName.charAt(0).toUpperCase() + "." : ""
      }`
    : "";
  const maleAvatar = "/assets/image/user/male.png";
  const femaleAvatar = "/assets/image/user/female.png";
  const userAvatar = "/assets/image/user/User-avatar.svg.png";
  const avatar = isGuest && !guestAvatar?.includes("temp") ? guestAvatar : tutorAvatar
  const defaultAvatar =
    gender === 1 ? femaleAvatar : gender === 0 ? maleAvatar : userAvatar;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const sixtyDaysLater = user.createdAt + 5184000000;
  const currentDate = Date.now();
  const isExpired = sixtyDaysLater < currentDate;
  const router = useRouter()

  const handleFindTutor = () => {
    if(router.pathname === '/search') {
      router.reload();
    } else {
      router.push('/search');
    }
  }

  useEffect(() => {
    // Attach event listener to document body for clicking outside the profileMenu
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

if (typeof window === 'object') {
    document.body.addEventListener("click", handleOutsideClick);
}
    return () => {
      if (typeof window === 'object') {
      document.body.removeEventListener("click", handleOutsideClick);
      }
    };
  }, []);

  const handleClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };


  const logoutHandle = () => {
    dispatch(logout());
    dispatch(initProfile());
  };

  return (
    <div className="navbar" id="navbar">
      <div className="logo" id="logo">
        <Link href="/">
          <Image src={Logo} className='h-[50px] w-[210px]' alt="" />
        </Link>
      </div>

      <ul className="nav-container">
        <li>
          <Link className="nav-item link" href="/">
            Home
          </Link>
        </li>
        <li>
          <span className="nav-item link" style={{cursor:"pointer"}} onClick={() => {
            handleFindTutor()
          }}>
            Search maths tutor
          </span>
        </li>
        <li>
          <Link className="nav-item link" href="/contact">
            Contact us
          </Link>
        </li>
        {isAuth ? (
            <li className="profile explore-more" onClick={handleClick} ref={profileMenuRef}>
            <span className="name">
              <strong>Nicholas teacher</strong>
            </span>
              <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${
                        avatar ? `${API_URL}${avatar}` : defaultAvatar
                    })`,
                    border: unreadMessageCount ? "2px solid #f00" : "none",
                  }}
              ></div>
              {showProfileMenu && (
                  <div className="profile-menu">
                    <ul>
                      <li>
                        <Link href="/dashboard" className="link">
                          {fullName}
                        </Link>
                      </li>
                      <hr/>
                      <li>
                        <Link href="/dashboard" className="link">
                          Dashboard
                        </Link>
                      </li>
                      {
                        isAuth && !isGuest && <li>
                          <Link href="/profile?step=0" className="link">
                            Tutor profile
                          </Link>
                        </li>
                      }

                      <li>
                        <Link
                            href="/dashboard?tab=message"
                            className="link"
                        >
                          {unreadMessageCount > 0 ? (
                              <Badge badgeContent={unreadMessageCount} color="error">
                                Messages
                              </Badge>
                          ) : (
                              "Messages"
                          )}
                        </Link>
                      </li>
                      {
                        // !isExpired && user.billedAt === undefined &&
                          isExpired &&
                          <li>
                            <Link href="/billing">Subscription</Link>
                          </li>
                      }
                      <li>
                        <Link
                            href="/"
                            onClick={() => {
                              logoutHandle();
                            }}
                            className="link"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
              )}
            </li>
        ) : (
            <>
              <li>
                <Link  href="/signin" className="nav-item link sign-in">
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                    
                    href="/signup?parent"
                    className="nav-item join parent"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                    style={{backgroundColor: '#00AB55', marginRight: '6px'}}
                >
                  Parents Sign Up
                  <Box
                      style={{
                        position: 'absolute',
                        top: -13,
                        right: -1,
                      }}>
                    <Chip
                        label="It's Free!"
                        color="warning"
                        sx={{p: '2px', boxShadow: 1, borderRadius: '2px'}}
                        size="small"
                        variant="filled"
                    />
                  </Box>
                </Link>
                <Link
                    
                    href="/signup?tutor"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                    className="nav-item join"
                >
                  Tutor Sign Up
                  <Box
                      style={{
                        position: 'absolute',
                        top: -13,
                        right: -1,
                      }}>
                    <Chip
                        label="It's Free!"
                        color="warning"
                        sx={{p: '2px', boxShadow: 1, borderRadius: '2px'}}
                        size="small"
                        variant="filled"
                    />
                  </Box>
                </Link>
              </li>
            </>
        )}
      </ul>

      {/* Mobile menu  */}
      <div className={"right " + (menuOpen && "active")}>
        <div className="hamburger explore-more-mobile " onClick={() => setMenuOpen(!menuOpen)}>
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
      </div>

      <div className={"menu " + (menuOpen && "active")}>
        <ul>
          {isAuth && (
              <li className="full-name">
                <Link
                    className="nav-item link"
                    href="/dashboard"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{display: "flex", alignItems: "center", gap: "1rem"}}
                >
                  <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(${
                            avatar ? `${API_URL}${avatar}` : defaultAvatar
                        })`,
                        display: "inline-block",
                        justifyContent: "flex-start",
                        border: unreadMessageCount ? "2px solid #f00" : "none",
                      }}
                  ></div>
                  {fullName}
                </Link>
              </li>
          )}
          <li>
            <Link
                className="nav-item link"
                href="/"
                onClick={() => setMenuOpen(!menuOpen)}
            >
              Home
            </Link>
          </li>
          {isAuth && (
              <>
                <li>
                  <Link
                      className="nav-item link"
                      href="/dashboard"
                      onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                      className="nav-item link"
                      href="/dashboard?tab=message"
                      onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {unreadMessageCount > 0 ? (
                        <Badge badgeContent={unreadMessageCount} color="error">
                          Messages
                        </Badge>
                    ) : (
                        "Messages"
                    )}
                  </Link>
                </li>
                {/*<li>*/}
                {/*  <Link*/}
                {/*    className="nav-item"*/}
                {/*    to="/billing"*/}
                {/*    onClick={() => setMenuOpen(!menuOpen)}*/}
                {/*  >*/}
                {/*    <span>Subscription</span>*/}
                {/*  </Link>*/}
                {/*</li>*/}
              </>
          )}

          {
              isAuth && !isGuest && <li>
                <Link href="/profile?step=0" className="nav-item link">
                  Tutor profile
                </Link>
              </li>
          }
          <li>
            <Link
                className="nav-item link"
                href="/search"
                onClick={() => setMenuOpen(!menuOpen)}
            >
              Search maths tutor
            </Link>
          </li>
          <li>
            <Link
                className="nav-item link"
                href="/contact"
                onClick={() => setMenuOpen(!menuOpen)}
            >
            Contact us
            </Link>
          </li>
        </ul>
        <ul>
          {isAuth ? (
              <li>
                <Link
                    className="nav-item link"
                    href="/"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                      logoutHandle();
                    }}
                >
                  Log out
                </Link>
              </li>
          ) : (
            <>
              <li >
                <Link
                  className="nav-item link parent"
                  href="/signup?parent"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  Parent Sign Up
                  <Box
                    >
                    <Chip
                      label="It's Free!"
                      color="warning"
                      sx={{ p: '2px', boxShadow: 1, borderRadius: '2px' }}
                      size="small"
                      variant="filled"
                    />
                  </Box>
                </Link>
              </li>
              <li>
                <Link
                    className="nav-item link"
                    href="/signup?tutor"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                >
                  Tutor Sign Up
                  <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                    <Chip
                        label="It's Free!"
                        color="warning"
                        sx={{ p: '2px', boxShadow: 1, borderRadius: '2px' }}
                        size="small"
                        variant="filled"
                    />
                  </Box>
                </Link>

              </li>
              <li>
                <Link
                  className="nav-item link"
                  href="/signin"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
