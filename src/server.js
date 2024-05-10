// Import the Express.js app instance from the './app' module
import app from './app'

// Define the port number on which the server will listen
const port = 3333

// Start the server and have it listen on the specified port
app.listen(port, () => {
  // Log a success message to the console indicating the server has started
  console.log(` 🟢 Server started on port ${port}`)
})
