import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AIService, { StoryContext, GeneratedStory } from '../services/aiService';

interface StoryEditorScreenProps {
  navigation: any;
  route: any;
}

const StoryEditorScreen: React.FC<StoryEditorScreenProps> = ({ navigation, route }) => {
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('travel');
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    { id: 'travel', label: 'Travel', icon: 'airplane' },
    { id: 'family', label: 'Family', icon: 'people' },
    { id: 'nature', label: 'Nature', icon: 'leaf' },
    { id: 'urban', label: 'Urban', icon: 'business' },
  ];

  const mockPhotos = ['photo1', 'photo2', 'photo3']; // In real app, these would be actual photo URIs

  useEffect(() => {
    // Auto-generate story when screen loads
    generateStory();
  }, []);

  const generateStory = async () => {
    setIsGenerating(true);
    try {
      const context: StoryContext = {
        photos: mockPhotos,
        title: title || 'My Story',
        category,
        date: new Date().toISOString().split('T')[0],
      };

      const generatedStory = await AIService.generateStory(context);
      setStory(generatedStory);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateStory = () => {
    generateStory();
  };

  const saveStory = () => {
    if (story) {
      Alert.alert('Success', 'Story saved successfully!');
      navigation.goBack();
    }
  };

  const shareStory = () => {
    Alert.alert('Share', 'Story sharing feature coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Story Editor</Text>
          <TouchableOpacity onPress={saveStory}>
            <Ionicons name="checkmark" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Story Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Details</Text>
          
          <TextInput
            style={styles.titleInput}
            placeholder="Enter story title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && styles.categoryButtonActive
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Ionicons 
                  name={cat.icon as any} 
                  size={16} 
                  color={category === cat.id ? '#fff' : '#6366f1'} 
                />
                <Text style={[
                  styles.categoryText,
                  category === cat.id && styles.categoryTextActive
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Generation */}
        <View style={styles.section}>
          <View style={styles.aiHeader}>
            <Text style={styles.sectionTitle}>AI Story Generation</Text>
            <TouchableOpacity 
              style={styles.regenerateButton}
              onPress={regenerateStory}
              disabled={isGenerating}
            >
              <Ionicons name="refresh" size={16} color="#6366f1" />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>

          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={styles.loadingText}>Generating your story...</Text>
            </View>
          ) : story ? (
            <View style={styles.storyContainer}>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyContent}>{story.content}</Text>
              
              <View style={styles.storyMeta}>
                <Text style={styles.wordCount}>{story.wordCount} words</Text>
                <View style={styles.tagsContainer}>
                  {story.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : null}
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={shareStory}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.actionGradient}
            >
              <Ionicons name="share-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Share Story</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(!isEditing)}>
            <View style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#6366f1" />
              <Text style={styles.editButtonText}>Edit Story</Text>
            </View>
          </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  titleInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryText: {
    fontSize: 14,
    color: '#6366f1',
    marginLeft: 4,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  regenerateText: {
    fontSize: 12,
    color: '#6366f1',
    marginLeft: 4,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  storyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  storyContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordCount: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  actionButton: {
    marginBottom: 12,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  editButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StoryEditorScreen; 