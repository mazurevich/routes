import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function Post() {
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Post" }} />
      <View className="h-full w-full p-4">
        <Text className="text-primary py-2 text-3xl font-bold">
          This screen is no longer used
        </Text>
        <Text className="text-foreground py-4">
          The default post boilerplate has been removed from the app.
        </Text>
      </View>
    </SafeAreaView>
  );
}
