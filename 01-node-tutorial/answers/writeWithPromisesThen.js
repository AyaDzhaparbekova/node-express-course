const { writeFile, readFile } = require('fs').promises;

writeFile('temp.txt', 'First line\n')
  .then(() => {
    return writeFile('temp.txt', 'Second line\n', { flag: 'a' });
  })
  .then(() => {
    return writeFile('temp.txt', 'Third line\n', { flag: 'a' });
  })
  .then(() => {
    return readFile('temp.txt', 'utf-8');
  })
  .then(data => {
    console.log('reader output:\n' + data);
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });
