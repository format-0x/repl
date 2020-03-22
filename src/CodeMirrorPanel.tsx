import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CodeMirror, { CodeMirrorProps } from './CodeMirror';

export interface CodeMirrorPanelProps extends CodeMirrorProps {}

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: stretch;
`;

export const CodeMirrorContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const CodeMirrorPanel = (props: CodeMirrorPanelProps): ReactElement => {
  const { value, onChange, options, placeholder } = props;

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
    </Panel>
  );
};

export default CodeMirrorPanel;