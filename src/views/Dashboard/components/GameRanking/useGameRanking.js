import { useEffect, useState, useContext } from 'react';
import api from 'api';
import Context from 'Context';

const useGameRanking = () => {
  const { user: { companyId }, selectedGame } = useContext(Context);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const gameId = selectedGame ? selectedGame.id : undefined;
    
    api.get(
      '/dashboard/ranking', 
      { 
        params: { 
          gameId, 
          companyId,
        },
      },
    )
      .then(response => setRanking(response.data))
  }, [companyId, selectedGame]);

  return ranking;
};

export default useGameRanking;
