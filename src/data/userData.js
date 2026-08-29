export const users = [
  
  {
    
    id: 1,
    
    name: "Ana Souza",
    
    email: "ana.souza@example.com"
      
  },
  
  {
    
    id: 2,
    
    name: "Bruno Lima",
    
    email: "bruno.lima@example.com"
      
  }
  
];



let nextUserId = users.reduce(
  
  (highestId, user) => Math.max(highestId, user.id),
  
  0
  
) + 1;



export function getNextUserId() {
  
  const id = nextUserId;
  
  nextUserId += 1;
  
  return id;
  
}



export function addUser({ name, email }) {
  
  const user = {
    
    id: getNextUserId(),
    
    name,
    
    email
      
  };
  

  
  users.push(user);
  
  return user;
  
}




























