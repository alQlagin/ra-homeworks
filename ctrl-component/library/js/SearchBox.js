const SearchBox = ({value, filterBooks}) => {
  const onChange = event => filterBooks(event.currentTarget.value);
  return (
    <input type="text" placeholder="Поиск по названию или автору" value={value} onChange={onChange}/>
  );
};