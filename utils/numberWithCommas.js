const numberwithcommas = (x) => {
  if (x === undefined) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export default numberwithcommas;
