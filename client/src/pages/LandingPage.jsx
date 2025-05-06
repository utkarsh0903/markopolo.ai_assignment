import React, { useEffect } from 'react';
import usePaginatedUsers from '../hooks/usePaginatedUsers';
import DisplayUserTable from '../components/DisplayUserTable';

const LandingPage = () => {
  const { users, fetchUsers, loading } = usePaginatedUsers();

  useEffect(() => {
    fetchUsers();

    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (bottom && !loading) {
        fetchUsers();
      }
    };

    const debounce = (func, delay) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
      };
    };

    const debouncedScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [fetchUsers, loading]);

  return (
    <div>
      <DisplayUserTable users={users} />
      {loading && <p className="loading-indicator">Loading more users...</p>}
    </div>
  );
};

export default LandingPage;