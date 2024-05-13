"use client";
import React from 'react';
import './AboutUs.css';
import Curve from "../../../public/assets/images/undercurve.svg";
import Image from 'next/image';

// import { convert } from 'html-to-text';
const AboutUsPage = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-heading-box">
          <div className="page-heading">
            <h1>About Math Teacher</h1>
            <Image src={Curve} alt="" />

          </div>
        </div>

        <div className="about-bottom-box">
          <div className="about-row">
            <div className="about-left-col">
              <img src="/assets/shutterstock_1482888587-min.jpg" alt="" className="about-left-img" />
            </div>
            <div className="about-right-col">
              <h4>About</h4>
              <h2>Maths Teacher</h2>
              <p>
                At Maths Teacher, we firmly believe in our mantra: "<strong>Maths is a subject for life, not just for school</strong>." We understand that when your child studies Maths, the skills they gain extend far beyond their classroom years. Our ethos revolves around four key areas:
              </p>
              <ol>
                <li>
                  <strong>Educational Success:</strong> Exams and results matter. We emphasize the importance of academic achievements such as 11+, GCSE, or A-level grades, as they stay with your child throughout their life and open doors to new opportunities. We strive to help your child thrive and surpass their own potential.
                </li>
                <li>
                  <strong>Effective Communication:</strong> Language is a powerful tool, and we teach your child how to communicate effectively in spoken and written Maths. This skill is essential not only during their academic years but also in university, the workplace, and beyond. We provide them with the skills, tools, knowledge, and confidence to convey ideas with clarity, precision, and intelligence.
                </li>
                <li>
                  <strong>Lifelong Readers:</strong> Nurturing a love of reading and books in your child is our goal. We want them to become lifelong readers, continually learning and exploring through books. We aim to foster their reading interests and guide their journey towards becoming independent adult readers who appreciate literature and choose to read throughout their lives.
                </li>
                <li>
                  <strong>Emotional Literacy:</strong> Emotional literacy refers to self-awareness, recognition of one's feelings, and empathy towards others. Through the literature we study, we help develop emotional literacy in Maths. By exploring stories from various time periods and cultures, your child will gain a broader perspective, empathy, and a more empathetic lens to view the world and those around them.
                </li>
              </ol>
              <p>
                Our teachers at Maths Teacher possess a unique set of skills and qualities that inspire and guide children through their learning journeys. They are qualified professionals with experience teaching in schools across the UK, examining at GCSE or A-level, and have a deep understanding of Maths. Our teachers serve as role models for your child, displaying passion, enthusiasm, patience, inspiration, and empathy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
