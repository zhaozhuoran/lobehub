import { type IThreadType, ThreadType, type UIChatMessage } from '@lobechat/types';

/**
 * Generate parent messages for thread display
 * Based on thread type:
 * - Standalone: only include the source message
 * - Continuation: include all messages up to and including the source message
 */
export const genParentMessages = (
  messages: UIChatMessage[],
  startMessageId: string | null | undefined,
  threadMode?: IThreadType,
) => {
  if (!startMessageId) return [];

  // If in standalone topic mode, only display the topic start message
  if (threadMode === ThreadType.Standalone) {
    return messages.filter((m) => m.id === startMessageId);
  }

  // If in continuation mode, only display the topic start message and topic divider
  const targetIndex = messages.findIndex((item) => item.id === startMessageId);

  if (targetIndex < 0) return [];

  return messages.slice(0, targetIndex + 1);
};
