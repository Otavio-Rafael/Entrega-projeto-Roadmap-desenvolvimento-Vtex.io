/*
import { json } from "co-body"
import { reject } from "ramda"

export async function getPokemon(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Pokeapi },
    req,
  } = ctx
  const body = await json(req)
  
  const { pokemon } = body
  console.log( "====> pokemon", pokemon)

  try {

  const timeout = () => {
  const testetimeout = new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error("TIMEOUT")), 5000)
  })

  const response = Pokeapi.getPokemonId(pokemon)

  return Promise.race([response, testetimeout])
}

  const response: any = await Pokeapi.getPokemonId(pokemon)
      console.log( "====> pokemon response", response)



if (response.height >= 15) {
      ctx.status = 400
      ctx.body = { message: "Pokémon reprovado: altura maior ou igual a 15" }
    } else {
      ctx.status = 200
      ctx.body = response
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = { message: "Erro ao buscar Pokémon", details: err.message }
  }

  await next()
}
*/

import { json } from "co-body"

export async function getPokemon(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Pokeapi },
    req,
  } = ctx
  const body = await json(req)

  const { pokemon } = body
  console.log("====> pokemon", pokemon)

  const timeout = () => {
    const testetimeout = new Promise<never>((_resolve, reject) => {
      setTimeout(() => reject(new Error("TIMEOUT")), 250)
    })

    const response = Pokeapi.getPokemonId(pokemon)

    return Promise.race([response, testetimeout])
  }

  try {
    const response: any = await timeout()
    console.log("====> pokemon response", response)

    if (response.height >= 15) {
      ctx.status = 400
      ctx.body = { message: "Pokémon reprovado: altura maior ou igual a 15" }
    } else {
      ctx.status = 200
      ctx.body = response
    }
  } catch (err) {
    if (err.message === "TIMEOUT") {
      ctx.status = 408
      ctx.body = { message: "Tempo limite da requisição excedido" }
    } else {
      ctx.status = 500
      ctx.body = { message: "Erro ao buscar Pokémon", details: err.message }
    }
  }

  await next()
}
