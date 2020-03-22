import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import CodeMirrorPanel from './CodeMirrorPanel';
import { EditorConfiguration } from 'codemirror';

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: stretch;
  width: 100%;
`;

const Panels = styled(Container)``;

export type ReplProps = {
  optionsLeft: EditorConfiguration;
  optionsRight: EditorConfiguration;
  compiler: (code: string) => string;
}

const Repl = (props: ReplProps): ReactElement => {
  const [code, setCode] = useState<string>('');
  const [compiled, setCompiled] = useState<string>('');
  const [compileError, setCompileError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setCompiled(props.compiler(code));
    } catch (error) {
      setCompileError(error);
    }
  }, [code]);

  return (
    <Container>
      <Panels>
        <CodeMirrorPanel
          options={props.optionsLeft}
          value={code}
          onChange={setCode}
          error={compileError}
        />
        <CodeMirrorPanel
          options={props.optionsRight}
          value={compiled}
          error={null}
        />
      </Panels>
    </Container>
  );
};

export default Repl;