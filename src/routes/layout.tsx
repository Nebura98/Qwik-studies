import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import Navbar from "~/components/shared/navbar/navbar";

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
