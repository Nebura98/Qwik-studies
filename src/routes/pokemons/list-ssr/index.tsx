import { component$, useComputed$ } from "@builder.io/qwik";

import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";

import { getSmallPokemons } from "~/components/helpers/get-small-pokemons";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import type { SmallPokemon } from "~/interfaces";

//Esto se ejecuta desde el servidor
export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || 0);

    if (isNaN(offset)) redirect(301, pathname);
    if (offset < 0) redirect(301, pathname);

    return getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const currectOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get("offset");
    const offsetString = new URLSearchParams(location.url.search);

    return Number(offsetString.get("offset") || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Offset: {currectOffset.value}</span>
        <span class="">
          Esta cargando página: {location.isNavigating ? "Si" : "No"}
        </span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currectOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currectOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-5 mt-5">
        {pokemons.value.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <span class="capitalize">{name}</span>
            <PokemonImage id={+id} />
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "SSR - List",
};
