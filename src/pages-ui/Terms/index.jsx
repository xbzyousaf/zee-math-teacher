"use client";
import React from 'react';
import './AboutUs.css';
import  UnderCurve  from '../../../public/assets/images/undercurve.svg';
import Image from 'next/image';


// import { convert } from 'html-to-text';
const Terms = () => {
  return (
      <>
    
        <br/>
        <div className="terms-container">
          <div className="terms-heading-box">
            <div className="page-heading">
              <h1>Terms and Conditions</h1>
              <Image src={UnderCurve} alt="" />
            </div>
          </div>

          <div className="terms-bottom-box">
            <div>
              <h2>Your Privacy</h2>
              <p>To use this website and use our Services, we may ask you to give us details or information to be able
                to
                register with us for an account on our website or when you use our Services. It is a condition of use
                that
                all the information you give us is accurate, true and current. You agree that any information you give
                us
                is
                regulated by our Privacy Policy. You also agree to all actions we take concerning your information
                according
                to that Privacy Policy. Please read our Privacy Policy for more information on your personal data.</p>
            </div>
            <div>
              <h2>Cookies</h2>
              <p>Our website uses cookies; by using our website or agreeing to these Terms and Conditions, you agree to
                our
                use of cookies following the terms of our Privacy and Cookie Policy.</p>
            </div>

            <div>
              <h2>Our Services</h2>
              <p>
                We manage www.mathsdirectory.co.uk, a platform designed to connect tutors with parents seeking educational support for their children. Our website is freely accessible to both tutors and parents.
                While our current setup remains the same, we are open to potential adjustments in the future to ensure the sustainability of the platform.
              </p>
            </div>

            <div>
              <h2>Definitions</h2>
              <ul style={{padding: 0}}>
                <li><span><strong>“we” </strong>,<strong> “us”</strong>, and <strong>“our”</strong> mean Maths Directory</span></li>
                <li><span><strong>“user” </strong>,<strong> “you”</strong>, and <strong>“your”</strong> refer to site
                  visitors, customers, and any other users of
                  the
                  site.
                  </span></li>
                <li><strong>“Maths Directory”</strong> means Maths Directory the business that owns and runs this
                  website
                  and provides Services.
                </li>
                <li><strong>“Site”</strong> means the Maths Directory website which provides the Services at <a
                    href="https://www.mathsdirectory.co.uk"
                    target="_blank" rel="noreferrer"
                    className="no-underline hover-underline">www.mathsdirectory.co.uk</a></li>
                <li><strong>“Services”</strong> means any Services that Maths Directory may provide, such as the Tutor
                  directory.
                </li>
                <li><strong>“Tutor Directory”</strong> means a directory or list of Tutors accessible by members of the
                  public who can choose a Tutor.
                </li>
                <li><strong>“Visitor”</strong> means anyone who visits or browses our Site.</li>
                <li><strong>“Client” or ”Customer”</strong> means a Visitor to our Site who intends or has used the
                  Tutor
                  Directory.
                </li>
              </ul>
            </div>

            <div>
              <h2>Using our Site</h2>
              <p>You must be 18 years of age or older to use our website and Services.</p>
            </div>

            <div>
              <ol className="custom-listing">
                <li><strong>Consideration and Charges</strong>
                  <ol>
                    <li>You acknowledge that we provide our Site and Services and you use our site and facilities for
                      your
                      benefit in being able to conveniently find a tutor. You are also contribute to the client base for
                      tutors on our site which they would not ordinarily have access to which is of value which is why
                      Tutors want to use our site and therefore is good consideration for this agreement.
                    </li>
                    <li>Tutors pay an annual subscription fee to be listed on our site.</li>
                  </ol>
                </li>
                <li><strong>Lawful Purposes</strong>
                  <ol>
                    <li>You may use our Site for lawful purposes only. You agree to be financially responsible for all
                      purchases made by you or someone acting for you through the Site. You agree to use the Site and to
                      purchase Products through the Site for legitimate, non-commercial purposes only.
                    </li>
                    <li>You must not post or transmit any material which violates or infringes the rights of others
                      through our Site. Or which is threatening, abusive, racist, offensive, defamatory, libellous,
                      invasive of privacy or publicity rights, vulgar, obscene, profane, or otherwise objectionable,
                      contains injurious formulas, recipes, or instructions, which encourages behaviour that that would
                      be
                      a criminal offence, give rise to civil liability, or otherwise violate any law.
                    </li>
                  </ol>
                </li>
                <li><strong>Service Description</strong>
                  <ol>
                    <li>We try to describe and display our services as accurately as possible. While we want to be as
                      clear as possible in explaining our services and tutor&rsquo;s information or giving their
                      description or any other information, we give no guarantee that information on the Site, is
                      accurate, complete, reliable, current, or error-free.
                    </li>
                    <li>We are not responsible for any inaccuracy, error, or incompleteness in our website content.</li>
                    <li>We may refuse or cancel any Service with an incorrect listing.</li>
                  </ol>
                </li>
                <li><strong>Intellectual Property Rights</strong>
                  <ol>
                    <li>Our Site contains intellectual property owned by Maths Directory, including trademarks,
                      copyrights, proprietary information, and other intellectual property. You may not modify, publish,
                      transmit, participate in the transfer or sale of, create derivative works from, distribute,
                      display,
                      reproduce or perform, or in any way exploit in any format any of the Site Content or intellectual
                      property, in whole or in part, without our written permission. We may use our right to immediately
                      remove you from the Site, without refund, if you are caught breaking this intellectual property
                      policy.
                    </li>
                  </ol>
                </li>
                <li><strong>Change of Terms</strong>
                  <ol>
                    <li>We may at any time change these Terms and Conditions. Such changes are effective from the time
                      we
                      have posted the new Terms and Conditions on this Site. Any use of the Site by you after these
                      Terms
                      have been posted means you accept these amendments. We reserve the right to update any portion of
                      our Site, including these Terms and Conditions, at any time. We will post the most recent versions
                      to the Site and list the effective dates on the pages of our Terms and Conditions. We advise you
                      to
                      check these Terms and Conditions at regular intervals.
                    </li>
                  </ol>
                </li>
                <li><strong>Termination</strong>
                  <ol>
                    <li>You agree that we can terminate your use or access to this Site and Services at any time without
                      notice if you break any of these terms and Conditions.
                    </li>
                    <li>The duration of the contract for the duration of the Service or until performance has been
                      completed by both parties.
                    </li>
                    <li>This agreement can be terminated at any time for any reason by mutual agreement.</li>
                  </ol>
                </li>
                <li><strong>Climate Assurance</strong>
                  <ol>
                    <li>Both parties agree to, wherever possible, perform their obligations under this Agreement in a
                      way
                      that reduces or minimises the Carbon Footprint associated with any activities under this
                      Agreement.
                      For example, using digital forms and communication instead of paper forms or using non-plastic
                      items.
                    </li>
                    <li>Either party should use all reasonable efforts to make sure that any necessary third party, use
                      such documents or plastic and perform such acts as may reasonably be required for reducing the
                      Carbon footprint as a measure to protect the environment.
                    </li>
                  </ol>
                </li>
                <li><strong>Responsibility and Liability</strong>
                  <ol>
                    <li>We do not guarantee that your use of our service or site will be uninterrupted, timely, secure
                      or
                      error-free.
                    </li>
                    <li>We do not guarantee the results that may be obtained from the use of our Services or listings.
                    </li>
                    <li>You agree that from time to time we may reasonably remove the Service for indefinite periods or
                      cancel the service at any time, without notice to you.
                    </li>
                    <li>We will not be liable in respect of any loss of profits, income, revenue, use, production, or
                      anticipated savings or earnings.
                    </li>
                    <li>We will not be liable for any loss of business, contracts, or commercial opportunities.</li>
                    <li>We will not be liable in respect of any loss or corruption of any data, database, or software.
                    </li>
                    <li>Subject to GDPR or the Data Protection Act 2018, if applicable, we will not be liable for any
                      data
                      breach or data protection losses that were contributed to or caused by you.
                    </li>
                    <li>Neither party will be liable for any losses arising out of a Force Majeure.</li>
                    <li>In no case will we, our employees or representatives be liable for indirect, incidental,
                      consequential or any other remedies as a result of using our Services or by any other third
                      parties.
                      Additionally, we are not liable for damages or remedies for website failure, error, omission,
                      attack
                      by hackers or pirates, interruption, delay in operation or transmission of videos, computer virus,
                      or system failure; third-party theft of, destruction of or unauthorised access or alteration or
                      use
                      of your information or personal data (subject to GDPR or the Data Protection Act 2018 if
                      applicable), whether we were negligent or not.
                    </li>
                    <li>Neither party will be liable for breach-of-contractual damages suffered by the other
                      party&nbsp;that are remote or speculative, or that&nbsp;could not have reasonably
                      been&nbsp;foreseen
                      before entering into this agreement.
                    </li>
                    <li>We provide a directory service where the tutor is verified before they are listed on our Site.
                      We
                      vet all tutors carefully and collect references, but they are not our employees or
                      representatives.
                      It is your responsibility to ensure that adequate adult supervision is in place during tutorials
                      or
                      lessons
                    </li>
                    <li>Maths Directory are not liable for any claims by you arising out of or related to tutoring by a
                      Tutor listed on our site
                    </li>
                  </ol>
                </li>
                <li><strong>Third-Party Links</strong>
                  <ol>
                    <li>Our Site contains links to third-party websites and resources. You acknowledge and agree that we
                      are not responsible or liable for the availability, accuracy, content, or policies of third-party
                      websites or resources. Links to such websites or resources do not imply any endorsement by or
                      affiliation with Maths Directory. You acknowledge sole responsibility for and assume all risk
                      arising from your use of any such websites or resources.
                    </li>
                  </ol>
                </li>
                <li><strong>Payment for loss or damage</strong>
                  <ol>
                    <li>You agree to pay us for any losses, damage, settlements, liabilities, costs, charges,
                      assessments,
                      and expenses, as well as third party claims and causes of action, including, without limitation,
                      lawyer&rsquo;s fees, arising from any breach by you of any of these Terms and Conditions, or any
                      use
                      by you of the Site. You will provide us with any help that we might ask for in connection with any
                      such defence without any charge including, without limitation, giving us such information,
                      documents, records, and reasonable access as we see necessary. You will not resolve any
                      third-party
                      claim or reject any defence without our previous written permission.
                    </li>
                  </ol>
                </li>
                <li><strong>Notices</strong>
                  <ol>
                    <li>Our Contact details are:
                      <p style={{margin: '0px', paddingLeft: '30px'}}>
                        <strong>
                          Educationzone Ltd t/a Maths Directory<br/>
                          Company Number: 07009015<br/>
                          Churchill House,<br/>
                          Brent St,<br/>
                          London NW4 4DJ<br/>
                          UK
                        </strong>
                      </p>
                    </li>
                    <li>All notices, requests, demands, and other communications under this agreement must be in writing
                      and sent by email to:
                      <p style={{margin: '0px', paddingLeft: '30px'}}>
                        <a href='mailto:hello@mathsdirectory.co.uk' target='_blank'>hello@mathsdirectory.co.uk</a>
                      </p>
                    </li>
                  </ol>
                </li>
                <li><strong>Whole Agreement</strong>
                  <ol>
                    <li>These Terms and Conditions including the Privacy Policy, Cookie Policy, and any attachments are
                      the whole agreement between Maths Directory and you,
                    </li>
                    <li>and cancels all other verbal or written understandings concerning this agreement that were made
                      outside this agreement.
                    </li>
                  </ol>
                </li>
                <li><strong>Events or circumstances beyond our reasonable control</strong>
                  <ol>
                    <li>Where an event beyond our reasonable control known as a Force Majeure Event gives rise to a
                      failure or delay in either party performing its obligations under the Agreement (other than
                      obligations to make payment), those obligations will be suspended for the duration of the Force
                      Majeure Event. Examples of such events and circumstances, but not limited to, include fire, flood
                      and other natural occurances, strikes, trade disputes, lockouts, restrictions of imports or
                      exports,
                      riot, accident, disruption to energy supplies, lockdowns, pandemics, civil commotion, acts of
                      terrorism or war.
                    </li>
                  </ol>
                </li>
                <li><strong>Invalid Clauses</strong>
                  <ol>
                    <li>If an appropriate court or arbitrator decides that a clause or condition in this contract is
                      invalid or it conflicts with the law, the invalid clause can be cut from this agreement leaving
                      the
                      rest of the agreement valid and unaffected.
                    </li>
                  </ol>
                </li>
                <li><strong>The law and jurisdiction of this agreement</strong>
                  <ol>
                    <li>You agree that any dispute or claim arising out of this agreement or in connection with its
                      subject matter or formation, including non-contractual disputes or claims, will be governed and
                      interpreted according to the law of England and Wales in English. You also agree that English
                      courts
                      have exclusive jurisdiction except for negotiation and mediation resolution which may be used as
                      an
                      option before court action if both parties agree.
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </>
  );
};

export default Terms;
