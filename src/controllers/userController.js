import { addUser, users } from "../data/userData.js";



export function getUserById(req, res) {
  
  const id = Number(req.params.id);
  
  const user = users.find((item) => item.id === id);
  

  
  if (!user) {
    
    return res.status(404).json({
      
      error: "Usuário não encontrado"
        
    });
    
  }
  

  
  return res.status(200).json({
    
    data: user
      
  });
  
}



export function updateUser(req, res) {
  
  const id = Number(req.params.id);
  
  const userIndex = users.findIndex((item) => item.id === id);
  

  
  if (userIndex === -1) {
    
    return res.status(404).json({
      
      error: "Usuário não encontrado"
        
    });
    
  }
  

  
  const { name, email } = req.body ?? {};
  
  const normalizedName = typeof name === "string" ? name.trim() : "";
  
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  

  
  if (!normalizedName || !normalizedEmail) {
    
    return res.status(400).json({
      
      error: "Os campos name e email são obrigatórios e não podem estar vazios"
        
    });
    
  }
  

  
  users[userIndex] = {
    
    ...users[userIndex],
    
    name: normalizedName,
    
    email: normalizedEmail
      
  };
  

  
  return res.status(200).json({
    
    data: users[userIndex]
      
  });
  
}



export function deleteUser(req, res) {
  
  const id = Number(req.params.id);
  
  const userIndex = users.findIndex((item) => item.id === id);
  

  
  if (userIndex === -1) {
    
    return res.status(404).json({
      
      error: "Usuário não encontrado"
        
    });
    
  }
  

  
  users.splice(userIndex, 1);
  
  return res.status(204).send();
  
}



export function listUsers(req, res) {
  
  return res.status(200).json({
    
    data: users,
    
    total: users.length
      
  });
  
}



export function createUser(req, res) {
  
  const { name, email } = req.body ?? {};
  
  const normalizedName = typeof name === "string" ? name.trim() : "";
  
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  

  
  if (!normalizedName) {
    
    return res.status(400).json({
      
      error: "O campo name é obrigatório e não pode estar vazio"
        
    });
    
  }
  

  
  if (!normalizedEmail) {
    
    return res.status(400).json({
      
      error: "O campo email é obrigatório e não pode estar vazio"
        
    });
    
  }
  

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  
  if (!emailPattern.test(normalizedEmail)) {
    
    return res.status(400).json({
      
      error: "O campo email deve conter um endereço válido"
        
    });
    
  }
  

  
  const user = addUser({
    
    name: normalizedName,
    
    email: normalizedEmail
      
  });
  

  
  return res.status(201).json({
    
    data: user
      
  });
  
}





























































































