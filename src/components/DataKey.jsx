import { checkValues } from "../utilities/helpers";
function DataKey({ dataKey }) {
  const { id, ...newData } = dataKey;
  const areDataValues = newData && checkValues(newData);
  return (
    <ol>
      {areDataValues &&
        Object.entries(newData).map((el, index) => {
          const [key, value] = el;
          return (
            <li key={key + String(index) + String(index)}>
              {key}: {value}
            </li>
          );
        })}
    </ol>
  );
}

export default DataKey;
