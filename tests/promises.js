const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) ) + min;

const promesaDeIrAlObelisco = new Promise((resolve, reject) => {
    let ganador = getRandomInteger(1,10) < 6 ? "River": "Boca";
    if(ganador === "River") {
      resolve(ganador);
    }
    else
      reject(ganador);
  
  console.log("Partido en juego");
  
});


promesaDeIrAlObelisco
  .then((ganador) => {
    console.log("Vamos a ir al obelisco por que el ganador fue " + ganador)
    const promesaDeComprarCamiseta = new Promise((resolve, reject) => {
       const conseguirCamiseta = getRandomInteger(1, 10) < 3;
       if(conseguirCamiseta)
        resolve("Compré la camiseta");
       else 
        resolve("No había más camisetas")
    });
    return promesaDeComprarCamiseta;
  })
  .then(camiseta => console.log(camiseta))
  
  .catch((ganador) => console.log("NO VAMOS a ir al obelisco porque el ganador fue " + ganador));
