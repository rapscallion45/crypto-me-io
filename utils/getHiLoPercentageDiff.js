const getHiLoPercentageDiff = (hiVal, loVal, currVal) => {
  const compVal = hiVal - loVal;
  const inputVal = currVal - loVal;
  return (inputVal / compVal) * 100;
};
export default getHiLoPercentageDiff;
