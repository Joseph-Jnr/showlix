import { useCloseModal } from "@/hooks";
import { useTheme } from "@/theme/ThemeProvider";
import { Apple } from "iconsax-react-nativejs";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomModal from "./CustomModal";

interface CustomInputProps {
  label: string;
  placeholder: string;
  labelColor?: string;
}

const CustomInput = ({ label, placeholder, labelColor }: CustomInputProps) => {
  return (
    <View>
      <Text className="mb-2 text-sm" style={{ color: labelColor }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={[inputStyles.input, { color: labelColor }]}
        placeholderTextColor="#6d748bff"
      />
    </View>
  );
};

interface AuthModalProps {
  modalActive: boolean;
  setModalActive: (active: boolean) => void;
}

const AuthModal = ({ setModalActive, modalActive }: AuthModalProps) => {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);
  const { foreground } = useTheme();

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModal}
      translateY={translateY}
      height={"55%"}
      endLimit={100}
    >
      <>
        {/*  <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={closeModal}
            className="flex-row items-center justify-center"
          >
            <CloseSquare size={38} color={foreground} variant="Bold" />
          </Pressable>
        </View> */}
        <View>
          <Text className="text-[28px] font-bold" style={{ color: foreground }}>
            Sign up to continue
          </Text>
        </View>

        <View className="mt-8">
          <CustomInput
            label="Email"
            placeholder="johndoe@example.com"
            labelColor={foreground}
          />
          <CustomInput
            label="Password"
            placeholder="********"
            labelColor={foreground}
          />

          <View className="flex-col gap-y-4">
            <Pressable
              onPress={() => {}}
              className="flex-row items-center justify-center bg-accent rounded-full h-16 z-50"
            >
              <Text className="text-white font-semibold text-lg">Sign up</Text>
            </Pressable>

            {/* Google button */}
            <Pressable
              onPress={() => {}}
              className="flex-row items-center justify-center gap-x-2 bg-white border border-gray-300 rounded-full h-16 z-50"
            >
              <Apple color="#000" variant="Bold" size={28} />
              <Text className="text-black font-semibold text-lg">
                Continue with Apple
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    </CustomModal>
  );
};

export default AuthModal;

const inputStyles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc57",
    borderRadius: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
