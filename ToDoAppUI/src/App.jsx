import React from 'react';
import Hello from './components/MainComponent';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AddTaskData from './components/AddTaskDataComponent';
import CurrentDay from './components/HeaderComponent';
function App() {
  return (
    //className="bg-[url('./assets/Sun.png')]"
    <BrowserRouter>
      <CurrentDay>
        <Routes>
          <Route path="/" element={<Hello/>}></Route>
          <Route path="/addTask" element={<AddTaskData/>}></Route>
          <Route path="/editTask/:id" element={<AddTaskData/>}></Route>
        </Routes>
      </CurrentDay>
    </BrowserRouter>
  );
}

export default App;
