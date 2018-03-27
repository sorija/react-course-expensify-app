export default (expenses) => {
  return expenses.reduce((acc, { amount }) => acc + amount, 0);
};
