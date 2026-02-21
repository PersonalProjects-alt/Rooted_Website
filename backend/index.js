const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")

//Express Middleware setup
app.use(express.urlencoded({extended: true})) //allows the backend to read form data

//allowing the backend to read JSON request bodies ()required for POST requests like api/chat
app.use(express.json())

//enables cross-origin requests
app.use(cors()) // without this backend cant call backend

const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json") //never expose to front end

//Initialize firebase admin (server-side auth verification)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


//AUTH MIDDLEWARE

async function requireAuth(req, res, next) {
  try {
    // Get the Authorization header from the request
    // Example header:
    // Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
    const authHeader = req.headers.authorization || "";

    // Extract the token using regex
    // It ensures the format is: "Bearer <token>"
    const match = authHeader.match(/^Bearer (.+)$/);

    // If no valid Bearer token is found, block the request
    if (!match) {
      return res.status(401).json({ 
        error: "Missing Authorization Bearer token" 
      });
    }

    // Extract the actual token string
    const idToken = match[1];

    // 🔍 Verify the token with Firebase
    // This checks:
    // - Is it real?
    // - Is it expired?
    // - Was it issued by your Firebase project?
    const decoded = await admin.auth().verifyIdToken(idToken);

    // If valid, attach user information to the request object
    // This makes it available in the route handler
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
    };

    // Allow the request to continue to the protected route
    return next();

  } catch (err) {
    // If token is invalid or expired, block access
    return res.status(401).json({ 
      error: "Invalid or expired token" 
    });
  }
}



// Public Route (No Authentication Required)
app.get("/", async (req, res) => {
  res.send("This is working");
});


// Protected Route (Authentication Required)


// Notice: requireAuth is added BEFORE the async handler
// That means the user must pass authentication first
app.get("/api/private", requireAuth, async (req, res) => {

  // If we reach here:
  // - The token was valid
  // - req.user now contains verified Firebase user info

  res.json({
    message: "You are authenticated ✅",
    user: req.user,  // This came from decoded Firebase token
  });
});



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});