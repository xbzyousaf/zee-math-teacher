"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Footer from "../pages-ui/Footer/Footer";
import Navbar from "../pages-ui/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { syncDatabaseUser } from "../store/main";
import Link from "next/link";

import "./App.css";

import {
  getMyProfile,
  getMyMessages,
  getGuestProfile,
} from "../store/setProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connectSocket, socket } from "../socket";
import Root from "../pages-ui/Home/Home";

export default function Home() {
  const isAuth = useSelector((state) => !!state.main.userId);
  const isGuest = useSelector((state) => state.main.isGuest);

  const dispatch = useDispatch();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const token = localStorage.getItem("mathsAuthToken");
    if (token) {
      dispatch(syncDatabaseUser());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      if (isGuest) {
        dispatch(getGuestProfile());
      }
      dispatch(getMyProfile());
      dispatch(getMyMessages());
      connectSocket();
      if (socket) {
        socket.on("message", (message) => {
          dispatch(getMyMessages());
        });
      }
    } else {
      if (socket) {
        socket.disconnect();
      }
    }
  }, [isAuth, isGuest, dispatch]);
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <main className="header-component">
        <Root />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
