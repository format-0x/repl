import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import CodeMirrorPanel from './CodeMirrorPanel';

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: stretch;
  width: 100%;
`;
const Panels = styled(Container)``;

const Repl = (): ReactElement => {
  const [code, setCode] = useState<string>('');
  const [compiled, setCompiled] = useState<string>('');
  const [compileError, setCompileError] = useState(null);

  useEffect(() => {
    setCompiled(code);
  }, [code]);

  return (
    <Container>
      <Panels>
        <CodeMirrorPanel
          options={{ mode: 'text/x-vb' }}
          value={code}
          onChange={setCode}
        />
        <CodeMirrorPanel
          options={{ mode: 'javascript' }}
          value={compiled}
        />
      </Panels>
    </Container>
  );
};

export default Repl;