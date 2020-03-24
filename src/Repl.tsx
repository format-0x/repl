import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import CodeMirrorPanel from './CodeMirrorPanel';
import { EditorConfiguration } from 'codemirror';
import { handleNamedArgs } from './helpers';

const preload = handleNamedArgs.toString();

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
}

const socket = io('http://localhost:3000');
socket.on('disconnect', (reason: string) => {
  if (reason === 'io server disconnect') {
    socket.connect();
  }
});

const Repl = (props: ReplProps): ReactElement => {
  const [code, setCode] = useState<string>('');
  const [compiled, setCompiled] = useState<string>('');
  const [compileError, setCompileError] = useState<Error | null>(null);

  useEffect(() => {
    socket.emit('compile', code);
  }, [code]);

  useEffect(() => {
    socket.on('message', (compiled: string) => {
      setCompiled(`${preload}\n${compiled}`);
      setCompileError(null);
    });
    socket.on('compileError', setCompileError);
  }, []);

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