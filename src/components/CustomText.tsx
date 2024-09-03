import React from "react";
import { Text } from "react-native-paper";

type Props = React.ComponentProps<typeof Text>;

// Prevent excessively large font sizes from breaking the design
const CustomText: React.FC<Props> = (props) => {
  return <Text {...props} allowFontScaling={false} />;
};

export default CustomText;
