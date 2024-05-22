import Ionicons from "@expo/vector-icons/Ionicons";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IUserState } from "@/types";
import { RankBar } from "@/components/leaderboard/RankBar";
import { styles } from "@/styles/common";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function LeaderboardScreen() {
  const userList = useSelector<RootState, IUserState[]>(
    (state) => state.user.allUser
  );
  const sortedUserList =
    userList && [...userList].sort((a, b) => b.score - a.score);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f7f5bc", dark: "#f7f5bc" }}
      headerImage={
        <Ionicons
          size={310}
          name="trophy-outline"
          style={styles.headerLeaderboard}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Leaderboard</ThemedText>
      </ThemedView>
      <ThemedText>Correct more quiz to move up your rank!</ThemedText>
      {userList[0] && (
        <ThemedView>
          {sortedUserList
            .sort((a, b) => b.score - a.score)
            .map((dataItem: IUserState, i) => (
              <RankBar key={i} name={dataItem.name} score={dataItem.score} />
            ))}
        </ThemedView>
      )}

      {!userList[0] && (
        <ThemedView>
          <ThemedText>No player data, back to play a game</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}
