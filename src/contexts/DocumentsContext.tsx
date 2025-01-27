import { createContext, useState } from 'react';
import { Documents } from '../data/documents.json';

export interface DocumentType {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface DocumentsContextType {
  documents: DocumentType[];
  addDocument: (document: DocumentType) => void | string;
  getDocument: (documentTitle: string) => DocumentType | undefined;
  editDocument: (previewDocument: DocumentType, unewDocument: DocumentType) => void | string;
  filterDocuments: (documentTitle: string) => void
  removeDocument: (document: DocumentType) => void;
}

export const DocumentsContext = createContext<DocumentsContextType>({} as DocumentsContextType);

export function DocumentsContextProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<DocumentType[]>(Documents);

  function addDocument(document: DocumentType) {
    if (documents.some((doc) => doc.Title === document.Title)) {
      return 'This document already exists';
    }

    setDocuments([...documents, document]);
  }

  function getDocument(documentTitle: string) {
    return documents.find((doc) => doc.Title === documentTitle);
  }

  function editDocument(previewDocument: DocumentType, newDocument: DocumentType) {
    const documentIndex = documents.findIndex((doc) => doc.Title === previewDocument.Title);

    if (documentIndex === -1) {
      return 'This document does not exist';
    }

    const newDocuments = documents.filter((doc) => doc.Title !== previewDocument.Title);

    if (newDocuments.some((doc) => doc.Title === newDocument.Title)) {
      return 'This document already exists';
    }

    documents[documentIndex] = newDocument;

    setDocuments([...documents]);
  }

  function filterDocuments(documentTitle?: string | null) {
    if (documentTitle) {
      setDocuments(documents.filter((doc) => doc.Title.includes(documentTitle)))
      return;
    }

    setDocuments(Documents)
  }

  function removeDocument(document: DocumentType) {
    setDocuments(documents.filter((doc) => doc.Title !== document.Title));
  }

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        addDocument,
        getDocument,
        editDocument,
        filterDocuments,
        removeDocument
      }}>
      {children}
    </DocumentsContext.Provider>
  );
}