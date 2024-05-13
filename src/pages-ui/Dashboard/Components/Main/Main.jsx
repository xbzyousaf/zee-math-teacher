import React, { useEffect, useState } from "react";
import "./Main.css";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation'
import {isProfileCompleted} from "../../../../utils";
import ProfileStepInformationStatuses from "../../../Profile/Components/ProfileStepInformationStatuses";

const Main = (props) => {
  const profileUser = useSelector((state) => state.profile.user);
  const { _id, status } =  useSelector((state) => state.profile.user);
  const { messages } = useSelector((state) => state.profile);

  const router = useRouter()
  const {
    createdAt,
    billedAt,
    status: accountStatus,
  } = useSelector((state) => state.main);
  const [unreadCount, setUnreadCount] = useState(
    "There is no unread messages."
  );
  useEffect(() => {
    const count = messages.filter((message) => !message.isRead).length;
    if (count > 1) setUnreadCount(
        <span style={{fontWeight: "600"}}>
      There are
      <span style={{ color: 'green' }}>{count}</span>
      unread messages.
    </span>);
    if (count === 1) setUnreadCount(
        <span style={{fontWeight: "600"}}>
      There is
      <span style={{color: '#00AB55'}}> {count} unread </span>
       messages.
    </span>
    );
  }, [messages]);
  const subscriptionStrings = {
    TrialEnded:
      "Your trial period is ended. Please subscribe to make your account active",
    Trial: "Your account is in trial period until ",
    Expired:
      "Your account is expired. Please subscribe to make your account active",
    Paid: "Your account is active until ",
  };

  let subscription = "",
    date = "";

  if (billedAt) {
    // Convert the billedAt value into a Date object (assuming billedAt is in a valid date format)
    const billedAtDate = new Date(billedAt);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Check if billedAt is before one year ago
    const isExpired = billedAtDate < oneYearAgo;
    subscription = subscriptionStrings[isExpired ? "Expired" : "Paid"];

    if (!isExpired) {
      // Calculate when the data will expire, which is one year after billedAt
      const expirationDate = new Date(billedAtDate);
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      const options = { day: "numeric", month: "long", year: "numeric" };
      date = expirationDate.toLocaleDateString("en-GB", options); // Format the date as YYYY-MM-DD
    }
  } else {
    // Convert the createdAt value into a Date object (assuming createdAt is in a valid date format)
    const createdAtDate = new Date(createdAt);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Check if createdAt is before three months ago
    const isExpired = createdAtDate < threeMonthsAgo;
    subscription = subscriptionStrings[isExpired ? "TrialEnded" : "Trial"];

    if (!isExpired) {
      // Calculate when the trial will expire, which is three months after createdAt
      const expirationDate = new Date(createdAtDate);
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      const options = { day: "numeric", month: "long", year: "numeric" };
      date = expirationDate.toLocaleDateString("en-GB", options);
    }
  }
  const statusColor = (status, accountStatus) => {
    return !_id ? '#ba4e00' : isProfileCompleted(profileUser) && status === 0 ? '#00AB55' : status === 1 && accountStatus === 0 ? '#ba4e00' : status === 0 ? '#1976d2' : accountStatus === 2 ? '#da1e28' : '#24A148';
  }
  return (
    <div className="main-dashboard-container">
      <div className="main-dashboard bd-grey">
        <h3 style={{display: "inline"}}>Unread Messages</h3>
        <div className="message" style={{ marginTop: '8px' }}>
          <p style={{ marginTop: '15px' }}>{unreadCount}</p>
        </div>
      </div>
      <div className="main-dashboard bd-grey">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{display: "inline"}}>Profile Status: </h3>
            <h3 style={{display: "inline", color: statusColor(status, accountStatus), marginLeft: '10px'}}>
              {
                !_id ? 'Not Created' : isProfileCompleted(profileUser) && status === 0 && accountStatus === 0 && !profileUser?.isSubmitted ? 'Completed' : status === 0 && accountStatus === 0 && profileUser?.isSubmitted ? 'Pending' : status === 0 && accountStatus === 0 && !profileUser?.isSubmitted ? 'Draft' : 'Live'
              }
            </h3>
          </div>
          <div>
          {
              status === 1 && accountStatus === 1 && <Button
                  variant="contained"
                  color="primary"
                  style={{ textWrap: 'nowrap', marginRight: '10px' }}
                  onClick={() => window.open(`/tutor/${_id}`)}
              >
                View profile
              </Button>
          }
          {
              <Button
                  type="button"
                  variant="contained"
                  className='clear'
                  onClick={() => isProfileCompleted(profileUser) && status === 0 ? (profileUser.isSubmitted ? router.push('/profile?step=0') : router.push('/profile?step=6')) : router.push('/profile')}
              >
                {!_id ? 'Create profile' : _id && isProfileCompleted(profileUser) && status === 0 && !profileUser?.isSubmitted ? 'Submit profile for review' : 'Edit profile' }
              </Button>
          }
          </div>
        </div>
        <div className="message" style={{ marginTop: '8px' }}>
          <p style={{ marginTop: '15px' }}>
            {
              !_id
                ? "You haven't created a profile yet."
                  : isProfileCompleted(profileUser) && status === 0 && accountStatus === 0 && !profileUser?.isSubmitted ? 'You have completed your tutoring profile, but you have not submitted this for approval.'
                    : status === 0 && accountStatus === 0 && profileUser?.isSubmitted ?
                      'You have submitted a profile, but has not been approved by admin.'
                        : status === 0 ? `You profile is not live. The red writing ‘incomplete’ requires information.`
                          : "Your profile has been approved by admin and is now live on the website. All required information is completed."
            }
          </p>
        </div>

        <div style={{maxWidth: '700px', margin: '0px'}}>
          <ProfileStepInformationStatuses />
        </div>
      </div>
      {
        subscriptionStrings.TrialEnded === subscription &&
          <div className="main-dashboard bd-grey">
            <h3>Subscription</h3>
            <div className="message">
              <p style={{ padding: "0 1rem" }}>
                {subscription}
                {date.length > 0 && date}.
              </p>
            </div>
          </div>
      }
    </div>
  );
};

export default Main;
