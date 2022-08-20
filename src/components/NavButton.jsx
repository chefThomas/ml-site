import {
  Box,
  Group,
  Image,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import tsLogo from './TFLogo.svg';

const useStyles = createStyles((theme, _params, getRef) => ({
  hover: {
    backgroundColor: '#f8f9fa',
  },
}));

function NavButton({ text, subText, page }) {
  const { hovered, ref } = useHover();
  const { classes } = useStyles();

  return (
    <Box ref={ref} className={hovered && classes.hover}>
      <UnstyledButton>
        <Group>
          <div>
            <Text>{text}</Text>
            <Text size="xs" color="dimmed">
              {subText}
            </Text>
          </div>
          <div className="icon-container">
            <Image src={tsLogo} alt="TensorFlow logo" />
          </div>
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default NavButton;
