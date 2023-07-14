import React,{useState,useEffect} from 'react'
import './App.css'
const App=()=>{
    // declaring the API
    const URL_ENDPOINT='https://64aee682c85640541d4de396.mockapi.io/food'
    //setting the variables to hold the state
    const[foods,setFoods]=useState([{}]);
    const[newFoodName,setNewFoodName]=useState('');
    const[newFoodQuantity,setNewFoodQuantity]=useState('');
    const[newFoodPrice,setNewFoodPrice]=useState('');
    const[newFoodSpecifications,setNewFoodSpecifications]=useState('')
    const[updatedFoodName,setUpdatedFoodName]=useState('')
    const[updatedFoodQuantity,setUpdatedFoodQuantity]=useState('')
    const[updatedFoodPrice,setUpdatedFoodPrice]=useState('')
    const[updatedFoodSpecifications,setUpdatedFoodSpecifications]=useState('')
    // A function to display the food Items
    //It requests the data from the API and then make it readable and then the data is passed to the setFood function
    const getFoodItems=()=>{
        fetch(URL_ENDPOINT)
        .then(data=>data.json())
        .then(data=>setFoods(data))
    }

    //This function will be called only when the page loads
    useEffect(()=>{
        getFoodItems()
    },[])
    //A function to delete a food item uing the id of that particular item
    const deleteFoodItem=(id)=>{
        fetch(`${URL_ENDPOINT}/${id}`,{
            method:'DELETE' 
        }).then(()=>getFoodItems())
    }
    //A function to add a new food item
    const addFoodItem=(e)=>{
        e.preventDefault();
     fetch(URL_ENDPOINT,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            foodname:newFoodName,
            Quantity:newFoodQuantity,
            price:newFoodPrice,
            specifications:newFoodSpecifications
        })
     }).then(()=>getFoodItems())
     //This is to clear the values of the input field 
     const foodNameInput = document.getElementById("foodNameInput");
     foodNameInput.value="";
     const foodQuantityInput = document.getElementById("foodQuantityInput");
     foodQuantityInput.value="";
     const foodPriceInput = document.getElementById("foodPriceInput");
     foodPriceInput.value="";
     const foodSpecificationsInput = document.getElementById("foodSpecificationsInput");
     foodSpecificationsInput.value="";
    }
    //A function to update the food item using its id.
    const updateFoodItems=(e,foodObject)=>{
        e.preventDefault()
        let updatedFoodObject={
            ...foodObject,
            foodname:updatedFoodName,
            Quantity:updatedFoodQuantity,
            price:updatedFoodPrice,
            specifications:updatedFoodSpecifications 
        }
        fetch(`${URL_ENDPOINT}/${foodObject.id}`,{
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedFoodObject)
        }).then(()=>getFoodItems())
        
    }
    
    return(
        <div className='App'>
            <form className='form'>
                
                <h1>Food Order Form</h1>
                <label>Food Name</label>
                <input id="foodNameInput" placeholder='Foodname here'onChange={(e)=>setNewFoodName(e.target.value)}></input>
                <label>Quantity</label>
                <input id="foodQuantityInput"placeholder='Quantity'onChange={(e)=>setNewFoodQuantity(e.target.value)}></input>
                <label>Price</label>
                <input id="foodPriceInput" placeholder='Price'onChange={(e)=>setNewFoodPrice(e.target.value)}></input>
                <label>Specifications</label>
                <input id="foodSpecificationsInput" placeholder='Specifications'onChange={(e)=>setNewFoodSpecifications(e.target.value)}></input>
                <button onClick={(e)=>addFoodItem(e)}>SUBMIT</button>
            </form>
            {foods.map((food,index)=>(
                <div className='foodContainer'key={index}>
                <div className='card'>  
                <div className='card-header'>
                    <h2>Food Order Summary</h2>
                    </div>  
                    <p className='food-name'><strong>Foodname:</strong>{food.foodname}</p>
                    <p className='food-price'><strong>Price:</strong> ${food.price}</p>
                    <p className='food-quantity'><strong>Quantity:</strong> {food.Quantity}</p>
                    <p className='food-specifications'><strong>Specifications:</strong> {food.specifications}</p>
                    <button id ='del'onClick={() => deleteFoodItem(food.id)}>DELETE</button>   
                </div>

                <form className='form1'>
                    <div>

                    <h3>Update Food Info</h3>
                    <div>
                    <label htmlFor="UpdatedFoodName">UpdatedFoodName</label>
                    <input onChange={(e)=>setUpdatedFoodName(e.target.value)}></input><br></br><br></br>
                    <label htmlFor="UpdatedFoodQuantity">UpdatedFoodQuantity</label>
                    <input onChange={(e)=>setUpdatedFoodQuantity(e.target.value)}></input><br></br><br></br>
                    <label htmlFor="UpdatedFoodPrice">UpdatedFoodPrice</label>
                    <input onChange={(e)=>setUpdatedFoodPrice(e.target.value)}></input><br></br><br></br>
                    <label htmlFor="UpdatedFoodSpecifications">UpdatedFoodSpecifications</label>
                    <input onChange={(e)=>setUpdatedFoodSpecifications(e.target.value)}></input><br></br><br></br>
                    <button id='updt' onClick={(e)=>updateFoodItems(e,food)}>UPDATE</button>
                    </div>
                    </div>
                </form> 
                </div>
        
            ))}
        </div>
        
    )
}
export default App;
