import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  donorList: {
    flex: 1,
    width: '100%',
  },
  donorCard: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff', // Set background color to white
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  donorInfo: {
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  noDonorText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
