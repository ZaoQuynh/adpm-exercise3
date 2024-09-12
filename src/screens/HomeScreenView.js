import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreenView() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchBar} 
                    placeholder="Search..." 
                    placeholderTextColor="gray"
                />
                <TouchableOpacity>
                    <MaterialIcon name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.songList}>
                <View style={styles.songItem}>
                    <Text style={styles.songTitle}>End of era</Text>
                    <Text style={styles.songArtist}>Dua Lipa</Text>
                    <TouchableOpacity>
                        <MaterialIcon name="play-arrow" size={24} color="green" />
                    </TouchableOpacity>
                </View>

                <View style={styles.songItem}>
                    <Text style={styles.songTitle}>From The Start</Text>
                    <Text style={styles.songArtist}>Laufey</Text>
                    <TouchableOpacity>
                        <MaterialIcon name="play-arrow" size={24} color="green" />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.playerContainer}>
                <Text style={styles.nowPlaying}>Đang phát: End of era - Dua Lipa</Text>
                <View style={styles.playerControls}>
                    <TouchableOpacity>
                        <MaterialIcon name="skip-previous" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcon name="pause" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcon name="skip-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  searchBar: {
    flex: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
    marginRight: 10,
    padding: 8,
  },
  songList: {
    padding: 10,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
  playerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: '#fff',
  },
  nowPlaying: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
