import React from 'react'
import './Cookies.css'
import  UnderCurve  from '../../../public/assets/images/undercurve.svg';
import Image from 'next/image';


const Cookies = () => {
  return (
    <>
      <br/>
      <div className="cookies-container">
        <div className="terms-heading-box">
          <div className="page-heading">
            <h1>Cookie Policy</h1>
            <Image src={UnderCurve} alt="" />
          </div>
        </div>
        <div className="cookies-bottom-box">
          <h3 style={{ textAlign: 'center' }}>This Cookie Policy was last updated on 27 February 2024</h3>

          <p>We have divided our Cookie Policy into three parts,</p>
          <ol>
            <li><strong>Consent</strong>, explains how you can agree or refuse the use of cookies on your
              computer.
            </li>
            <li><strong>Disclosure</strong>, explains and informs you about the types of cookies we use.
            </li>
            <li><strong>Opting Out</strong> describes how you can opt-out from consent and how you can
              contact us for information.
            </li>
          </ol>

          <ol className="padding-left-20 heading">
            <li><strong><u>Consent </u></strong></li>
          </ol>
          <p><em>Our Cookie Policy</em></p>
          <p>Maths Directory may use cookies, web beacons, tracking pixels, and other tracking technologies
            when you visit our website at &nbsp;<a
              href="http://www.mathsdirectory.co.uk">https://www.mathsdirectory.co.uk</a>. It may include
            any other
            media form, media channel, mobile website, or mobile application related or connected to our
            website that will help and improve your experience.</p>
          <p>You have the option to</p>
          <ul style={{ marginTop: '10px' }}>
            <li>consent to us placing cookies on your computer.</li>
            <li>opt-out.</li>
            <li>change your cookie settings.</li>
          </ul>
          <p style={{ marginBottom: '20px' }}> You may do this by clicking on the buttons and links on the cookie banner
            or pop-up on our home
            page.</p>
          <p>We will not place cookies on your computer unless you give us your consent.</p>
          <p>For further information about what cookies are and what they do, please visit <a
            href="https://www.allaboutcookies.org/">https://www.allaboutcookies.org/</a>.</p>
          <p style={{ marginBottom: '20px' }}>We may make changes to this Cookie Policy at any time and for any reason.
            We will let you know
            about any changes by updating the date of this Cookie Policy. </p>
          <p style={{ marginBottom: '20px' }}>We suggest you check this Cookie Policy occasionally to stay informed of
            updates.</p>
          <p><em>What are Cookies?</em></p>
          <p style={{ marginBottom: '20px' }}>A &ldquo;cookie&rdquo; is a string of information that assigns you a
            unique identifier that we
            store on your computer. Your browser then provides that unique identifier to use each time you
            submit a question to our website. We use cookies on our website to keep track of the services
            you have used. For example, record your user preferences, keep you logged into our website or
            track the pages you visit. Cookies help us understand how our website is being used and improve
            your user experience.</p>
          <ol start="2" className="padding-left-20 heading">
            <li><strong>Disclosure</strong></li>
          </ol>
          <p style={{ marginTop: '5px' }}><em>Cookie Types</em></p>
          <p>We may use the following types of cookies when you visit our Website,</p>
          <ul>
            <li>functionality cookies.</li>
            <li>preference cookies.</li>
            <li>session cookies.</li>
          </ul>
          <p style={{ marginBottom: '10px' }}>You should be aware of the following types of cookies.</p>
          <ol style={{ listStyleType: 'lower-alpha' }} className="padding-left-20">
            <li>Advertising Cookies
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>Advertisers and ad servers may place
                cookies on your computer to display
                advertisements that might interest you. These cookies allow advertisers and ad
                servers to gather information about your visits to our website and other websites,
                alternate the ads sent to a specific computer, and track how often an ad has been
                viewed and by whom. These cookies are linked to a computer and do not gather any
                personal information about you.
              </p>
              {/*</ol>*/}
            </li>
            <li>Analytics Cookies <br/>
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>Analytics cookies monitor how users
                reached our website and how they interact with
                and move around once on our website. These cookies let us know what features on our
                website are working the best and what features can be improved.
              </p>
              {/*</ol>*/}
            </li>
            <li>Our Cookies
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>Our cookies are &ldquo;first-party
                cookies&rdquo;, and can be either permanent or
                temporary. These are necessary cookies, without which our website will not work
                correctly or be able to provide certain features and functionalities. Some of these
                may be manually disabled in your browser but may affect the functionality of our
                website.
              </p>
              {/*</ol>*/}
            </li>
            <li>Personalisation Cookies
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>We use personalisation cookies to
                recognise repeat visitors to our website. We use
                these cookies to record your browsing history, the pages you have visited, and your
                settings and preferences each time you visit our website.
              </p>
              {/*</ol>*/}
            </li>
            <li>Security Cookies
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>Security cookies help identify and prevent
                security risks. We use these cookies to
                authenticate users and protect user data from unauthorised parties.
              </p>
              {/*</ol>*/}
            </li>
            <li>Website Management Cookies
              {/*<ol className="padding-left-20">*/}
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>We use website management
                cookies to maintain your identity or session on our
                website or if you log off unexpectedly. Any information you enter is retained from
                page to page. It is not possible to turn these cookies off individually, but you can
                disable all cookies in your browser.
              </p>
            </li>
            {/*</ol>*/}
            <li>Third-Party Cookies
              <p className="padding-left-20" style={{ marginBottom: '10px' }}>Third-party cookies may be
                placed on your computer when you visit our website by
                companies that run certain services we offer. These cookies allow third parties to
                gather and track certain information about you. These cookies can be manually
                disabled in your browser.
              </p>
            </li>
          </ol>
          <ol start="3" className="padding-left-20 heading">
            <li><em><strong>Opting Out</strong></em></li>
          </ol>
          <p><em>How Cookies are Controlled</em></p>
          <p style={{ marginBottom: '10px' }}>Most browsers accept cookies by default. However, you can remove or reject
            cookies in your
            browser's settings. Please be aware that such action could affect the availability and
            functionality of our website and services.</p>
          <p style={{ marginBottom: '10px' }}>For more information on how to control cookies, check your browser or
            device&rsquo;s settings for
            how you can control or reject cookies, or visit the following links:</p>
          <p><u><a target="_blank" href="https://support.apple.com/kb/ph19214?locale=en_US">Apple Safari</a></u></p>
          <p><u><a
            target="_blank"
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&amp;hl=en">Google
            Chrome</a></u></p>
          <p><u><a target="_blank" href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy">Microsoft
            Edge</a></u></p>
          <p><u><a
            target="_blank"
            href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies">Microsoft
            Internet Explorer</a></u></p>
          <p><u><a target="_blank"
                   href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">Mozilla
            Firefox</a></u></p>
          <p><u><a target="_blank" href="http://www.opera.com/help/tutorials/security/cookies/">Opera</a></u></p>
          <p><u><a
            target="_blank"
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&amp;hl=en&amp;oco=1">Android
            (Chrome) </a></u></p>
          <p><u><a
            target="_blank"
            href="https://help.blackberry.com/en/blackberry-classic/10.3.1/help/mwa1334238823957.html">Blackberry</a></u>
          </p>
          <p><u><a
            target="_blank"
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DiOS&amp;hl=en&amp;oco=1">iPhone
            or iPad (Chrome)</a></u></p>
          <p><u><a
            target="_blank"
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&amp;hl=en&amp;oco=1">iPhone
            or iPad (Safari)</a></u></p>
          <p style={{ marginBottom: '10px' }}>You may also opt out of some third-party cookies by using the <u><a
            href="http://optout.networkadvertising.org/#!/">Network Advertising Initiative&rsquo;s Opt-Out
            Tool. </a></u></p>
          <p>Other tracking technologies</p>
          <p style={{ marginBottom: '10px' }}>In addition to cookies, we may use web beacons, pixel tags, and other
            tracking technologies on
            our website to help customise our website and improve your experience. A &ldquo;web
            beacon&rdquo; or &ldquo;pixel tag&rdquo; is a tiny object or image embedded in a web page or
            email. They are used to track the number of users who have visited particular pages and viewed
            emails and acquire other statistical data. They collect only a limited set of data, such as a
            cookie number, the time and the date of a page or email view, and a description of the page or
            email on which they reside. It is not possible to refuse web beacons and pixel tags. However,
            you can limit their use by controlling the cookies that interact with them.</p>
          <p><strong>Our Privacy Policy</strong></p>
          <p>For more information about how we use information collected by cookies and other tracking
            technologies, please read our Privacy Policy on our website. We have placed a link in the footer
            on our home page. This Cookie Policy is part of our Privacy Policy. By using our website, you
            agree to be bound by this Cookie Policy and our Privacy Policy.</p>
          <p><strong>Contact</strong></p>
          <p>If you have questions or comments about this Cookie Policy, please contact us at:</p>
          <p>Email: hello@mathsdirectory.co.uk</p>
          <p>Address:</p>
          <p>Education zone Ltd t/a Maths Directory,</p>
          <p>Churchill House,</p>
          <p>Brent St,</p>
          <p>London NW4 4DJ</p>
          <p>UK.</p>
        </div>
      </div>
    </>
  )
}

export default Cookies
