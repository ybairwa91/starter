/*
//use;
const express = require('express');
const app = express();

const port = 8000;
app.get('/', (req, res) => {;
  res.status(200).json({ message: 'hi', id: 1000 });
});
app.listen(port, () => {;
  console.log('This is running on port 3000');
});

const express = require('express');
const app = express();
const port = 8000;

//app.get('/', (req, res) => {;
//  res.status(200).send('hy this is yogesh');
//});
app.get('/hello', (req, res) => {;
  res.status(200).send('hello world');
});
app.post('/hello', (req, res) => {;
  console.log(req.url);
  console.log(req);
  res.status(201).send('hello from post method');
});

app.listen(port);

*/

const express = require('express');
const app = express();
const fs = require('fs');
const port = 8000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((ele) => ele.id === id);
  console.log(tour);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here...></updated>',
    },
  });
});

app.listen(port, () => {
  console.log('this is running on port 3000');
});
