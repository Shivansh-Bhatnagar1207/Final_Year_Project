import React, { createContext, useContext, useState, ReactNode } from "react";

type WorkoutLog = {
  name: string;
  duration: number; // in minutes
  calories: number;
  timestamp: Date;
};

type WorkoutContextType = {
  totalCalories: number;
  totalWorkouts: number;
  totalMinutes: number;
  completedWorkouts: WorkoutLog[];
  addWorkout: (workout: WorkoutLog) => void;
  resetStats: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState<WorkoutLog[]>([]);

  const addWorkout = (workout: WorkoutLog) => {
    setTotalCalories(prev => prev + workout.calories);
    setTotalWorkouts(prev => prev + 1);
    setTotalMinutes(prev => prev + workout.duration);
    setCompletedWorkouts(prev => [...prev, workout]);
  };

  const resetStats = () => {
    setTotalCalories(0);
    setTotalWorkouts(0);
    setTotalMinutes(0);
    setCompletedWorkouts([]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        totalCalories,
        totalWorkouts,
        totalMinutes,
        completedWorkouts,
        addWorkout,
        resetStats,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used inside WorkoutProvider");
  return context;
};
