import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StoryScreen: React.FC = ({ navigation }: any) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stories = [
    {
      id: 1,
      title: 'Summer Vacation',
      date: '2024-01-15',
      imageCount: 12,
      coverImage: null,
      category: 'travel',
    },
    {
      id: 2,
      title: 'City Adventure',
      date: '2024-01-10',
      imageCount: 8,
      coverImage: null,
      category: 'urban',
    },
    {
      id: 3,
      title: 'Nature Walk',
      date: '2024-01-05',
      imageCount: 15,
      coverImage: null,
      category: 'nature',
    },
    {
      id: 4,
      title: 'Family Dinner',
      date: '2024-01-01',
      imageCount: 6,
      coverImage: null,
      category: 'family',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Stories' },
    { id: 'travel', label: 'Travel' },
    { id: 'family', label: 'Family' },
    { id: 'nature', label: 'Nature' },
    { id: 'urban', label: 'Urban' },
  ];

  const filteredStories = selectedFilter === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedFilter);

  const renderStoryCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.storyCard}>
      <View style={styles.storyImageContainer}>
        <View style={styles.storyImagePlaceholder}>
          <Ionicons name="images-outline" size={32} color="#6366f1" />
        </View>
        <View style={styles.storyOverlay}>
          <Text style={styles.storyCount}>{item.imageCount} photos</Text>
        </View>
      </View>
      <View style={styles.storyInfo}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <Text style={styles.storyDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.storyMenu}>
        <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stories</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stories Grid */}
      <FlatList
        data={filteredStories}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.storiesGrid}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('StoryEditor')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
  searchButton: {
    padding: 8,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterTabActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  storiesGrid: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  storyCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  storyImageContainer: {
    position: 'relative',
    height: 120,
  },
  storyImagePlaceholder: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  storyCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  storyDate: {
    fontSize: 12,
    color: '#64748b',
  },
  storyMenu: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default StoryScreen; 