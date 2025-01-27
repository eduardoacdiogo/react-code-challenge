import { useContext } from 'react';
import { Trash, Pencil } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import { Header } from "../../components/Header";
import { SearchForm } from '../../components/SearchForm';
import { DocumentModal } from '../../components/DocumentModal';
import { DocumentsContext, DocumentType } from '../../contexts/DocumentsContext';

import { ActionButton, ActionContainer, DocumentList, DocumentsContainer } from './styles';

export function DocumentsPage() {
  const { documents, removeDocument } = useContext(DocumentsContext);

  const handleDelete = (document: DocumentType) => {
    removeDocument(document);
  }

  return (
    <div>
      <Header />
      <DocumentsContainer>
        <SearchForm />
        <DocumentList>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Content</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.Title}>
                  <td>{document.Title}</td>
                  <td>{document.Author}</td>
                  <td>{document.Content}</td>
                  <td>{document.Date}</td>
                  <td>{document.Status}</td>
                  <td>
                    <ActionContainer>
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <ActionButton buttonColor={'green'}>
                            <Pencil size={24} />
                          </ActionButton>
                        </Dialog.Trigger>

                        <DocumentModal document={document} />
                      </Dialog.Root>
                      <ActionButton onClick={() => handleDelete(document)} buttonColor={'red'}>
                        <Trash size={24} />
                      </ActionButton>
                    </ActionContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocumentList>
      </DocumentsContainer>
    </div>
  );
}