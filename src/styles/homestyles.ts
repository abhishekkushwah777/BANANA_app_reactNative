import { StyleSheet } from "react-native";

const PURPLE = '#845DCC';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo:{
    marginLeft: -25,
    marginBottom: -10,
    width: '50%',
    height: '50%',
    transform: [{scale: 2}],
  },
  header: {
    height: "20%",
    backgroundColor: PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    marginTop: 'auto',
    paddingBottom: 25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 30,
  },
  listContainer: {
    flex: 1,
  },
  bottomBar: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 4,
  },
});