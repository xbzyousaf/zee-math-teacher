import React from 'react';
import { KeyboardBackspace, NavigateBefore, NavigateNext } from '@mui/icons-material'
import './ControlBar.css'
import { useRouter,useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux';

const ControlBar = (props) => {
  const { tutor } = props
  const teachers = useSelector(state => state.search.results)
  const index = teachers.findIndex(teacher => teacher._id === tutor._id)
  const router = useRouter()
  const searchParams = useSearchParams()
  const backToSearch = () => {
    router.push('/search' + searchParams);
  }

  return (
    <div className="control-bar">
      <div className='back' onClick={backToSearch}><KeyboardBackspace /><span> Back <span className='to-search'>to Search</span></span></div>
      <div className='pre-next'>
        {index > -1 && <>
          {index > 0 && <span className='back' onClick={() => router.push(`/tutor/${teachers[index - 1]._id}`) }><NavigateBefore /> Previous</span>}
          {index < teachers.length - 1 && <span className='back' onClick={ () => router.push(`/tutor/${teachers[index + 1]._id}`)}>Next<NavigateNext /> </span>}
        </>}
      </div>
    </div>
  );
};

export default ControlBar;
