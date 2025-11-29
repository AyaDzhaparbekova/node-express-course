const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
  try {
    await writeFile('temp.txt', 'First line\n');
    await writeFile('temp.txt', 'Second line\n', { flag: 'a' });
    await writeFile('temp.txt', 'Third line\n', { flag: 'a' });

    console.log('writer: finished writing');
  } catch (err) {
    console.log('writer error:', err);
  }
};


const reader = async () => {
  try {
    const data = await readFile('temp.txt', 'utf-8');
    console.log('reader output:\n' + data);
  } catch (err) {
    console.log('reader error:', err);
  }
};
const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();

writer();
