import { DEFAULT_AGENT_CHAT_CONFIG, DEFAULT_AGENT_SEARCH_FC_MODEL } from '@lobechat/const';
import { isContextCachingModel, isThinkingWithToolClaudeModel } from '@lobechat/model-runtime';
import { type LobeAgentChatConfig } from '@lobechat/types';

import { type AgentStoreState } from '@/store/agent/initialState';

import { agentSelectors } from './selectors';

/**
 * ChatConfig selectors that get config by agentId parameter.
 * Used in ChatInput components where agentId is passed as prop.
 */

const getChatConfigById =
  (agentId: string) =>
  (s: AgentStoreState): LobeAgentChatConfig =>
    agentSelectors.getAgentConfigById(agentId)(s)?.chatConfig || {};

const getEnableHistoryCountById = (agentId: string) => (s: AgentStoreState) => {
  const config = agentSelectors.getAgentConfigById(agentId)(s);
  const chatConfig = getChatConfigById(agentId)(s);

  // If context caching is enabled and current model type matches, do not enable history
  const enableContextCaching = !chatConfig.disableContextCaching;

  if (enableContextCaching && config?.model && isContextCachingModel(config.model)) return false;

  // When search is enabled, do not enable history for Claude 3.7 Sonnet model
  const searchMode = chatConfig.searchMode || 'off';
  const enableSearch = searchMode !== 'off';

  if (enableSearch && config?.model && isThinkingWithToolClaudeModel(config.model)) return false;

  return chatConfig.enableHistoryCount;
};

const getHistoryCountById =
  (agentId: string) =>
  (s: AgentStoreState): number => {
    const chatConfig = getChatConfigById(agentId)(s);

    return chatConfig.historyCount ?? (DEFAULT_AGENT_CHAT_CONFIG.historyCount as number);
  };

const getSearchModeById = (agentId: string) => (s: AgentStoreState) =>
  getChatConfigById(agentId)(s).searchMode || 'off';

const isEnableSearchById = (agentId: string) => (s: AgentStoreState) =>
  getSearchModeById(agentId)(s) !== 'off';

const getUseModelBuiltinSearchById = (agentId: string) => (s: AgentStoreState) =>
  getChatConfigById(agentId)(s).useModelBuiltinSearch;

const getSearchFCModelById = (agentId: string) => (s: AgentStoreState) =>
  getChatConfigById(agentId)(s).searchFCModel || DEFAULT_AGENT_SEARCH_FC_MODEL;

export const chatConfigByIdSelectors = {
  getChatConfigById,
  getEnableHistoryCountById,
  getHistoryCountById,
  getSearchFCModelById,
  getSearchModeById,
  getUseModelBuiltinSearchById,
  isEnableSearchById,
};
