
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 sm:mb-0 mb-3 dark:bg-gray-800 dark:text-white">
      <div>
        Powered by{" "}
        <a
          href="https://www.deepseek.com/"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          DeepSeek AI{" "}
        </a>
        and{" "}
        <a
          href="https://sdk.vercel.ai/docs"
          target="_blank"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel AI SDK
        </a>
      </div>
      <div className="flex justify-center space-x-6 md:order-2">
        <a
          href="https://github.com/CrisChr/formulas-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <span className="sr-only">GitHub</span>
          <Github className="h-6 w-6" aria-hidden="true" />
        </a>

      </div>
    </footer>
  );
}
