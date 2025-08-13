"use client";

import {Button} from "../../components/ui/button"
import { useCallback, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useCompletion } from 'ai/react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useI18n } from "../i18n";
import { useApiStore } from "../../store";
import CryptoJs from 'crypto-js';
import "../../styles/markdown.css";

export default function HomePage() {
  const [content, setContent] = useState("");
  const {locale, t } = useI18n()
  const answerRef = useRef(null);
  const deepSeekApiKey = useApiStore(state => state.deepSeekApiKey);

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
      window.scrollBy(0, -70);
    }
  };

  const { complete, completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    headers: {
      'x-api-key': CryptoJs.AES.encrypt(deepSeekApiKey, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY).toString(),
    },
    body: {
      language: locale,
      prompt: content,
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
        return;
      }
      scrollToAnswer();
    },
  });

  const handleInputChange = useCallback(
    (e) => setContent(e.target.value),
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!deepSeekApiKey || deepSeekApiKey.trim() === '') {
      toast.error(t('settings.apiKeyEmpty') || '请先在设置中输入API Key');
      return;
    }
    if (deepSeekApiKey && (!content || content.trim() === '')) {
      toast.error(t('app.emptyFormula') || '请输入您想生成的公式');
      return;
    }
    complete(content);
    handleSubmit(e);
  };

  const answer = completion;

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="my-8">
        <a href="https://www.producthunt.com/products/formulas-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-formulas&#0045;ai" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004694&theme=light&t=1755059666924" alt="Formulas&#0045;AI - Generate&#0032;Excel&#0032;formulas&#0032;by&#0032;DeepSeek&#0032;AI | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" /></a>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-6xl max-w-[708px] font-bold text-slate-900 dark:text-white text-center mb-4 sm:mb-6">
        {t('app.heading')}
      </h1>

      <form className="w-full max-w-xl mx-auto flex flex-col flex-grow" onSubmit={onSubmit}>
        <div className="flex items-center space-x-3">
          <p className="text-sm sm:text-base font-medium dark:text-gray-200">
            {t('app.description')}
          </p>
        </div>
        <textarea
          value={content}
          onChange={handleInputChange}
          rows={3}
          maxLength={200}
          className="w-full rounded-lg bg-white border border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 sm:my-3 p-3 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-500 resize-none h-24"
          placeholder={t('app.placeholder')}
        />

        <Button
          className="bg-black dark:bg-blue-700 rounded-xl text-white font-medium px-4 py-2 sm:py-3 hover:bg-gray-800 dark:hover:bg-blue-800 w-full mt-2 sm:mt-4 text-sm sm:text-base"
          type="submit"
          disabled={isLoading}
          style={{
            cursor: isLoading ? "not-allowed" : "",
          }}
        >
          {isLoading ? (
            <span className="loading">
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
            </span>
          ) : (
            <span>{t('app.generate')} &rarr;</span>
          )}
        </Button>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1" />
      <output className="space-y-4 sm:space-y-6 my-4 sm:my-6 w-full max-w-xl mx-auto px-4">
        {answer && (
          <>
            <div>
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mx-auto text-center"
                ref={answerRef}
                id="answer-section"
              >
                {t('app.formula')}
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center justify-center w-full h-[500px]">
              <div
                className="overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition border dark:border-gray-700 w-full"
              >
                <div className="whitespace-pre-wrap text-left text-sm sm:text-base dark:text-gray-200">
                  {/* <Markdown remarkPlugins={[remarkGfm]}>{answer}</Markdown> */}
                  <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <pre className={`language-${match[1]}`}>
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {answer}
                  </Markdown>
                </div>
              </div>
            </div>
          </>
        )}
      </output>
    </div>
  );
}
