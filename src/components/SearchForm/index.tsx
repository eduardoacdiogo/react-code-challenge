import { useContext } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

import { DocumentsContext } from '../../contexts/DocumentsContext';

import { SearchFormContainer } from './styles';

export function SearchForm() {
  const { filterDocuments } = useContext(DocumentsContext);
  const onSubmit = (formData: FormData) => {
    const query = formData.get('search') || '';

    filterDocuments(query.toString());
  }

  return (
    <SearchFormContainer onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}>
      <input name="search" type="text" placeholder="Search for a document" />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}