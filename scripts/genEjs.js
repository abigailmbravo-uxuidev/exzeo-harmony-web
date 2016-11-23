const fs = require('fs');
const path = require('path');

const indexSrc = path.resolve(process.cwd(), 'build', 'index.html');
const indexDist = path.resolve(process.cwd(), 'build', 'index.ejs');

const file = fs.createReadStream(indexSrc);

file.on('data', (data) => {
  const html = data.toString()
    .replace('<configuration>', '<%- JSON.stringify(configuration) %>')
    .replace('AppTitle', '<%= configuration.appTitle %>');
  fs.writeFileSync(
    indexDist,
    html,
  );
});
