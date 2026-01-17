import { icons } from "@/constants/icons";
import { router } from "expo-router";
import {
  ArrowRight2,
  Card,
  FingerScan,
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
    onPress: () => router.push("/"),
  },
  { key: "payment", title: "Payment methods", icon: Card, onPress: () => {} },
  { key: "biometrics", title: "Biometrics", icon: FingerScan },
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
  rightElement?: React.ReactNode;
}

const ProfileItem = ({
  title,
  icon: Icon,
  onPress,
  rightElement,
}: ProfileItemProps) => (
  <Pressable onPress={onPress} style={itemStyles.container}>
    <View style={itemStyles.left}>
      <Icon size={20} color="#A8B5DB" />
      <Text className="text-light-200 ml-3">{title}</Text>
    </View>
    {rightElement}
  </Pressable>
);

const ProfileHeader = () => (
  <>
    {/* Header */}
    <View style={styles.header}>
      <Pressable onPress={router.back} style={styles.backButton}>
        <Image
          source={icons.arrow}
          className="size-5 rotate-180"
          tintColor="#fff"
        />
      </Pressable>

      <Text className="text-light-200 text-2xl">Profile</Text>
    </View>

    {/* Profile Card */}
    <View
      className="flex-col items-center"
      style={[styles.profileCard, { marginTop: 24 }]}
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

      <Text className="text-light-200 text-2xl font-bold mt-5">Joseph Jnr</Text>
      <Text className="text-light-200">jojo@gmail.com</Text>
    </View>
  </>
);

const Profile = () => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const SCREEN_SECTIONS = [{ type: "profile-actions" }];

  return (
    <View className="bg-primary flex-1">
      <FlatList
        data={SCREEN_SECTIONS}
        keyExtractor={(item) => item.type}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ProfileHeader />}
        renderItem={() => (
          <View style={[styles.profileCard, { marginTop: 24 }]}>
            {links.map((item, index) => (
              <View key={item.key}>
                <ProfileItem
                  title={item.title}
                  icon={item.icon}
                  onPress={item.onPress}
                  rightElement={
                    item.key === "biometrics" ? (
                      <Switch
                        value={biometricsEnabled}
                        onValueChange={setBiometricsEnabled}
                        thumbColor={biometricsEnabled ? "#AB8BFF" : "#A8B5DB"}
                        trackColor={{ false: "#221F3D", true: "#221F3D" }}
                        style={{ height: 20 }}
                      />
                    ) : (
                      <ArrowRight2 size={20} color="#A8B5DB" />
                    )
                  }
                />
                {index < links.length - 1 && <View style={{ height: 32 }} />}
              </View>
            ))}
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.profileCard, { marginTop: 24 }]}>
            <Pressable>
              <Text className="text-red-300">Logout</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
    backgroundColor: "#0f0d23",
    padding: 16,
    borderRadius: 50,
  },
  profileCard: {
    backgroundColor: "#0f0d23",
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
