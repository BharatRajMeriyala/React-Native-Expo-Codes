import axios from 'axios';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';



const GITHUB_BASE_URL = 'https://jobs.github.com/positions.json?';
		 
export const fetchJobs = (region, callback) => {
		 

	const {longitudeDelta, latitudeDelta, longitude, latitude} = region;

	return async (dispatch) => {
		try {
		  const url = `${GITHUB_BASE_URL}lat=${latitude}&long=${longitude}`;
		 
		  let {data} = await axios.get(url);
				 
			dispatch({
		    type: FETCH_JOBS,
		    payload: data
		  });
			
			callback();
		 
	  } catch (err) {
		    console.log("Something went wrong... ", err);
		  }
		}
};


// A single line return is exactly same as dispatch({payload: job, type: LIKE_JOB})
export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

// A single line return is exactly same as dispatch({type: CLEAR_LIKED_JOBS})
export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
