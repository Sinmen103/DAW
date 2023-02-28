// Dependencia con express
const express = require("express");

// Inicializamos la aplicacion
const app = express();

// Indicamos que la aplicación puede recibir J5ON (API Rest)
app.use(express.json());

// Indicamos que el puerto de escucha sera el 8000

const PORT = process.env.PORT || 8000;

// Arrancamos la app
app.listen(PORT,()=>{
    console.log("Servidor desplegado en el puerto "+PORT)
});

// Get con respuesta hola mundo
app.get("/hola",(req,res)=>{
    // Devuelvo el html
    res.send("Hola mundo");
});
// Get con respuesta html index
app.get("/html",(req,res)=>{
    // Devuelvo el html
    res.sendFile(__dirname + "/views/index.html");
});

// Get con render
app.get("/render",(req,res)=>{
    const personas = [ "Jack", "Karen", "John", "Mary", "Peter", "Lucas"];

    // Devuelvo el ejs
    res.render(__dirname + "/views/index.ejs" ,{personas:personas});
});


// Definimos la estructura de datos
let coches=[
    {marca: "Opel", modelo:"Corsa"},
    {marca: "Kia", modelo:"Río"}
]

// Obtener todos los coches
app.get("/coches", (req,res)=>{
    res.json(coches);
});

// Crear coche
app.post("/coches",(req,res)=>{
    // Añade el coche al final
    coches.push(req.body);
    // lo devolvemos
    res.json(coches);
});

// Obetener coche por id
app.get("/coches/:id", (req,res)=>{
    // Obtenemos el id de la URL
    const id = parseInt(req.params.id);

    // comprobamos que sea un id valido
    const isIdInvalido= isNaN(id) || id>=coches.length || id<0;

    if(isIdInvalido){
        res.status(404).json({error:404,message:"Id inválida"});
    }else{
        const result = coches [id];
        res.json(result);
    }
});

// Actualizar un coche por id
app.put("/coches/:id", (req,res)=>{
    // Obtenemos el id de la URL
    const id = parseInt(req.params.id);

    const isIdInvalido= isNaN(id) || id>=coches.length || id<0;

    if(isIdInvalido){
        res.status(404).json({error:404,message:"Id inválida"});
    }else{
        coches[id]=req.body;
        res.json(coches);
    }
});

// Borrar un elemento por id
app.delete("/coches/:id",(req,res)=>{
   // Obtenemos el id de la URL
    const id = parseInt(req.params.id);
    
    const isIdInvalido= isNaN(id) || id>=coches.length || id<0;

    if(isIdInvalido){
        res.status(404).json({error:404,message:"Id inválida"});
    }else{
        coches = coches.filter(item=>coches.indexOf(item)!==id);
        res.json(coches);
    }
});