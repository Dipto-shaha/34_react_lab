
import { useState } from 'react';
import './App.css'
function Calculator() {
  const [textboxes, setTextboxes] = useState([]);
  const [sum, setSum] = useState(0);
  const [warning, setWarning] = useState('');


  const addTextBox = () => {
    setTextboxes([...textboxes, '']);
  };

  const deleteTextBox = (index) => {
    const newTextBoxes = [...textboxes];
    newTextBoxes.splice(index, 1);
    setTextboxes(newTextBoxes);
    updateSum(newTextBoxes);
  };

  
  const handleTextBoxChange = (index, event) => {
    const newValue = event.target.value;
    if (isNaN(newValue)) {
      setWarning('Please enter a valid number');
    }else setWarning('');
      const newTextBoxes = [...textboxes];
      newTextBoxes[index] = newValue;
      setTextboxes(newTextBoxes);
      updateSum(newTextBoxes);
  };
  const updateSum = (newTextBoxes) => {
    const total = newTextBoxes.reduce((acc, curr) => {
      const value = parseFloat(curr);
      return isNaN(value) ? acc : acc + value;
    }, 0);
    setSum(total);
  };

  return (
    <div>
      <button onClick={addTextBox} className='p-2 mx-2  bg-blue-500 text-white mb-6 rounded-2xl'>Add Text Box</button>
      {textboxes.map((value, index) => (
        <div key={index} className=''>
          <input className='mx-2 border-2 p-2 rounded-xl border-blue-400'
            type="text"
            value={value}
            placeholder='Enter your nomber'
            onChange={(e) => handleTextBoxChange(index, e)}
          />
          <button onClick={() => deleteTextBox(index)} className='p-2 mx-2 bg-red-500 text-white mb-2 rounded-2xl'>Delete</button>
        </div>
      ))}
      <p className='text-2xl font-bold  my-6'>Total: {sum}</p>
      {warning && <div className=" text-red-500 text-xl">{warning}</div>}
    </div>
  );
}

export default Calculator
