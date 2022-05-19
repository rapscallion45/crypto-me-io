import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';

const options = [
  { value: 'prices', label: 'Price' },
  { value: 'market_caps', label: 'Market Cap' },
  { value: 'total_volumes', label: 'Total Volume' },
];

const PriceChartTypeSelect = function PriceChartTypeSelect({ initialValue, onUpdate }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      if (onUpdate) onUpdate(newValue);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <ToggleButtonGroup color="primary" value={value} exclusive onChange={handleChange}>
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value} size="small">
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
export default PriceChartTypeSelect;
