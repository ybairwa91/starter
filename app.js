const express = require('express');
const fs = require('fs');
const morgan = require('morgan')


const app = express();



/// 1.MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());
// Create own middleware function
app.use((req, res, next) => {
  console.log('Hello from the middleware🔅');
  next();
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})


////readFile
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/////// 2.Route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,

    data: {
      tours,
    },
  });
}
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((ele) => ele.id === id);
  console.log(tour);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}
const createTour = (req, res) => {
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
}
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here....>',
    },
  });
}
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to define mere bhai'
  })
}


const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: 'This route is yet not defined'
  })
}

const deleteUser = (req, res) => {
  res.staus(500).json({
    status: '',
    message: "this route is yet to define brother"
  })
}
//Routing
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id ', deleteTour);

/////
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

/////
app.route('/api/v1/users').get(getAllUsers).post(createUser)
app.route('/api/v1/user/:id').get(getUser).patch(updateUser).delete(deleteUser)

//// ) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log('this is running on port 3000');
});

