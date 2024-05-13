import React, { useEffect, useMemo, useState } from 'react'
import './Search.css'
import FilterBox from './Components/FilterBox'
import ResultBox from './Components/ResultBox'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTutors } from '../../store/search'

const SearchPage = (props) => {
    const { filters } = useSelector((state) => state.search);
    const [loading, setLoading] = useState(true)
    const mathLevel = filters.level;

  const dispatch = useDispatch()
  const filterParams = useMemo(() => {
    return {
      price: '15,100',
      level: mathLevel ?? undefined
    }
  }, [mathLevel]);

  useEffect(() => {
    dispatch(fetchTutors({filterParams, setLoading}))
  }, [filterParams,dispatch])

  return (
    <div className='search-container'>
      <FilterBox setLoading={setLoading} />
      <ResultBox loading={loading} />
    </div>
  );
};

export default SearchPage;
