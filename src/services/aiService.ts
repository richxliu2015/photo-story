import axios from 'axios';

// Note: In production, you should use environment variables for API keys
const OPENAI_API_KEY = 'your-openai-api-key'; // Replace with your actual API key
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface StoryContext {
  photos: string[];
  title?: string;
  category?: string;
  date?: string;
  location?: string;
}

export interface GeneratedStory {
  title: string;
  content: string;
  wordCount: number;
  tags: string[];
}

class AIService {
  private async makeOpenAIRequest(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a creative storyteller who writes engaging, personal stories based on photo collections. Keep stories under 200 words, warm, and personal.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate story');
    }
  }

  public async generateStory(context: StoryContext): Promise<GeneratedStory> {
    try {
      // Create a prompt based on the context
      const prompt = this.createPrompt(context);
      
      // For demo purposes, we'll use a mock response if no API key is provided
      if (OPENAI_API_KEY === 'your-openai-api-key') {
        return this.generateMockStory(context);
      }

      const generatedContent = await this.makeOpenAIRequest(prompt);
      
      return this.parseGeneratedContent(generatedContent, context);
    } catch (error) {
      console.error('Story generation error:', error);
      return this.generateMockStory(context);
    }
  }

  private createPrompt(context: StoryContext): string {
    const { photos, title, category, date, location } = context;
    
    let prompt = `Create a personal, engaging story based on this photo collection:\n\n`;
    
    if (title) prompt += `Title: ${title}\n`;
    if (category) prompt += `Category: ${category}\n`;
    if (date) prompt += `Date: ${date}\n`;
    if (location) prompt += `Location: ${location}\n`;
    
    prompt += `Number of photos: ${photos.length}\n\n`;
    prompt += `Please write a warm, personal story (under 200 words) that captures the essence of these moments. Make it feel like a personal memory being shared with friends. Include emotional details and vivid descriptions.`;
    
    return prompt;
  }

  private generateMockStory(context: StoryContext): GeneratedStory {
    const { title, category, photos } = context;
    
    const mockStories = {
      travel: {
        title: title || 'Adventure Awaits',
        content: `Every journey begins with a single step, and this collection captures the magic of exploration. From breathtaking landscapes to hidden gems discovered along the way, each photo tells a story of discovery and wonder. The laughter shared, the challenges overcome, and the memories created - these are the moments that make travel truly special. Whether it was the unexpected detour that led to the most beautiful sunset or the local cafe where we found the best coffee, every experience added another chapter to our adventure. These photos are more than just images; they're windows into moments of pure joy and discovery.`,
        tags: ['travel', 'adventure', 'exploration', 'memories']
      },
      family: {
        title: title || 'Family Moments',
        content: `Family is where life begins and love never ends. These photos capture the everyday moments that make our family unique - the Sunday morning breakfasts, the impromptu dance parties in the living room, and the quiet moments of togetherness. From the youngest member's first steps to the oldest sharing wisdom, every moment is precious. These images remind us that family isn't just an important thing, it's everything. The love, laughter, and sometimes tears that we share create the foundation of our lives.`,
        tags: ['family', 'love', 'togetherness', 'memories']
      },
             nature: {
         title: title || 'Nature\'s Beauty',
        content: `Nature has a way of speaking to the soul, and these photos capture the raw beauty of the world around us. From the delicate petals of a flower to the majestic mountains reaching for the sky, each image tells a story of Earth's incredible diversity. The changing seasons, the play of light and shadow, and the intricate details often overlooked - these are the moments that remind us of our connection to the natural world. Every photo is a reminder to pause, breathe, and appreciate the beauty that surrounds us.`,
        tags: ['nature', 'beauty', 'outdoors', 'peace']
      },
      urban: {
        title: title || 'City Life',
        content: `The city never sleeps, and neither does its energy. These photos capture the pulse of urban life - the street art that tells stories, the architecture that reaches for the clouds, and the people who make the city come alive. From the quiet moments in a neighborhood cafe to the bustling energy of downtown, every corner holds a story waiting to be discovered. The city is a canvas of human creativity and resilience, where every street, building, and person contributes to the symphony of urban life.`,
        tags: ['urban', 'city', 'architecture', 'culture']
      }
    };

    const storyType = category || 'travel';
    const story = mockStories[storyType as keyof typeof mockStories] || mockStories.travel;
    
    return {
      ...story,
      wordCount: story.content.split(' ').length
    };
  }

  private parseGeneratedContent(content: string, context: StoryContext): GeneratedStory {
    // Simple parsing - in a real app, you'd want more sophisticated parsing
    const lines = content.split('\n');
    const title = context.title || 'My Story';
    const wordCount = content.split(' ').length;
    
    return {
      title,
      content: content.trim(),
      wordCount,
      tags: this.extractTags(content, context.category)
    };
  }

  private extractTags(content: string, category?: string): string[] {
    const baseTags = category ? [category] : ['story'];
    const commonWords = content.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = [...new Set(commonWords)].slice(0, 3);
    
    return [...baseTags, ...uniqueWords];
  }
}

export default new AIService(); 