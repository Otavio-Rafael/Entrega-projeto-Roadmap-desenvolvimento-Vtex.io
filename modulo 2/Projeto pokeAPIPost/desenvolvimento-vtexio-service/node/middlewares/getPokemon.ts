import { json } from "co-body"

export async function getPokemon(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Pokeapi },
    req,
  } = ctx
  const body = await json(req)
  console.log(body)
  const { pokemon } = body
  
  try {
  const response: any = await Pokeapi.getPokemonId(pokemon)

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
