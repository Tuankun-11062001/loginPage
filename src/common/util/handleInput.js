export const handleChangeInput = (e, setState, state, setError) => {
  const { name, value } = e.target;
  setState({
    ...state,
    [name]: value,
  });
  setError("");
};
