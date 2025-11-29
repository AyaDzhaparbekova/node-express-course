const { createReadStream } = require('fs');

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on('data', chunk => {
  chunkCount++;
  console.log(`--- Chunk #${chunkCount} ---`);
  console.log(chunk);
});

stream.on('end', () => {
  console.log(`\nFinished reading file.`);
  console.log(`Total chunks received: ${chunkCount}`);
});

stream.on('error', err => {
  console.log('Stream error:', err);
});
