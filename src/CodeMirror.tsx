import CM, { EditorConfiguration, Editor } from 'codemirror';
import React, { useRef, useEffect, ReactElement } from 'react';

export const DEFAULT_CODE_MIRROR_OPTIONS: EditorConfiguration = {
  lineNumbers: true,
  tabSize: 2,
  theme: 'mbo',
};

export type CodeMirrorOption = keyof EditorConfiguration;
export type CodeMirrorProps = {
  options: EditorConfiguration;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const updateOption = <T extends CodeMirrorOption>(codeMirrorInstance: Editor, [option, value]: [T, EditorConfiguration[T]]): void => {
  const prev = codeMirrorInstance.getOption(option);

  if (prev !== value) {
    codeMirrorInstance.setOption(option, value);
  }
};

const CodeMirror = (props: CodeMirrorProps): ReactElement => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeMirrorInstance = useRef<Editor | null>(null);
  const { onChange } = props;

  useEffect(() => {
    if (textAreaRef.current) {
      const codeMirror = CM.fromTextArea(textAreaRef.current, DEFAULT_CODE_MIRROR_OPTIONS);

      if (onChange) {
        codeMirror.on('change', (instance: Editor) => onChange(instance.getValue()));
      }

      codeMirrorInstance.current = codeMirror;

      return () => codeMirror.toTextArea();
    }
  }, []);

  useEffect(() => {
    if (codeMirrorInstance.current) {
      // @ts-ignore
      Object.entries(props.options).forEach(updateOption.bind(null, codeMirrorInstance.current));
    }
  }, [props.options]);

  useEffect(() => {
    if (codeMirrorInstance.current) {
      const cursor = codeMirrorInstance.current.getCursor();
      codeMirrorInstance.current.setValue(props.value);
      codeMirrorInstance.current.setCursor(cursor);
    }
  }, [props.value]);

  return (
    <textarea
      autoComplete={'off'}
      defaultValue={props.value}
      placeholder={props.placeholder}
      ref={textAreaRef}
    />
  );
};

export default CodeMirror;