import CM, { EditorConfiguration, Editor } from 'codemirror';
import React, { useRef, useEffect } from 'react';

export const DEFAULT_CODE_MIRROR_OPTIONS: EditorConfiguration = {
  lineNumbers: true,
  mode: 'text/jsx',
  tabSize: 2,
};

export type CodeMirrorOption = keyof EditorConfiguration;
export type Options = Pick<EditorConfiguration, CodeMirrorOption>
export type CodeMirrorProps = {
  options: Options;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const updateOption = <T extends CodeMirrorOption>(codeMirrorInstance: Editor, [option, value]: [T, EditorConfiguration[T]]): void => {
  const prev = codeMirrorInstance.getOption(option);

  if (prev !== value) {
    codeMirrorInstance.setOption(option, value);
  }
};

const CodeMirror = (props: CodeMirrorProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeMirrorInstance = useRef<Editor | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const codeMirror = CM.fromTextArea(textAreaRef.current, DEFAULT_CODE_MIRROR_OPTIONS);

      codeMirror.on('change', (instance: Editor) => props.onChange(instance.getValue()));
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
      codeMirrorInstance.current.setValue(props.value);
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