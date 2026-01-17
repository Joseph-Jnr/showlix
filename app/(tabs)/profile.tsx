import { useAppTheme } from "@/hooks";
import { useTheme } from "@/theme/ThemeProvider";
import { router } from "expo-router";
import {
  ArrowLeft2,
  ArrowRight2,
  Card,
  FingerScan,
  LogoutCurve,
  Moon,
  NotificationBing,
  Setting2,
  User,
} from "iconsax-react-nativejs";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const links = [
  {
    key: "edit",
    title: "Edit profile",
    icon: User,
    onPress: () => {},
  },
  { key: "payment", title: "Payment methods", icon: Card, onPress: () => {} },
  { key: "biometrics", title: "Biometrics", icon: FingerScan },
  { key: "theme", title: "Dark mode", icon: Moon },
  { key: "settings", title: "Settings", icon: Setting2, onPress: () => {} },
  {
    key: "notifications",
    title: "Notifications",
    icon: NotificationBing,
    onPress: () => {},
  },
];

interface ProfileItemProps {
  title: string;
  icon: any;
  onPress?: () => void;
  theme?: "default" | "logout";
  rightElement?: React.ReactNode;
  hasVerticalPadding?: boolean;
  color?: string;
}

const ProfileItem = ({
  title,
  icon: Icon,
  onPress,
  theme = "default",
  rightElement,
  hasVerticalPadding = true,
  color,
}: ProfileItemProps) => (
  <Pressable
    onPress={onPress}
    style={[
      itemStyles.container,
      { paddingVertical: hasVerticalPadding ? 12 : 0 },
    ]}
  >
    <View style={itemStyles.left}>
      <Icon size={20} color={theme === "default" ? `${color}` : "#e26262ff"} />
      <Text
        style={{
          color: theme === "default" ? `${color}` : "#e26262ff",
          marginLeft: 8,
        }}
      >
        {title}
      </Text>
    </View>
    {rightElement}
  </Pressable>
);

const ProfileHeader = ({ styles }: { styles: any }) => (
  <>
    {/* Header */}
    <View style={styles.header}>
      <Pressable onPress={router.back} style={styles.backButton}>
        <ArrowLeft2 size={20} color={styles.backButtonIcon.color} />
      </Pressable>

      <Text
        className="text-2xl font-medium"
        style={{ color: styles.backButtonIcon.color }}
      >
        Profile
      </Text>
    </View>

    {/* Profile Card */}
    <View
      className="flex-col items-center"
      style={[styles.profileCard, { marginTop: 52 }]}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: "https://josephjnr.vercel.app/assets/portrait-6ba24d40.png",
          }}
          resizeMode="cover"
          style={styles.avatar}
        />
      </View>

      <Text
        style={{ color: styles.backButtonIcon.color }}
        className="text-2xl font-bold mt-5"
      >
        Joseph Jnr
      </Text>
      <Text style={{ color: styles.backButtonIcon.color }}>jojo@gmail.com</Text>
    </View>
  </>
);

const Profile = () => {
  const { isDarkMode, setAppTheme } = useAppTheme();

  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const SCREEN_SECTIONS = [{ type: "profile-actions" }];
  const { background, bgCard, foreground, icon } = useTheme();
  const styles = React.useMemo(
    () => createStyles(bgCard, icon),
    [bgCard, icon],
  );

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <FlatList
        data={SCREEN_SECTIONS}
        keyExtractor={(item) => item.type}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ProfileHeader styles={styles} />}
        renderItem={() => (
          <View style={[styles.profileCard, { marginTop: 24 }]}>
            {links.map((item, index) => (
              <View key={item.key}>
                <ProfileItem
                  title={item.title}
                  icon={item.icon}
                  onPress={item.onPress}
                  color={foreground}
                  rightElement={
                    item.key === "biometrics" ? (
                      <Switch
                        value={biometricsEnabled}
                        onValueChange={setBiometricsEnabled}
                        thumbColor={biometricsEnabled ? "#AB8BFF" : "#A8B5DB"}
                        trackColor={{
                          false: isDarkMode ? "#221F3D" : "#d6d5e1ff",
                          true: isDarkMode ? "#221F3D" : "#d6d5e1ff",
                        }}
                        style={{ height: 20 }}
                      />
                    ) : item.key === "theme" ? (
                      <Switch
                        value={isDarkMode}
                        onValueChange={(value) =>
                          setAppTheme(value ? "dark" : "light")
                        }
                        thumbColor={isDarkMode ? "#AB8BFF" : "#A8B5DB"}
                        trackColor={{
                          false: "#d6d5e1ff",
                          true: "#221F3D",
                        }}
                        style={{ height: 20 }}
                      />
                    ) : (
                      <ArrowRight2 size={18} color={foreground} />
                    )
                  }
                />
                {index < links.length - 1 && <View style={{ height: 16 }} />}
              </View>
            ))}
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.profileCard, { marginTop: 24 }]}>
            <ProfileItem
              title="Logout"
              theme="logout"
              icon={LogoutCurve}
              onPress={() => {}}
              hasVerticalPadding={false}
            />
          </View>
        }
      />
    </View>
  );
};

export default Profile;

const createStyles = (bgCard: string, icon: string) =>
  StyleSheet.create({
    listContent: {
      paddingBottom: 120,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 80,
      paddingHorizontal: 20,
    },
    backButton: {
      position: "absolute",
      left: 20,
      backgroundColor: bgCard,
      padding: 16,
      borderRadius: 50,
    },
    backButtonIcon: {
      color: icon,
    },
    profileCard: {
      backgroundColor: bgCard,
      padding: 20,
      borderRadius: 20,
      marginHorizontal: 20,
    },
    avatarWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      overflow: "hidden",
      alignSelf: "center",
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
  });

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
});
