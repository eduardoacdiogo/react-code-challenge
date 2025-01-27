import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { SearchForm } from '../components/SearchForm';
import { DocumentsContext, DocumentType } from '../contexts/DocumentsContext';

describe('SearchForm', () => {
  it('calls filterDocuments with the correct query on form submission', () => {
    const mockDocuments: DocumentType[] = [
      { Title: 'Document 1', Content: 'Content 1', Author: 'Author 1', Date: '2023-01-01', Status: 'Draft' },
      { Title: 'Document 2', Content: 'Content 2', Author: 'Author 2', Date: '2023-01-02', Status: 'Published' },
    ];
    const filterDocumentsMock = vi.fn();

    render(
      <DocumentsContext.Provider value={{
        documents: mockDocuments,
        filterDocuments: filterDocumentsMock,
        addDocument: vi.fn(),
        getDocument: vi.fn(),
        editDocument: vi.fn(),
        removeDocument: vi.fn()
      }}>
        <SearchForm />
      </DocumentsContext.Provider>
    );

    const input = screen.getByPlaceholderText('Search for a document');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Document 1' } });

    fireEvent.click(button);

    expect(filterDocumentsMock).toHaveBeenCalledTimes(1);
    expect(filterDocumentsMock).toHaveBeenCalledWith('Document 1');
  });

  it('resets documents when no query is provided', () => {
    const mockDocuments: DocumentType[] = [
      { Title: 'Document 1', Content: 'Content 1', Author: 'Author 1', Date: '2023-01-01', Status: 'Draft' },
      { Title: 'Document 2', Content: 'Content 2', Author: 'Author 2', Date: '2023-01-02', Status: 'Published' },
    ];
    const filterDocumentsMock = vi.fn();

    render(
      <DocumentsContext.Provider value={{
        documents: mockDocuments,
        filterDocuments: filterDocumentsMock,
        addDocument: vi.fn(),
        getDocument: vi.fn(),
        editDocument: vi.fn(),
        removeDocument: vi.fn()
      }}>
        <SearchForm />
      </DocumentsContext.Provider>
    );

    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.click(button);

    expect(filterDocumentsMock).toHaveBeenCalledTimes(1);
    expect(filterDocumentsMock).toHaveBeenCalledWith('');
  });
});
