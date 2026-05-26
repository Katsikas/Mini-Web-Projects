import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p>Loading Meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
