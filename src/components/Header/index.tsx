import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/react.svg";

import { DocumentModal } from '../DocumentModal';

import { HeaderContainer, HeaderContent, NewDocumentButton } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewDocumentButton>New document</NewDocumentButton>
          </Dialog.Trigger>

          <DocumentModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}