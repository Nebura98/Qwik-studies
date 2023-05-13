import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = false }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      backImage ? "back/" : ""
    }${id}.png`;

    return (
      <div
        class="flex item justify-items-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando</span>}
        <img
          src={imageUrl}
          alt="Pokemon sprite"
          width={size}
          height={size}
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            { hidden: !imageLoaded.value, "brightness-0": isVisible },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);