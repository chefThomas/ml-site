import { Table } from '@mantine/core';
import alertIcon from './alert.svg';
import passIcon from './pass.svg';

function Results({ results }) {
  console.log(results);
  const rows = results?.map((result) => {
    const icon = result.results[0].match ? alertIcon : passIcon;
    return (
      <tr key={result.label}>
        <td>{result.label}</td>
        <td>{result.results[0].probabilities['1']}</td>
        <td>{<img src={icon} alt="pass or fail" />}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Probability</th>
          <th>Match</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Results;
