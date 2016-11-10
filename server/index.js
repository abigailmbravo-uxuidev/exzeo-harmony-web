const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.set('view engine', 'ejs');


const data = {
  test: {
    'appTitle': 'Waffles',
    configuration: {
      appTitle: 'TypTap-Test',
    }
  },
  dockerapp: {
    'appTitle': 'Hosted From Docker',
    configuration: {
      appTitle: 'Docker',
    }
  },
  tryitout: {
    'appTitle': 'TypTap-QA',
    configuration: {
      appTitle: 'TypTap-QA',
    }
  },
  default: {
    'appTitle': 'TypTap',
    configuration: {
      appTitle: 'TypTap',
    }
  },
};

app.get('/', (req, res) => {
  console.log(req.headers)
  const fileName = path.resolve(process.cwd(), 'build/index');
  if (process.env.NODE_ENV === 'production') {
    // DO STUFFS
    const names = req.hostname.split('.');
    console.log('Names: ', names);
    const company = names[(names.length - 2)];
    console.log('Company: ', company);
    const stuff = data[company] ? data[company] : data.default;
    res.render(fileName, stuff);
  } else {
    // DO OTHER STUFFS
    const host = req.headers.host;
    const subdomain = host.substring(0, host.indexOf('.'));
    const stuff = data[subdomain] ? data[subdomain] : data.default;
    res.render(fileName, stuff);
  }
});

app.use(express.static(path.resolve(process.cwd(), 'build')));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
