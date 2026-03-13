const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")
require("dotenv").config()

//Express Middleware setup
app.use(express.urlencoded({ extended: true })) //allows the backend to read form data

//allowing the backend to read JSON request bodies ()required for POST requests like api/chat
app.use(express.json())

//enables cross-origin requests
app.use(cors()) // without this backend cant call backend

const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json") //never expose to front end
const { circOut } = require("motion/react")

//Initialize firebase admin (server-side auth verification)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-rooted-default-rtdb.firebaseio.com/" //your firebase realtime database url
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
      name: decoded.name || decoded.displayName || "Cherished Customer",
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

//MAKING SURE THE USER IS AUTHENTICATED BEFORE ACCESSING THIS ROUTE
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


app.post("/api/salons/search", requireAuth, async (req, res) => {
  try {
    const { location, query } = req.body //get the location and query from the request body

    if (!location || !query) {
      return res.status(400).json({ error: "location and query are required" })
    }

    // const searchText = `${query} in ${location}`

    const apifyRes = await fetch(`https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchStringsArray: [query],
        locationQuery: location,
        maxCrawledPlacesPerSearch: 20,
        language: "en",
      }),
    })

    const data = await apifyRes.json();

    // console.log("Apify response", data);

    // If Apify returned an error object instead of array
    // if (!Array.isArray(data)) {
    //   return res.status(500).json({
    //     error: "Apify did not return an array",
    //     raw: data
    //   });
    // }

    const salons = data.map((item) => ({
      name: item.title || "No name Provided",
      rating: item.totalScore || "No rating provided",
      reviewsCount: item.reviewsCount || "No reviews count provided",
      street: item.street || "No street provided",
      city: item.city || "No city provided",
      phone: item.phone || "No phone provided",
      url: item.url || "No url provided",
      categoryName: item.categoryName || "No category provided",
      categories: item.categories || "No categories provided",
      website: item.website || "No website provided",
      address: item.address || "No address provided",
      imageUrl: item.imageUrl || "image not provided",

    }))

    return res.json({ salons })

  } catch (e) {
    console.error("Error searching for salons:", e);
    return res.status(500).json({ error: "Internal Server Error" })
  }
})


//MAKING SURE THE USER IS AUTHENTICATED BEFORE4 ACCESSING THE CHAT ROUTE
app.post("/api/chat", requireAuth, async (req, res) => {
  try {
    const { message } = req.body;

    //checking if the message exits and is a string
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    let userName = req.user.name

    //every user uid
    const uid = req.user.uid;

    //loads the survey data
    const surveyRef = admin.database().ref(`users/${uid}/survey`);

    const snap = await surveyRef.get();

    const survey = snap.exists() ? snap.val() : null;

    // If no survey, you can guide the user to fill it out
    if (!survey) {
      return res.json({
        reply: "I couldn’t find your hair survey yet. Please complete the survey so I can personalise recommendations.",
        surveyFound: false,
      });
    }

    // ✅ Placeholder “rules engine” (super basic for now)
    // Later you’ll replace this with your real deterministic rules
    // const baseRecommendations = {
    //   hairType: survey.hairType,
    //   porosity: survey.porosity,
    //   lifestyle: survey.lifestyle,
    //   note: "This is a placeholder response until Ollama is added.",
    //   safeDefault: "Try lightweight, water-based products first and avoid heavy buildup if you notice residue.",
    // };

    const prompt = `
    SYSTEM:
    You are Rooted AI, a natural hair care assistant for women with type 1–4 hair.
    You must follow the user's profile as FACT.
    
    User Profile:
    Hair Type: ${survey.hairType}
    Porosity: ${survey.porosity}
    Lifestyle: ${survey.lifestyle}
    User Goals: ${survey.goals}
    Hair Wash Time: ${survey.washTime}
    Hair Wash Frequency: ${survey.washFrequency}


    User Name: ${userName}

    User Question: ${message}

    RESPONSE_FORMAT:
    - respond to these cleary and praticaly with actionable steps. If you dont know the answer, say you dont know. Always provide value with every response. 
    
    - Also try and provide prodyucts for uisers to use ONLY IF YOU ARE SURE IT WILL BE A GOOD FIT FOR THE USER.

    - Also make sure to shorten responses and use actionable bullet points when possible

    - If you provide product recommendations make sure you explaing "why" they fit

    - When providing responses make it so that it fits welll in a chat bubble and is easy to read and in the context of a chat assistant 
    
    `;

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt,
        stream: false
      })
    });

    const data = await ollamaResponse.json();

    // // Ollama call result
    // const reply = `
    //  Place holder message while AI is still in development 
    //   `;

    // return res.json({
    //   reply,
    //   surveyFound: true,
    //   profile: survey,
    //   baseRecommendations,
    // });

    return res.json({
      reply: data.response
    })

  } catch (e) {
    console.log("Error in /api/chat:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});