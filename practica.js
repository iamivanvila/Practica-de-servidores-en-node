/*
    Para parsear de string a number se puede hacer de la siguiente forma:
    let num1= Number(req.params.num1)
*/

/* 1-  Crear una ruta que reciba nombre y apellido por medio de params
     (ruta parametrizada) y devuelva por un res.send un query string 
     armando un saludo (ej: res.send(`Hola ${nombre}`) ). */

const express = require('express')
const app = express()
const port = 3001

app.get('/saludo', (req, res) => {
  // http://localhost:3001/saludo?nombre=Carlos&apellido=Suarez

  res.send(`Hola ${req.query.nombre} ${req.query.apellido}`)
});

/** 2- Crear una ruta “dividir” la cual reciba dos parámetros (ruta 
    parametrizada) divisor y dividendo, la misma tiene que devolver
    un res.json({error: "no se puede dividir por cero"}) si el usuario
    ingresa un 0, si no es el caso devolver res.json({resultado}). */

app.get('/dividir/:dividendo/:divisor', (req, res) => {
  // http://localhost:3001/dividir/15/5

  if (isNaN(req.params.divisor) || isNaN(req.params.dividendo) || Number(req.params.divisor) === 0) {
    res.json({ error: "no se puede dividir por cero" })
  } else {
    let resultado = req.params.dividendo / req.params.divisor;
    res.json({ resultado })
  }
});

/** 3- Crear una ruta que sume dos valores (ruta parametrizada), pero
     poner una condición de que no se puedan enviar números menores
      que cero, y el resultado se debe devolver por medio de un 
      res.json({resultado}). */

app.get('/sumar/:valor1/:valor2', (req, res) => {
  // http://localhost:3001/sumar/-10/23
  // http://localhost:3001/sumar/500/23

  const valor1 = Number(req.params.valor1);
  const valor2 = Number(req.params.valor2);

  if (isNaN(req.params.valor1) || isNaN(req.params.valor2) || valor1 < 0 || valor2 < 0) {
    res.json({ error: "no pueden ser valores menores que cero" })
  } else {
    let resultado = valor1 + valor2;
    res.json({ resultado })
  }
})

/** 4- Crear una ruta que reciba un numero (ruta con query) si el número
     es impar debe devolver un res.send("no autorizado") , y si el 
     número es par debe devolver res.send("autorizado"). */

app.get('/contrasena', (req, res) => {
  // http://localhost:3001/contrasena?num=3

  const num = Number(req.query.num);

  if (num%2===0) {
    res.send("Autorizado")
  } else {
    res.send("No Autorizado")
  }
});

/** 5- Crear una ruta “lista de compras” (ruta con query) que devuelva un 
    objeto con 5 productos, se debe usar res.json({objeto}). */

app.get('/listadecompras/:id/:producto/:precio/:tamano/:smart', (req, res) => {
  // http://localhost:3001/listadecompras/1/TV/50000/45pulgadas/true
  
  res.json({
    id: req.params.id,
    producto: req.params.producto,
    precio: req.params.precio,
    tamano: req.params.tamano,
    smart: req.params.smart,
  })
})    

app.listen(port, () => {
  console.log(`Example app http://localhost:${port}`)
})

