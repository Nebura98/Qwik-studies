import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1); // Use to primitive data

  const showBackImage = useSignal<boolean>(false);

  const isVisiableImage = useSignal<boolean>(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <PokemonImage
        id={pokemonId.value}
        size={300}
        backImage={showBackImage.value}
        isVisible={isVisiableImage.value}
      />
      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => changePokemonId(-1)}
        >
          Anterior
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => changePokemonId(1)}
        >
          Siguientes
        </button>

        <button
          class="btn btn-primary mr-2"
          onClick$={() => (showBackImage.value = !showBackImage.value)}
        >
          Voltear
        </button>
        <button
          class="btn btn-primary"
          onClick$={() => (isVisiableImage.value = !isVisiableImage.value)}
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Qwik first app",
    },
  ],
};
