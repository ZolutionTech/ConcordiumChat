import { BotMessageTheme, TextInputTheme, UserMessageTheme } from '@/features/bubble/types';
export type BotProps = {
    chatflowid: string;
    apiHost?: string;
    chatflowConfig?: Record<string, unknown>;
    welcomeMessage?: string;
    botMessage?: BotMessageTheme;
    userMessage?: UserMessageTheme;
    textInput?: TextInputTheme;
    poweredByTextColor?: string;
    badgeBackgroundColor?: string;
    fontSize?: number;
    toggleBot?: () => void;
    botScrollContainer?: HTMLDivElement | undefined;
};
export declare const Bot: (props: BotProps & {
    class?: string;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=Bot.d.ts.map