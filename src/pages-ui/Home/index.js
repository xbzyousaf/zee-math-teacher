// src/components/Home/Home.jsx
"use client";
import { useRouter } from "next/router";

const Home1 = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Home page</h1>
      <button onClick={() => router.push("/about")}>Go to About</button>
    </div>
  );
};

export default Home1;
