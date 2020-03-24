import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CodeMirror, { CodeMirrorProps } from './CodeMirror';

export interface CodeMirrorPanelProps extends CodeMirrorProps {
  error: Error | null;
}

export const ErrorMessage = styled.div`
  flex: none;
  max-height: 30%;
  padding: 0.5rem 0.75rem;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: stretch;
  width: 100%;
`;

export const CodeMirrorContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const CodeMirrorPanel = (props: CodeMirrorPanelProps): ReactElement => {
  const { value, onChange, options, placeholder, error } = props;

  return (
    <Panel>
      <CodeMirrorContainer>
        <CodeMirror
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </CodeMirrorContainer>
      {error &&
         <ErrorMessage>
           {error}
         </ErrorMessage>}
    </Panel>
  );
};

export default CodeMirrorPanel;