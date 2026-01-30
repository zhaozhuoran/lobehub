'use client';

import { Block, Flexbox, Icon, Text } from '@lobehub/ui';
import { cssVar } from 'antd-style';
import { CornerRightUp } from 'lucide-react';
import { memo, useCallback } from 'react';

import { useChatStore } from '@/store/chat';

interface ItemProps {
  prompt: string;
  title: string;
}

const Item = memo<ItemProps>(({ title, prompt }) => {
  const mainInputEditor = useChatStore((s) => s.mainInputEditor);

  const handleClick = useCallback(() => {
    // Use the editor instance to set markdown content directly
    mainInputEditor?.instance?.setDocument('markdown', prompt);
    mainInputEditor?.focus();
  }, [prompt, mainInputEditor]);

  return (
    <Block
      clickable
      onClick={handleClick}
      style={{
        borderRadius: cssVar.borderRadiusLG,
        cursor: 'pointer',
        flex: 'none',
        minHeight: 100,
        width: 200,
      }}
      variant={'outlined'}
    >
      <Flexbox
        height={'100%'}
        justify={'space-between'}
        paddingBlock={12}
        paddingInline={14}
        style={{ position: 'relative' }}
      >
        <Text
          color={cssVar.colorTextSecondary}
          ellipsis={{ rows: 3 }}
          fontSize={13}
          style={{ lineHeight: 1.6 }}
        >
          {title}
        </Text>
        <Flexbox align={'flex-end'} flex={1} justify={'flex-end'}>
          <Icon color={cssVar.colorTextQuaternary} icon={CornerRightUp} size={16} />
        </Flexbox>
      </Flexbox>
    </Block>
  );
});

export default Item;
