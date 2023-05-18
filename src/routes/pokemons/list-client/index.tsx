import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { getSmallPokemons } from "~/components/helpers/get-small-pokemons";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import type { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  isloading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isloading: false,
    pokemons: [],
  });

  //Se ejecuta solamente en el cliente
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  //Se ejecuta tanto en el cliente como en el servidor
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    pokemonState.isloading = true;
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 25);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isloading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isloading) {
        pokemonState.isloading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Pagina actual:{pokemonState.currentPage}</span>
        <span class="">Esta cargando página:</span>
      </div>

      <div class="mt-10">
        <button
          class="btn btn-primary"
          onClick$={() => pokemonState.currentPage++}
        >
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
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
  title: "Client - List",
};
