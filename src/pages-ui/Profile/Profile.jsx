import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import Step0 from './Steps/Step0';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';

import {useRouter ,useSearchParams } from 'next/navigation'
import { saveProfile, submitProfile, setSuccess, initInformation } from '../../store/setProfile';
import SweetAlert from "sweetalert2"

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(searchParams);

  // Access individual query parameters by name
  const step = parseInt(queryParams.get('step') || 0);
  const level = useSelector(state => state.profile.information.level)

  const goToStep = (newStep) => {

    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('step', newStep);

    router.push(`${location.pathname}?${queryParams.toString()}`);
  };

  const nextStep = () => {
    if (step ===6) return
    if (step !== 0) return goToStep(step + 1)
    const needTest = level['Secondary'] || level['GCSE'] || level['A-level']
    goToStep(needTest ? 1 : 2)
  }

  const backStep = () => {
    if (step === 0) return
    if (step !== 2) return goToStep(step - 1)
    const needTest = level['Secondary'] || level['GCSE'] || level['A-level']
    goToStep(needTest ? 1 : 0)
  }

  const { information, success, message } = useSelector(state => state.profile)

  const save = () => dispatch(saveProfile({information, setLoading, nextStep}))
  const submit = () => {
    dispatch(submitProfile({information, setLoading, router}))
  }

  useEffect(() => {
    if(success > 0) {
      dispatch(setSuccess({success:0, message:''}))
      return
    }
    if(success < 0){
      SweetAlert.fire({
        icon: "error",
        imageHeight: '100px',
        title: 'Oops...',
        text: message.length > 0 ? message : 'Can\'t connect with server, Please try again',
        confirmButtonColor: '#0099FF',
      });
      dispatch(setSuccess({success:0, message:''}))
    }
  }, [success, message, router, dispatch])

  const profileContents = step === 0
    ? <Step0 save={save} loading={loading} />
    : step === 1
      ? <Step1 goBack={backStep} save={save} loading={loading} />
      : step === 2
        ? <Step2 goBack={backStep} save={save} loading={loading} />
        : step === 3
          ? <Step3 goBack={backStep} save={save} loading={loading} />
          : step === 4
            ? <Step4 goBack={backStep} save={save} loading={loading} />
            : step === 5
              ? <Step5 goBack={backStep} save={save} loading={loading} />
              : step === 6
                ? <Step6 goBack={backStep} save={save} loading={loading} submit={submit}/>
                  : <p>No Step</p>

  useEffect(() => {
    dispatch(setSuccess({success:0, message:''}))
    return () => {
      dispatch(initInformation());
    }
  }, [dispatch])

  return (
    <div className='profile-container'>
      {profileContents}
    </div>
  );
};

export default ProfilePage;
