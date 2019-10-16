const saveJson = (key, data) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
    return;
  }

  localStorage.removeItem(key);
};

const getSavedJson = (key) => {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : null;
};

export const saveUser = (user) => saveJson('user', user);
export const getSavedUser = () => getSavedJson('user');
export const saveSelectedGame = (game) => saveJson('game', game);
export const getSavedSelectedGame = () => getSavedJson('game');
