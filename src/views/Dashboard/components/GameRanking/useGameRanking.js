import { useEffect, useState } from 'react';
import api from 'api';

const useGameRanking = (gameId) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    api.get(`/dashboard/games/${gameId}/ranking`)
      .then(response => setRanking(response.data))
  }, [gameId]);

  return ranking;
};

export default useGameRanking;
