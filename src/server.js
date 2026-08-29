import express from "express";

import dotenv from "dotenv";

import connectRoutes from "./routes/connectRoutes.js";

import userRoutes from "./routes/userRoutes.js";



dotenv.config();



const app = express();

const PORT = process.env.PORT || 3000;



app.use(express.json());



app.get("/health", (req, res) => {
  
  res.status(200).json({
    
    status: "ok",
    
    service: "api-connect"
      
  });
  
});



app.use("/api/connections", connectRoutes);

app.use("/api/users", userRoutes);



app.listen(PORT, () => {
  
  console.log(`API Connect executando na porta ${PORT}`);
  
});






