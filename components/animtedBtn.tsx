import { Color } from "@/constants/Colors";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type btnProp = {
    children?: React.ReactNode;
    onPress?: () => void;
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const AnimatedBtn = ({children, onPress, onLongPress, style}:btnProp) => {
    const change = useSharedValue(0);
    const anim = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                change.value,
                [0, 1],
                [Color.secondary, Color.selected]
            ),
            borderColor: interpolateColor(
                change.value,
                [0, 1],
                [Color.border, Color.borderSelected]
            )
        };
    });

    return (
        <Pressable
            onPressIn={() => {
                change.value = withTiming(1, {duration: 80});
            }}
            onPressOut={() => {
                change.value = withTiming(0, {duration: 80});
            }}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Animated.View style={[style, anim]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}

export const AddBtn = ({children, onPress, onLongPress, style}:btnProp) => {
    const change = useSharedValue(0);
    const anim = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                change.value,
                [0, 1],
                [Color.accent, Color.link]
            ),
        };
    });

    return (
        <Pressable
            onPressIn={() => {
                change.value = withTiming(1, {duration: 50});
            }}
            onPressOut={() => {
                change.value = withTiming(0, {duration: 50});
            }}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Animated.View style={[style, anim]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}
