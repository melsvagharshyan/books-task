import React, { useMemo } from 'react';
import { Avatar as MUIAvatar } from '@mui/material';

import defaultAvatarUrl from '../../assets/images/avatar.jpeg';
import { avatarStyles as styles } from './styles';

type TAvatarProps = {
  avatarUrl?: string;
  size?: number;
  width?: number;
  height?: number;
};

const Avatar: React.FC<TAvatarProps> = ({ avatarUrl, size = 150, width = size, height = size }) => {
  const avatarImage = useMemo(() => avatarUrl || defaultAvatarUrl, [avatarUrl]);
  const avatarStyle = useMemo(() => styles(width, height), [width, height]);

  return <MUIAvatar src={avatarImage} alt="User avatar" sx={avatarStyle} />;
};

export default Avatar;
