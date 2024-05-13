import React from 'react'
import { CircularProgress, Button, Paper, List } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TutorBox from './TutorBox/TutorBox'
import {loadMoreAndFetchTutors} from '../../../store/search'
import  UnderCurve  from '../../../../public/assets/images/undercurve.svg'
import Image from 'next/image';

const ResultBox = ({ loading: tutorsLoading }) => {
  const dispatch = useDispatch()
  const { resultCount, results, loading } = useSelector(
    (state) => state.search
  )
  const loadMoreResults = results.length < resultCount
  const resultText =
    resultCount === 0
      ? ''
      : `maths tutor${resultCount === 1 ? ' found' : 's found'}`

  return (
    <Paper className="result-box" elevation={0}
           sx={{
             maxHeight: {
               md: '75vh',
             },
             overflow: {
               md: 'auto',
             }
           }}>
      <List>
        {(resultCount === 0 || tutorsLoading) && (
          <>
            {
              tutorsLoading ? <div style={{ width: '100%', textAlign: 'center', marginTop: '10rem' }}><CircularProgress
                size="3rem"/></div> : !tutorsLoading && resultCount === 0 ? <div className="no-tutor">
                <div className="sub-title">No tutors Found</div>
                <Image src={UnderCurve} alt="" />
              </div> : ''
            }
          </>
        )}
        <div className="name-box">
          {!tutorsLoading && (<span style={{ fontSize: '15pt', marginBottom: '10px' }}>
            {resultCount > 0 && <><span className="blue">{resultCount}</span> {resultText}</>}
        </span>)}
        </div>
        <div className="search-box">
          {results.map((tutor, index) => (
            <TutorBox key={index} tutor={tutor}/>
          ))}
        </div>
        {loadMoreResults && (
          <div className="pagination-box">
            <Button
              type="button"
              variant="contained"
              size="small"
              style={{
                borderRadius: '50px',
                fontSize: '14pt',
                padding: '0.5rem 2rem',
              }}
              onClick={() => dispatch(loadMoreAndFetchTutors())}
              className="clear"
            >
              {loading ? (
                <CircularProgress style={{ color: 'white' }} size="2rem"/>
              ) : (
                'Load more'
              )}
            </Button>
          </div>
        )}
      </List>
    </Paper>
  )
}

export default ResultBox
