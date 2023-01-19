import { useState } from "react";
import Logo from "../assets/logo.svg";
import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewHabitForm } from "./NewHabitForm";

const Header = () => {
  return (
    <>
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img src={Logo} />

        <Dialog.Root>
          <Dialog.Trigger className="border border-violet-500/60 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 bg-violet-500/5 hover:bg-violet-500/20 hover:border-violet-500/100">
            <Plus className="text-2xl text-violet-500" />
            Novo Hábito
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/20 fixed inset-0" />
            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
                <X aria-label="Fechar" />
              </Dialog.Close>

              <Dialog.Title className="text-3xl font-bold">
                Conteudo do modal
              </Dialog.Title>

              <NewHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
    </>
  );
};

export default Header;
