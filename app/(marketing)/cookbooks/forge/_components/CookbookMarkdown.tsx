import Link from "next/link";
import type { ReactNode } from "react";
import {
  Accordion,
  Grid,
  Pointers,
  RichIconCard,
  Text,
} from "@fynd-design-engineering/fynd-one-ds";
import { resolveForgeCookbookHref } from "@/lib/cookbooks/forge";
import { CookbookEntryIcon } from "./CookbookEntryIcon";
import styles from "./cookbook.module.css";

type Props = {
  content: string;
};

type DiagramSpec = {
  intro: string;
  nodes: Array<{
    title: string;
    description: string;
    relation?: string;
    category?: string;
  }>;
};

type GifPlaceholderSpec = {
  title: string;
  description: string;
};

const BLOCK_START = /^(#{2,6}\s|```|<aside>|---+$|\|.*\|$|[-*]\s|[-*]\s+\[[ xX]\]|\d+\.\s)/;

function removeDecorativeEmoji(value: string): string {
  return value
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const cleanedValue = removeDecorativeEmoji(value);
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*\n]+)\*)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(cleanedValue))) {
    if (match.index > cursor) nodes.push(cleanedValue.slice(cursor, match.index));
    const key = `${keyPrefix}-${index}`;

    if (match[2] && match[3]) {
      const href = resolveForgeCookbookHref(match[3]);
      const isExternal = /^(https?:|mailto:|tel:)/i.test(href);
      if (href === "#") {
        nodes.push(<span key={key}>{match[2]}</span>);
      } else if (isExternal) {
        nodes.push(
          <a key={key} href={href} target="_blank" rel="noreferrer">
            {match[2]}
          </a>,
        );
      } else {
        nodes.push(
          <Link key={key} href={href}>
            {match[2]}
          </Link>,
        );
      }
    } else if (match[4]) {
      nodes.push(<strong key={key}>{match[4]}</strong>);
    } else if (match[5]) {
      nodes.push(<code key={key}>{match[5]}</code>);
    } else if (match[6]) {
      nodes.push(<em key={key}>{match[6]}</em>);
    }

    cursor = pattern.lastIndex;
    index += 1;
  }

  if (cursor < cleanedValue.length) nodes.push(cleanedValue.slice(cursor));
  return nodes;
}

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function headingVariant(level: number) {
  if (level === 2) return "heading-m" as const;
  return "heading-s" as const;
}

function plainText(value: string): string {
  return removeDecorativeEmoji(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[\\*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cardCopy(value: string): { title: string; subtext?: string } {
  const labelled = value.match(/^\*\*([^*]+?)(?::)?\*\*(?:\s*[—–:-]\s*)?(.*)$/);
  if (!labelled) return { title: plainText(value) };

  const title = plainText(labelled[1]).replace(/:$/, "");
  const subtext = plainText(labelled[2]);
  return { title, subtext: subtext || undefined };
}

function shouldUseCards(items: string[], heading: string): boolean {
  if (items.length < 3) return false;
  return /users?|who uses|who operates|roles?|capabilit|related modules|modules by|components?|types?|categories|teams?|audiences?|stakeholders?|business domains?|forge mes scope/i.test(
    heading,
  );
}

function isProcessFlow(lines: string[]): boolean {
  return lines.join(" ").includes("→");
}

function parseDiagram(value: string): DiagramSpec | undefined {
  try {
    const parsed = JSON.parse(value) as DiagramSpec;
    if (!parsed.intro || !Array.isArray(parsed.nodes) || parsed.nodes.length === 0) {
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
}

function parseGifPlaceholder(value: string): GifPlaceholderSpec | undefined {
  try {
    const parsed = JSON.parse(value) as GifPlaceholderSpec;
    if (!parsed.title || !parsed.description) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function GifPlaceholderBlock({ placeholder }: { placeholder: GifPlaceholderSpec }) {
  return (
    <figure className={styles.gifPlaceholder}>
      <div className={styles.gifPlaceholderVisual} aria-hidden>
        <span className={styles.gifPlaceholderPlay}>▶</span>
        <Text variant="body-xs" as="span" weight="semibold">
          GIF PLACEHOLDER
        </Text>
      </div>
      <figcaption className={styles.gifPlaceholderCaption}>
        <Text variant="body-m" as="p" weight="semibold">
          {placeholder.title}
        </Text>
        <Text variant="body-s" as="p" color="secondary">
          {placeholder.description}
        </Text>
      </figcaption>
    </figure>
  );
}

function DiagramBlock({ diagram }: { diagram: DiagramSpec }) {
  const accessibleFlow = diagram.nodes
    .map((node, index) => `Step ${index + 1}: ${node.title}. ${node.description}`)
    .join(" ");

  return (
    <figure
      className={styles.explainerDiagram}
      aria-label={`${diagram.intro} ${accessibleFlow}`}
    >
      <figcaption className={styles.diagramIntro}>
        <Text variant="body-m" as="p" color="secondary">
          {diagram.intro}
        </Text>
      </figcaption>
      <ol className={styles.diagramFlow}>
        {diagram.nodes.map((node, nodeIndex) => (
          <li
            className={`${styles.diagramStage} ${styles[`diagramTone${nodeIndex % 5}`]}`}
            key={`${node.title}-${nodeIndex}`}
          >
            <span className={styles.diagramStageHeader}>
              <span className={styles.diagramStageIdentity}>
                <Text
                  variant="body-s"
                  as="span"
                  weight="semibold"
                  className={styles.diagramStageNumber}
                  aria-label={`Step ${nodeIndex + 1}`}
                >
                  {String(nodeIndex + 1).padStart(2, "0")}
                </Text>
                <span className={styles.diagramStageIcon} aria-hidden>
                  <CookbookEntryIcon title={node.title} />
                </span>
              </span>
              {node.category ? (
                <Text
                  variant="body-xs"
                  as="span"
                  weight="semibold"
                  className={styles.diagramCategory}
                >
                  {node.category}
                </Text>
              ) : null}
            </span>
            <Text
              variant="heading-s"
              as="h3"
              color="white"
              className={styles.diagramStageTitle}
            >
              {node.title}
            </Text>
            <Text
              variant="body-s"
              as="p"
              color="white"
              className={styles.diagramStageDescription}
            >
              {node.description}
            </Text>
            {nodeIndex < diagram.nodes.length - 1 ? (
              <span className={styles.visuallyHidden}>
                {node.relation || "Provides the information needed for the next step."}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <span className={styles.diagramStopNote}>
        <span className={styles.diagramStopIcon} aria-hidden>
          !
        </span>
        <Text variant="body-s" as="span" weight="semibold">
          Complete each required stage before moving to the next.
        </Text>
      </span>
    </figure>
  );
}

function parseFunctionalAreas(
  lines: string[],
  startIndex: number,
): { items: Array<{ question: string; answer: string }>; nextIndex: number } {
  const items: Array<{ question: string; answer: string }> = [];
  let cursor = startIndex;

  while (cursor < lines.length) {
    const value = lines[cursor].trim();
    if (/^##\s+/.test(value) || /^---+$/.test(value)) break;
    if (!value) {
      cursor += 1;
      continue;
    }

    const title = value.match(/^\*\*([^*]+)\*\*$/);
    if (!title) break;

    cursor += 1;
    while (cursor < lines.length && !lines[cursor].trim()) cursor += 1;

    const descriptionLines: string[] = [];
    while (cursor < lines.length) {
      const description = lines[cursor].trim();
      if (!description || /^##\s+/.test(description) || /^\*\*[^*]+\*\*$/.test(description)) {
        break;
      }
      descriptionLines.push(description);
      cursor += 1;
    }

    items.push({
      question: plainText(title[1]),
      answer: plainText(descriptionLines.join(" ")),
    });
  }

  return { items: items.filter((item) => item.answer), nextIndex: cursor };
}

export function CookbookMarkdown({ content }: Props) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let currentHeading = "";

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "<aside>") {
      const asideLines: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== "</aside>") {
        asideLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      const firstContentIndex = asideLines.findIndex((item) => item.trim());
      const calloutBody = asideLines
        .filter((_, asideIndex) => asideIndex !== firstContentIndex)
        .join("\n")
        .trim();
      const calloutTitle =
        asideLines.find((item, asideIndex) => asideIndex !== firstContentIndex && item.trim()) ||
        "Important note";
      blocks.push(
        <aside className={styles.callout} key={`aside-${index}`}>
          <span className={styles.calloutIcon} aria-hidden>
            <CookbookEntryIcon title={plainText(calloutTitle)} />
          </span>
          <div className={styles.calloutBody}>
            <CookbookMarkdown content={calloutBody} />
          </div>
        </aside>,
      );
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      if (language === "diagram") {
        const diagram = parseDiagram(code.join("\n"));
        if (diagram) {
          blocks.push(<DiagramBlock diagram={diagram} key={`diagram-${index}`} />);
          continue;
        }
      }
      if (language === "gif-placeholder") {
        const placeholder = parseGifPlaceholder(code.join("\n"));
        if (placeholder) {
          blocks.push(
            <GifPlaceholderBlock
              placeholder={placeholder}
              key={`gif-placeholder-${index}`}
            />,
          );
          continue;
        }
      }
      if (isProcessFlow(code)) {
        const steps = code
          .flatMap((step) => step.split("→"))
          .map((step) => step.trim())
          .filter(Boolean);
        blocks.push(
          <ol className={styles.processTimeline} key={`flow-${index}`}>
            {steps.map((step, stepIndex) => (
              <li className={styles.processStep} key={`flow-step-${stepIndex}`}>
                <Text
                  variant="body-s"
                  as="span"
                  weight="semibold"
                  className={styles.processStepNumber}
                  aria-hidden
                >
                  {stepIndex + 1}
                </Text>
                <Text variant="body-m" as="span" className={styles.processStepLabel}>
                  {renderInline(step, `flow-inline-${index}-${stepIndex}`)}
                </Text>
              </li>
            ))}
          </ol>,
        );
        continue;
      }
      blocks.push(
        <pre className={styles.codeBlock} key={`code-${index}`}>
          <code data-language={language || undefined}>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const heading = trimmed.match(/^(#{2,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const headingTag = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";
      currentHeading = plainText(heading[2]);
      blocks.push(
        <Text
          key={`heading-${index}`}
          variant={headingVariant(level)}
          as={headingTag}
          className={styles.heading}
        >
          {renderInline(heading[2], `heading-inline-${index}`)}
        </Text>,
      );
      index += 1;

      if (level === 2 && /^Main Functional Areas$/i.test(currentHeading)) {
        const functionalAreas = parseFunctionalAreas(lines, index);
        if (functionalAreas.items.length > 0) {
          blocks.push(
            <Accordion
              className={styles.functionalAreasAccordion}
              items={functionalAreas.items}
              key={`functional-areas-${index}`}
            />,
          );
          index = functionalAreas.nextIndex;
        }
      }

      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push(<hr className={styles.rule} key={`rule-${index}`} />);
      index += 1;
      continue;
    }

    if (
      trimmed.startsWith("|") &&
      index + 1 < lines.length &&
      /^\|?\s*:?-{3,}/.test(lines[index + 1].trim())
    ) {
      const rows = [line];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(lines[index]);
        index += 1;
      }
      const [header, ...bodyRows] = rows.map(tableCells);
      blocks.push(
        <div className={styles.tableWrap} key={`table-${index}`}>
          <table>
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={`th-${cellIndex}`}>
                    <Text variant="body-s" as="span" weight="semibold">
                      {renderInline(cell, `th-inline-${cellIndex}`)}
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`td-${rowIndex}-${cellIndex}`}>
                      <Text variant="body-s" as="span">
                        {renderInline(cell, `td-inline-${rowIndex}-${cellIndex}`)}
                      </Text>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: Array<{ content: string; checked?: boolean; task: boolean }> = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        const item = lines[index].trim().replace(/^[-*]\s+/, "");
        const task = item.match(/^\[([ xX])\]\s*(.*)$/);
        items.push({
          content: task ? task[2] : item,
          checked: task ? task[1].toLowerCase() === "x" : undefined,
          task: Boolean(task),
        });
        index += 1;
      }

      const hasTasks = items.some((item) => item.task);
      if (!hasTasks && shouldUseCards(items.map((item) => item.content), currentHeading)) {
        blocks.push(
          <Grid columns={3} gap={16} className={styles.inlineCardGrid} key={`cards-${index}`}>
            {items.map((item, itemIndex) => {
              const copy = cardCopy(item.content);
              return (
                <RichIconCard
                  icon={<CookbookEntryIcon title={copy.title} />}
                  key={`card-${itemIndex}`}
                  showButton={false}
                  subtext={copy.subtext}
                  title={copy.title}
                  titleAs="h3"
                />
              );
            })}
          </Grid>,
        );
        continue;
      }

      if (!hasTasks) {
        blocks.push(
          <Pointers
            className={styles.pointerList}
            items={items.map((item, itemIndex) => ({
              label: plainText(item.content),
              node: renderInline(item.content, `pointer-inline-${index}-${itemIndex}`),
            }))}
            key={`pointers-${index}`}
            variant="body-m"
          />,
        );
        continue;
      }

      blocks.push(
        <ul className={styles.list} key={`list-${index}`}>
          {items.map((item, itemIndex) => (
            <li className={item.task ? styles.taskItem : undefined} key={`item-${itemIndex}`}>
              {item.task ? (
                <span className={styles.checkbox} aria-label={item.checked ? "Completed" : "Incomplete"}>
                  {item.checked ? "✓" : ""}
                </span>
              ) : null}
              <Text variant="body-m" as="span">
                {renderInline(item.content, `list-inline-${itemIndex}`)}
              </Text>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol className={styles.list} key={`ordered-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ordered-item-${itemIndex}`}>
              <Text variant="body-m" as="span">
                {renderInline(item, `ordered-inline-${itemIndex}`)}
              </Text>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;
    while (index < lines.length && lines[index].trim() && !BLOCK_START.test(lines[index].trim())) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    const paragraph = paragraphLines.join(" ");
    blocks.push(
      <Text variant="body-m" as="p" className={styles.paragraph} key={`paragraph-${index}`}>
        {renderInline(paragraph, `paragraph-inline-${index}`)}
      </Text>,
    );
  }

  return <div className={styles.markdown}>{blocks}</div>;
}
