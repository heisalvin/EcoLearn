import React, { createContext, useState, useContext } from 'react';

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [homePoints, setHomePoints] = useState(0);
  const [quizPoints, setQuizPoints] = useState(0);

  return (
    <PointsContext.Provider value={{ homePoints, setHomePoints, quizPoints, setQuizPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);