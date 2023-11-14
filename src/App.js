import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './App.css';

const url = 'https://course-api.com/react-tabs-project';
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [jobIndex, setJobIndex] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // loading screen
  if(loading) {
    return (
      <section className='loading'>
        <h2>loading</h2>
      </section>
    )
  }

  const { company, dates, duties, title } = jobs[jobIndex];

  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* btn container */}
        <div className='job-btn-container'>
          {jobs.map((item, index) => {
              return (
                <button className={`job-btn ${index === jobIndex && 'active-btn'}`} 
                        key={item.id} 
                        onClick={() => setJobIndex(index)}
                >
                 {item.company}
                </button>
              );            
            })} 
        </div>
        {/* jobs info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-description'>
                <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <button 
        type="button" 
        className="info-btn"
        onClick={() => window.location.href='https://en.wikipedia.org/wiki/Rickrolling'}
        >
        more info
      </button>
    </section>
  );
};

export default App;
