import { useTheme } from "@/theme/ThemeProvider";
import { ReactElement } from "react";
import {
  Modal,
  Pressable,
  RegisteredStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, withTiming } from "react-native-reanimated";

interface CustomModalProps {
  modalActive: boolean;
  closeModal: () => void;
  translateY: SharedValue<number>;
  height?: string | number;
  endLimit?: number;
  children?: ReactElement;
}

const CustomModal = ({
  modalActive,
  closeModal,
  translateY,
  children,
  height = "92%",
  endLimit = 250,
}: CustomModalProps) => {
  const { background } = useTheme();
  const pan = Gesture.Pan();

  const gesture = pan
    .runOnJS(true)
    .onBegin((e) => {})
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > endLimit) {
        closeModal();
      } else translateY.value = withTiming(0);
    });

  return (
    <Modal visible={modalActive} transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.overlay2}>
          <Pressable style={{ flex: 1 }} onPress={closeModal}>
            <View style={{ flex: 1 }}></View>
          </Pressable>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                styles.modal,
                { backgroundColor: background },
                { transform: [{ translateY }] },
                { height: height as RegisteredStyle<ViewStyle> },
              ]}
            >
              {children}
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(25, 23, 23, 0.63)",
  },
  overlay2: {
    flex: 1,
    justifyContent: "space-between",
  },
  modal: {
    zIndex: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 16,
  },
});

export default CustomModal;
