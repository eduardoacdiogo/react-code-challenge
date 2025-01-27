import { styled } from 'styled-components';

export const DocumentsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const DocumentList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${props => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6r;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 30%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BUTTON_COLOR = {
  green: 'green-300',
  red: 'red-300',
} as const

interface ActionButtonProps {
  buttonColor: keyof typeof BUTTON_COLOR;
}

export const ActionButton = styled.button<ActionButtonProps>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: transparent;
    border: 0;
    border-radius: 6px;
    margin: 0 0.5rem;
    color: ${props => props.theme[BUTTON_COLOR[props.buttonColor]]};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme[BUTTON_COLOR[props.buttonColor]]};
      border-color: ${props => props.theme[BUTTON_COLOR[props.buttonColor]]};
      color: ${props => props.theme["white"]};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
` 