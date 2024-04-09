//import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals(){

    const {
        data : loadedMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);
    //const [loadedMeals, setLoadedMeals] = useState([]);


    //get the meals data from the backend
    // async function fetchMeals(){
    //     const response = await fetch('https://localhost:3000/meals');
    //     console.log(response);
    //     if(!response.ok){
    //         //..
    //     }

    //     const meals = await response.json();
    //     console.log(meals);
    //     setLoadedMeals(meals);
    // }

    // useEffect(() => {
    //     async function fetchMeals(){
    //         const response = await fetch('http://localhost:3000/meals');
    //         console.log('Response : ',response);
    //         if(!response.ok){
    //             //..
    //         }
    
    //         const meals = await response.json();
    //         console.log(response);
    //         console.log('After json : ',meals);
    //         setLoadedMeals(meals);
    //     }

    //     fetchMeals();
    // },[]);

    if(isLoading){
        return <p className="center">Fetching the meals...</p>
    }

    if(error){
        return <Error title="Failed to load meals" message={error} />
    }
    
    return <ul id="meals">{loadedMeals.map((meal) => (
        <li className="meal-item" key={meal.id}>{<MealItem meal={meal}/>}</li>
    ))}</ul>
}