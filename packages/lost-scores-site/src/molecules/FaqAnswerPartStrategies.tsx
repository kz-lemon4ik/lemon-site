import clsx from "clsx";
import React from "react";
import { AnswerPart } from "./FaqItem";

interface AnswerPartComponentProps {
  partKey: React.Key;
}

interface StrongPartProps extends AnswerPartComponentProps {
  content: string;
}

interface CodePartProps extends AnswerPartComponentProps {
  content: string;
}

interface LinkPartProps extends AnswerPartComponentProps {
  href: string;
  text: string;
}

interface ListPartProps extends AnswerPartComponentProps {
  items: AnswerPart[][];
  renderContent: (part: AnswerPart, key: React.Key) => React.ReactNode;
}

interface AnswerPartStrategiesProps {
  accentLinkStyles: string;
  codeStyles: string;
}

export function createAnswerPartStrategies({
  accentLinkStyles,
  codeStyles,
}: AnswerPartStrategiesProps) {
  return {
    strong: ({ content, partKey }: StrongPartProps) => (
      <strong
        key={partKey}
        className={clsx(
          "font-semibold",
          "text-white",
          "theme-is-light:text-themeLight-headingText"
        )}
      >
        {content}
      </strong>
    ),

    code: ({ content, partKey }: CodePartProps) => (
      <code key={partKey} className={codeStyles}>
        {" "}
        {content}{" "}
      </code>
    ),

    link: ({ href, text, partKey }: LinkPartProps) => (
      <a
        key={partKey}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={accentLinkStyles}
      >
        {text}
      </a>
    ),

    list: ({ items, partKey, renderContent }: ListPartProps) => (
      <ul key={partKey} className="list-disc list-outside pl-5 my-3 space-y-2">
        {items.map((listItemPartsArray, listItemIndex) => (
          <li key={listItemIndex}>
            {listItemPartsArray.map((actualPart, actualPartIndex) =>
              renderContent(actualPart, `${partKey}-li-${listItemIndex}-${actualPartIndex}`)
            )}
          </li>
        ))}
      </ul>
    ),
  } as const;
}

export type AnswerPartStrategies = ReturnType<typeof createAnswerPartStrategies>;
