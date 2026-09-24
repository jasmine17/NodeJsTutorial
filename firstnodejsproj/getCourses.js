const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;


// Sample mock data
const courses = [
  { id: 1, title: 'Node.js Bootcamp', level: 'Beginner' },
  { id: 2, title: 'React Masterclass', level: 'Intermediate' }
];

// Root GET route
app.get('/', (req, res) => {
  res.send('Welcome to our Express Backend Server!');
});

// GET all courses
app.get('/api/courses/:id', (req, res) => {

    const courseId = parseInt(req.params.id, 10);
   const course = courses.find((c) => c.id === courseId);

  res.status(200).json({
    success: true,
    count: course.length,
    data: course
  });
});


// --- INSERT / CREATE (POST) ---
app.post('/api/courses', (req, res) => {
  const { title, level } = req.body;

  // Basic validation
  if (!title || !level) {
    return res.status(400).json({
      success: false,
      message: 'Both title and level are required fields'
    });
  }

  const newCourse = {
    id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
    title,
    level
  };

  courses.push(newCourse);

  // 201 Created indicates successful resource creation
  res.status(201).json({
    success: true,
    data: newCourse
  });
});


app.put('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course with ID ${req.params.id} was not found`
    });
  }

  const { title, level } = req.body;

  if (title) course.title = title;
  if (level) course.level = level;

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: course
  });
});

app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const index = courses.findIndex((c) => c.id === courseId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Course with ID ${req.params.id} was not found`
    });
  }

  const deletedCourse = courses.splice(index, 1);

  res.status(200).json({
    success: true,
    message: `Course with ID ${courseId} was deleted`,
    data: deletedCourse[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}`);
});