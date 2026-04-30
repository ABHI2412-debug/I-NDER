import { google } from 'googleapis';

// Mock function for AI classification and extraction
// In a real scenario, this would use OpenAI API or Google Gemini API
export const processEmailContent = async (subject: string, content: string, sender: string) => {
  console.log(`Analyzing email: ${subject}`);
  
  // Basic heuristic/mock for demonstration
  const lowerContent = (content + ' ' + subject).toLowerCase();
  
  let category = 'General';
  let extractedData: any = {};

  if (lowerContent.includes('assignment') || lowerContent.includes('due') || lowerContent.includes('submission')) {
    category = 'Assignments';
    extractedData = { type: 'assignment' };
    
    // Naive deadline extraction
    const dateMatch = lowerContent.match(/due (by |on )?(\w+ \d{1,2}(th|st|nd|rd)?)/i);
    if (dateMatch) {
      extractedData.deadline = dateMatch[0];
    }
  } else if (lowerContent.includes('intern') || lowerContent.includes('software engineer') || lowerContent.includes('job') || lowerContent.includes('application')) {
    category = 'Jobs';
    extractedData = { 
      type: 'job_opportunity',
      company: sender.split('@')[1]?.split('.')[0] || 'Unknown',
      role: 'Software Intern' // Hardcoded for demo
    };
  } else if (lowerContent.includes('event') || lowerContent.includes('webinar') || lowerContent.includes('talk')) {
    category = 'Events';
    extractedData = { type: 'event' };
  } else if (lowerContent.includes('newsletter') || lowerContent.includes('promotions')) {
    category = 'Promotions';
  }

  return { category, extractedData };
};

export const generateDailySummary = async (emails: any[]) => {
  // Mock AI summary generation
  const jobCount = emails.filter(e => e.category === 'Jobs').length;
  const assignmentCount = emails.filter(e => e.category === 'Assignments').length;
  
  return `You received ${emails.length} emails today. Found ${jobCount} new job opportunities and ${assignmentCount} assignment updates.`;
};
