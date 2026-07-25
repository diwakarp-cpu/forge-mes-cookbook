import { createElement, type ComponentType, type SVGProps } from "react";
import {
  IcBoards,
  IcCategories,
  IcExploreCompass,
  IcKey,
  IcReader,
} from "@fynd-design-engineering/fynd-one-ds/icons/actions";
import {
  IcAnalytics,
  IcBug,
  IcComponent,
  IcDistribution,
  IcForms,
  IcGraphTable,
  IcInfrastructure,
  IcRoutesTraffic,
  IcTechnology,
} from "@fynd-design-engineering/fynd-one-ds/icons/data";
import {
  IcFlowChart,
  IcLightbulb,
} from "@fynd-design-engineering/fynd-one-ds/icons/features";
import { IcComputerHistory } from "@fynd-design-engineering/fynd-one-ds/icons/hardware";
import { IcSettings } from "@fynd-design-engineering/fynd-one-ds/icons/navigation";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_RULES: Array<[RegExp, IconComponent]> = [
  [/overview|introduction|start here/i, IcExploreCompass],
  [/role|permission|access|user|team/i, IcKey],
  [/terminology|concept|glossary|definition|learning/i, IcLightbulb],
  [/architecture|infrastructure|system design/i, IcInfrastructure],
  [/navigation|route|journey|workflow|flow/i, IcRoutesTraffic],
  [/setup|setting|configuration|configure|master data/i, IcSettings],
  [/support|troubleshoot|issue|defect|bug|failure|error/i, IcBug],
  [/automation|integration|technology|api|webhook/i, IcTechnology],
  [/analytics|report|dashboard|metric|performance/i, IcAnalytics],
  [/table|field|data|genealogy|traceability/i, IcGraphTable],
  [/quality|inspection|checklist|approval|audit|capa|compliance/i, IcForms],
  [/shipment|container|packaging|asn|inventory|warehouse|material/i, IcDistribution],
  [/release|change|history|version/i, IcComputerHistory],
  [/recipe|instruction|guide|cookbook|how to/i, IcReader],
  [/capabilit|module|catalog|categor/i, IcCategories],
  [/process|sequence|operation/i, IcFlowChart],
  [/production|work order|planning|schedule/i, IcBoards],
];

const FALLBACK_ICONS: IconComponent[] = [
  IcComponent,
  IcBoards,
  IcTechnology,
  IcGraphTable,
  IcForms,
  IcCategories,
  IcReader,
  IcFlowChart,
];

function iconForTitle(title: string): IconComponent {
  const matched = ICON_RULES.find(([pattern]) => pattern.test(title));
  if (matched) return matched[1];

  const hash = Array.from(title).reduce((total, character) => total + character.charCodeAt(0), 0);
  return FALLBACK_ICONS[hash % FALLBACK_ICONS.length];
}

export function CookbookEntryIcon({ title }: { title: string }) {
  return createElement(iconForTitle(title), { "aria-hidden": true });
}
