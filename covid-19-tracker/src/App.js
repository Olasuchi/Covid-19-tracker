import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app_header">
      <h1> COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">option1</MenuItem>
            <MenuItem value="worldwide">option2</MenuItem>
            <MenuItem value="worldwide">option3</MenuItem>

          </Select>

        </FormControl>

      </div>
      

      {/*Header */}
      {/*title + select input dropdown field */}

      {/*Info box1 */}
      {/*Info box2 */}
      {/*Info box3 */}

      {/*table */}
      {/*Graph */}

      {/*Map */}
      
    </div>
  );
}

export default App;
