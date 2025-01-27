import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { X, WarningCircle } from 'phosphor-react';
import * as zod from 'zod';

import { DocumentsContext } from '../../contexts/DocumentsContext';

import { CloseButton, Content, ErrorsContainer, Input, Overlay } from './styles';

const newDocumentFormValidationSchema = zod.object({
  Title: zod.string().trim().nonempty(),
  Content: zod.string().trim().nonempty(),
  Author: zod.string().trim().nonempty(),
  Date: zod.string().trim().nonempty(),
  Status: zod.string().trim().nonempty(),
})

type NewDocumentFormValues = zod.infer<typeof newDocumentFormValidationSchema>;

interface DocumentModalProps {
  document?: NewDocumentFormValues;
}

export function DocumentModal({ document }: DocumentModalProps) {
  const { addDocument, editDocument } = useContext(DocumentsContext);

  const newDocumentForm = useForm<NewDocumentFormValues>({
    resolver: zodResolver(newDocumentFormValidationSchema),
    defaultValues: {
      Title: document?.Title || '',
      Content: document?.Content || '',
      Author: document?.Author || '',
      Date: document?.Author || '',
      Status: document?.Status || '',
    },
  })

  const { handleSubmit, register, reset, setError, formState: { errors } } = newDocumentForm;

  const onSubmit = (data: NewDocumentFormValues) => {
    if (document) {
      const error = editDocument(document, data);

      if (error) {
        setError('Title', { message: error });
      }

      return
    }

    const error = addDocument(data);

    if (error) {
      setError('Title', { message: error });
      return;
    }

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{document ? 'Edit Document' : 'New Document'}</Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id='title' hasError={!!errors.Title} type="text" placeholder='Title' {...register('Title')} />
          <Input id='author' hasError={!!errors.Author} type="text" placeholder='Author' {...register('Author')} />
          <Input id='content' hasError={!!errors.Content} type="text" placeholder='Content' {...register('Content')} />
          <Input id='date' hasError={!!errors.Date} type="text" placeholder='Date' {...register('Date')} />
          <Input id='status' hasError={!!errors.Status} type="text" placeholder='Status' {...register('Status')} />

          {errors && Object.values(errors).map((error, index) => (
            <ErrorsContainer key={index}>
              <WarningCircle size={24} />
              <span>{error.message}</span>
            </ErrorsContainer>
          ))}

          <button type='submit'>
            {document ? 'Edit' : 'Submit'}
          </button>
        </form>

        <CloseButton onClick={() => reset()}>
          <X size={24} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  )
}