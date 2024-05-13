"use client";
import React from 'react'
import Link from 'next/link'
import './footer.css'

const Footer = () => {
  var year = new Date().getFullYear()

  return (
    <div className="footer">
      <p>Copyright © 2023-{year} Maths Directory. All rights reserved.</p>
      <span style={{ display: 'inline-flex', gap: '1rem' }}>
        <Link className="pink" href="/terms" target="_blank">
          Terms and Conditions
        </Link>
        <Link className="pink" href="/cookies-policy" target="_blank">
          Cookies Policy
        </Link>
        {/*<Link className="pink" to="/about">*/}
        {/*  About us*/}
        {/*</Link>*/}
      </span>
    </div>
  )
}

export default Footer
