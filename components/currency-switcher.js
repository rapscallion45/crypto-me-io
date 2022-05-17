import { useDispatch, useSelector } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import currencyActions from '../redux/actions/actions';

const CurrencySwitcher = function CurrencySwitcher() {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.localCurrency);

  const handleCurrencyChange = (event) => {
    if (event.target.value !== currency)
      dispatch(currencyActions.updateLocalCurrency(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="usd">USD {getSymbolFromCurrency('usd')}</MenuItem>
        <MenuItem value="gbp">GBP {getSymbolFromCurrency('gbp')}</MenuItem>
        <MenuItem value="eur">EUR {getSymbolFromCurrency('eur')}</MenuItem>
        <MenuItem value="jpy">JPY {getSymbolFromCurrency('jpy')}</MenuItem>
        <MenuItem value="cny">CNY {getSymbolFromCurrency('cny')}</MenuItem>
        <MenuItem value="inr">INR {getSymbolFromCurrency('inr')}</MenuItem>
        <MenuItem value="rub">RUB {getSymbolFromCurrency('rub')}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySwitcher;
