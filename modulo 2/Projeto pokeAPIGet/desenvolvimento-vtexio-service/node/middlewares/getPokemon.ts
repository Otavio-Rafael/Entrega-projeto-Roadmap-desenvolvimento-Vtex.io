export async function getPokemon(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { Pokeapi },
    vtex: { route: { 
    params }
   }
  } = ctx
  const pokemonid = params.pokemonId as string

  try {
  const response: any = await Pokeapi.getPokemonId(pokemonid)

if (response.height > 15) {
      ctx.status = 400
      ctx.body = { message: "Pokémon reprovado: altura maior que 15" }
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
