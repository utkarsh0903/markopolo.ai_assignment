import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../services/userService";

export default function usePaginatedUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (loading || !hasMoreUsers) return;
    setLoading(true);
    try {
      const res = await getUsers(page, 50);
      if (res.length > 0) {
        setUsers(prev => [...prev, ...res]);
        setPage(prev => prev + 1);
      } else {
        setHasMoreUsers(false);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [page, loading, hasMoreUsers]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, fetchUsers, loading };
}