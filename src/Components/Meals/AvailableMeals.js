import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
// const DUMMY_MEALS= [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//       },
//       {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//       },
//       {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//       },
//       {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//       },
// ];
const AvailableMeals =() =>{
  const [meals, setMeals]= useState([]);
  const [isLoading, setIsLoading]= useState(true);
  const [isError,setIsError]=useState();

  useEffect(() =>{
    const fetchMeals= async () =>{
      const response = await fetch('https://react-food-6160e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      const responseData= await response.json();

      if(!response.ok){
        throw new Error('not able to fetch data');
      }

      const loadedMeals= [];

      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price:responseData[key].price,          
      });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) =>{
      setIsLoading(false);
      setIsError(error.message);
    });
  },[])

  if(isLoading){
    return(
      <section className={classes.mealsLoading}>
        <p>Loading</p>
      </section>
    );
  }
  if (isError) {
    return (
      <section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    );
  }

    const mealsList= meals.map((meal) =>
        <ul>
            <MealsItem
               key={meal.id}
               id={meal.id}
               name={meal.name}
               description={meal.description}
               price={meal.price}
            />
        </ul>
    );
    return(
        <section className={classes.meals}>
            <Card>      
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;