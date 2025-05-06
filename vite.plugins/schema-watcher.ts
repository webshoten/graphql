import { Plugin } from 'vite';
import { spawn } from 'child_process';

export default function schemaWatcherPlugin(): Plugin {
  return {
    name: 'custom-watcher-plugin',
    handleHotUpdate({ file, server }) {
    
      if (file.endsWith('app/graphql/schema.ts')) {
        console.log(`📄 Detected change in ${file}, running script...`);
        
        // 任意のコマンドを実行（例: Node スクリプト）
        const child = spawn('npm', ['run', 'codegen'], { stdio: 'inherit' });

        child.on('close', (code) => {
          console.log(`✅ Script exited with code ${code}`);
        });
      }
    },
  };
}