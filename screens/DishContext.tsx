import React, { createContext, useState, ReactNode } from 'react';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string; 
}

interface DishContextType {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  deleteDish: (id: number) => void;
  reserveDishes: (dishes: Dish[]) => void;
  setReservedDishes: (dishes: Dish[]) => void;
  reservedDishes: Dish[];
  getAveragePriceByCourse: (course: string) => number;
}

export const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reservedDishes, setReservedDishes] = useState<Dish[]>([]);

  const addDish = (dish: Dish) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };

  const deleteDish = (id: number) => {
    setDishes((prevDishes) => prevDishes.filter(dish => dish.id !== id));
  };

  const reserveDishes = (dishes: Dish[]) => {
    setReservedDishes(dishes);
  };

 
  const getAveragePriceByCourse = (course: string): number => {
    const filteredDishes = dishes.filter(dish => dish.category === course);
    if (filteredDishes.length === 0) return 0;
    const total = filteredDishes.reduce((sum, dish) => sum + dish.price, 0);
    return total / filteredDishes.length;
  };

  return (
    <DishContext.Provider value={{ dishes, addDish, deleteDish, reserveDishes, setReservedDishes, reservedDishes, getAveragePriceByCourse }}>
      {children}
    </DishContext.Provider>
  );
};
