import { SxProps, Theme } from '@mui/material/styles';

export const avatarStyles = (width: number, height: number): SxProps<Theme> => ({
  maxWidth: width,
  width: '100%',
  height,
  borderRadius: '10px',
  objectFit: 'cover',
});
