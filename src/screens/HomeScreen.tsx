import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const recentStories = [
    { id: 1, title: 'Summer Vacation', date: '2024-01-15', imageCount: 12 },
    { id: 2, title: 'City Adventure', date: '2024-01-10', imageCount: 8 },
    { id: 3, title: 'Nature Walk', date: '2024-01-05', imageCount: 15 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Photo Story</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeTitle}>Create Your Story</Text>
          <Text style={styles.welcomeSubtitle}>
            Capture moments and turn them into beautiful stories
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.createButtonText}>New Story</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Recent Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Stories</Text>
          {recentStories.map((story) => (
            <TouchableOpacity key={story.id} style={styles.storyCard}>
              <View style={styles.storyImageContainer}>
                <View style={styles.storyImagePlaceholder}>
                  <Ionicons name="images-outline" size={32} color="#6366f1" />
                </View>
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyDate}>{story.date}</Text>
                <Text style={styles.storyCount}>{story.imageCount} photos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="camera" size={32} color="#6366f1" />
              <Text style={styles.actionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="images" size={32} color="#6366f1" />
              <Text style={styles.actionText}>Choose Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="share" size={32} color="#6366f1" />
              <Text style={styles.actionText}>Share Story</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  notificationButton: {
    padding: 8,
  },
  welcomeCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  storyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  storyImageContainer: {
    marginRight: 15,
  },
  storyImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  storyDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  storyCount: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center',
  },
});

export default HomeScreen; 