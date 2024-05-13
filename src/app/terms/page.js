"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Footer from "../../pages-ui/Footer/Footer";
import Navbar from "../../pages-ui/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { syncDatabaseUser } from "../../store/main";
import Link from "next/link";

import "../App.css";

import {
  getMyProfile,
  getMyMessages,
  getGuestProfile,
} from "../../store/setProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connectSocket, socket } from "../../socket";
import TermsPage from "../../pages-ui/Terms";

export default function Terms() {
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <main className="header-component">
        <TermsPage />
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
