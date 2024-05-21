import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  rankListItem: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f2f2f2",
    color: "#383838",
    borderRadius: 10,
    marginVertical: 4,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  headerLeaderboard: {
    color: "#e69b00",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  headerMain: {
    color: "#3693b5",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },
  flexContainerJustifyBetween: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
