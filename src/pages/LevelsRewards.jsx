import React, { useEffect, useState } from 'react';

const LevelsRewards = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Add your server's base URL in development
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/user-progress' 
          : '/api/user-progress';
        
        const response = await fetch(`${apiUrl}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // If using cookies/sessions
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error("Response wasn't JSON");
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Render loading, error, or content
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!userData) return <div className="text-white">No user data found</div>;

  // ... rest of your component ...
};

export default LevelsRewards;