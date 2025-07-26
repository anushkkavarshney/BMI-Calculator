import React, { use, useState } from 'react'
import './App.css'
function Heading() {
  return (
    <div>
      <header className='heading'><h1>BMI Calculator</h1></header>
      <p className='desc'>This application let you calculate your BMI easily and efficiently. So here you go!</p>
    </div>
  );
}
function BmiInfo() {
  //ARRAY FOR CONTAINING THE INFO OF THE BMIO
  const cat = [
    { range: "Below 18.5", category: "Underweight", color: "yellow" },
    { range: "18.5 - 24.9", category: "Normal weight", color: "green" },
    { range: "25 - 29.9", category: "Overweight", color: "orange" },
    { range: "30 and above", category: "Obese", color: "red" }
  ]
  return (
    <div className='bmi-info'>
      <h1 className='bmi-info-heading'>
        BMI-Info
      </h1>
      <div className='category'>
        {cat.map(function (category, index) {
          return <div className='category-item' key={index} style={{ borderLeft: `1.2vw solid ${category.color}` }}>
            <span className='item-range'>{category.range}</span>
            <span className='item-category'>{category.category}</span></div>
        })}
      </div>
    </div>
  );
}

function BmiForm({ onCalculate }) {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (height && weight && name) {
      const heightinM = parseFloat(height) * 0.3048;
      const bmi = (weight / (heightinM * heightinM)).toFixed(1);

      onCalculate({
        name, 
        height: parseFloat(height), 
        weight: parseFloat(weight), 
        bmi: parseFloat(bmi)
      })
      setHeight('');
      setWeight('');
      setName('');
    } else {
      alert("Empty Fields")
    }

  }
  return (
    <form className='bmi-form' onSubmit={handleSubmit}>
      <div className="form-content">
        <h2>Calculate your BMI</h2>
        <div className="form-name">
          <label for='name'>Name:</label>
          <input id='name' type='text' value={name} placeholder='Enter your name' onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div className="form-height">
          <label for='height'>Height:</label>
          <input id='height' type='text' value={height} placeholder='Enter your height (in feet)' onChange={(e) => {setHeight(e.target.value)}}/>
        </div>
        <div className="form-weight">
          <label for='weight'>Weight:</label>
          <input id='weight' type='text' value={weight} placeholder='Enter your weight (in Kg)' onChange={(e) => {setWeight(e.target.value)}}/>
        </div>
        <input type='submit' value='Calculate' className='calculate-btn'/>
      </div>
    </form>
  );
}
function BmiResult({result}){
  if(!result){
     return null;
  }
  const getBMICategory = (bmi)=>{
    if(bmi<18.5){
      return { category: "Underweight", color: "yellow" }
    } else if(bmi < 25){
      return { category: "Normal weight", color: "green" }
    } else if(bmi < 30){
      return { category: "Overweight", color: "orange" }
    } else {
      return { category: "Obese", color: "red" }
    }
  }

  const categoryInfo = getBMICategory(result.bmi);

  return (
    <div className='bmi-result'>
      <h3>{result.name}'s BMI result</h3>
      <div className='result-display'>
        <div className='bmi-value' style={{backgroundColor: `${categoryInfo.color}`}}>
          {result.bmi}
        </div>

        <div className='bmi-category' style={{backgroundColor: `${categoryInfo.color}`}}>
          {categoryInfo.category}
        </div>

        <div className='result-details'>
          <p>Height: {result.height} Ft</p>
          <p>Weight: {result.weight} Kg</p>
        </div>
      </div>
    </div>
  );
}
const App = () => {
  const [currentResult, setResult] = useState(null);

  const handleCalculate = (data) => {
    setResult(data);
  }
  return (
    <div>
      <Heading />
       <BmiInfo />
      <div className='app-content'>
       
        <div className='left-panel'>
          <BmiForm onCalculate={handleCalculate} />
        </div>
        <div className='right-panel'>
          <BmiResult result={currentResult}/>
        </div>
      </div>
    </div>
  )
}

export default App