import React from "react";
import {useSelector} from "react-redux";
import { useRouter } from 'next/navigation'

const ProfileStepInformationStatuses = () => {
    const router = useRouter()
    const {
        avatar,
        about,
        price,
        qualifications,
        title,
        online,
        faceToFace,
        gender,
        isAgency,
        links,
        publish,
        email,
        phone,
        exam,
        level,
        _id,
        status,
    } = useSelector((state) => state.profile.user);

    return (<>
        {/*<div style={{maxWidth: '700px', margin: '40px 0px 0px 0px'}}>*/}
            <div className={'profile-detail-section'}>
                      <span className={'profile-cat'} onClick={() => router.push('/profile?step=0')}>
                        <strong>What level of maths can you teach?</strong>
                      </span>
                {(Object.keys(level).some(k => level[k])) ? (
                    <span className={'profile-cat-done'}>Completed</span>) : (
                    <span className={'profile-cat-not-done'}>Incomplete</span>)}
            </div>
            <div className={'profile-detail-section'}>
                    <span className={'profile-cat'} onClick={() => router.push('/profile?step=1')}>
                      <strong>What exam board can you teach?</strong>
                      <span style={{color: '#929292', fontSize: '16px'}}> (Optional)</span>
                    </span>
                {(Object.keys(exam).some(k => exam[k])) ? (<span className={'profile-cat-done'}>Completed</span>) : (
                    <span className={'profile-cat-not-done'} style={{color: 'lightgray'}}>
                        <hr
                            style={{
                                width: '94px',
                                borderColor: 'lightgray',
                                color: 'lightgray',
                                border: 'none',
                                margin: '14px 0px',
                                height: '1.2px',
                                backgroundColor: 'lightgray'
                            }}
                        />
                    </span>)}
            </div>
        <div className={'profile-detail-section'}>
            <span className={'profile-cat'} onClick={() => router.push('/profile?step=2')}>
              <strong>Select your price and tutoring options</strong>
            </span>
            {(online || faceToFace) ? (<span className={'profile-cat-done'}>Completed</span>) : (
                    <span className={'profile-cat-not-done'}>Incomplete</span>)}
            </div>
            <div className={'profile-detail-section'}>
                  <span className={'profile-cat'} onClick={() => router.push('/profile?step=3')}>
                    <strong>Create your tutor profile</strong>
                  </span>
                {(isAgency !== -1 && title && gender !== -1 && publish !== -1 && about && avatar) ? (
                    <span className={'profile-cat-done'}>Completed</span>) : (
                    <span className={'profile-cat-not-done'}>Incomplete</span>)
                }
            </div>
            <div className={'profile-detail-section'}>
              <span className={'profile-cat'} onClick={() => router.push('/profile?step=4')}>
                <strong>Tell us about your qualifications</strong>
              </span>
                {(Object.keys(qualifications).some(k => qualifications[k] !== -1)) ? (
                <span className={'profile-cat-done'}>Completed</span>) : (
                <span className={'profile-cat-not-done'}>Incomplete</span>)}
            </div>
            <div className={'profile-detail-section'}>
              <span className={'profile-cat'} onClick={() => router.push('/profile?step=5')}>
                <strong>How do clients get in touch with you?</strong> <span
                  style={{color: '#929292', fontSize: '16px'}}>(Optional)</span>
              </span>
              {(email || phone) ? (<span className={'profile-cat-done'}>Completed</span>) : (
              <span className={'profile-cat-not-done'}><hr
              style={{ width: '94px',
                  borderColor: 'lightgray',
                  color: 'lightgray',
                  border: 'none',
                  margin: '14px 0px',
                  height:'1.2px',
                  backgroundColor: 'lightgray' }}
              /></span>)}
            </div>
        {/*</div>*/}
    </>);
}

export default ProfileStepInformationStatuses