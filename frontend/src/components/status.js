import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Status() {
  const [applicationDetails, setApplicationDetails] = useState([]);
   
  useEffect(() => {
    // Fetch application details from your API using axios
    axios.get(`http://localhost:3500/count/vara@gmail.com`)
      .then(response => {
        setApplicationDetails(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching application details:', error);
      });
  }, []);

  return (
    <div>
      {applicationDetails.map(statusDetail => (
        <div key={statusDetail.status} className="status-box">
          <h3>{statusDetail.status}</h3>
          <p>{statusDetail.count} applications</p>
        </div>
      ))}
    </div>
  );
}

export default Status;
