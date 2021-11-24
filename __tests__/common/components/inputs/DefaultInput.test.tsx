import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import DefaultInput from '../../../../common/components/inputs/DefaultInput';

const DefaultInputExample: React.FC = () => {
  const [text, setText] = useState('');
  const [inputError, setInputError] = useState('');
  const [trailing, setTrailing] = useState<React.ReactNode | undefined>(undefined);

  const onChangeText = useCallback(
    (text: string) => {
      setText(text);

      if (text === 'error') {
        setInputError('Input error');
      } else {
        setInputError('');
      }

      setTrailing(<Text>bla</Text>);
    },
    [setText, setInputError, setTrailing]
  );

  return (
    <DefaultInput
      title="Example"
      value={text}
      onChangeText={onChangeText}
      trailing={trailing}
      errorMessage={inputError}
    />
  );
};

it('Should render input properly', async () => {
  const { getByTestId, queryByTestId, toJSON } = render(<DefaultInputExample />);

  const inputText = 'example';

  const input = getByTestId('default-input-input');
  fireEvent.changeText(input, inputText);

  await waitFor(() => expect(queryByTestId('default-input-error-message')).toBeFalsy());

  expect(toJSON()).toMatchSnapshot();
});

it('Should display error message', async () => {
  const { getByTestId, queryByTestId, toJSON } = render(<DefaultInputExample />);

  const inputText = 'error';

  const input = getByTestId('default-input-input');
  fireEvent.changeText(input, inputText);

  await waitFor(() => expect(queryByTestId('default-input-error-message')).toBeTruthy());

  expect(toJSON()).toMatchSnapshot();
});
