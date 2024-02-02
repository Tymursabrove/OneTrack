import type { SpriteIconName } from '$lib/common/SpriteIcons'

export interface IDndListSetup {
    name: string;
    itemsSize: 'small'|'medium'|'big';

    items: {
      id?: number;
      name: string;
      icon?: SpriteIconName;
      title: string;
      description?: string;
      online?: boolean;
      info: string;
      fullWidthContent?: boolean;
    }[]
  }