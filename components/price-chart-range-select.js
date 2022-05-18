import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';

const options = [
  { value: '1', label: '1D' },
  { value: '4', label: '4D' },
  { value: '7', label: '7D' },
  { value: '30', label: '1M' },
  { value: '90', label: '3M' },
  { value: '365', label: '1Y' },
  { value: 'max', label: 'ALL' },
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
