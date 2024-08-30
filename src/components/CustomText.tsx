import React from "react";
import { Text } from "react-native-paper";

type Props = React.ComponentProps<typeof Text>;

// Disable font scaling so that excessively large font sizes do not break the design
// TODO: consider less stricter maxFontSizeMultiplier
const CustomText: React.FC<Props> = (props) => {
  return <Text {...props} allowFontScaling={false} />;
};

export default CustomText;
