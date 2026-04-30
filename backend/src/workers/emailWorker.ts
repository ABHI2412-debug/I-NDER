import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import Email from '../models/Email';
import { processEmailContent } from '../services/ai';

const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null
});

export const emailWorker = new Worker('emailProcessing', async (job: Job) => {
  console.log(`Processing job ${job.id} for user ${job.data.userId}`);
  
  const emails = job.data.emails;
  
  for (const emailData of emails) {
    try {
      // 1. Analyze with AI
      const { category, extractedData } = await processEmailContent(
        emailData.subject, 
        emailData.content, 
        emailData.sender
      );
      
      // 2. Save to DB
      await Email.findOneAndUpdate(
        { gmailId: emailData.gmailId },
        {
          userId: job.data.userId,
          ...emailData,
          category,
          extractedData,
          isProcessed: true
        },
        { upsert: true, new: true }
      );
      
      console.log(`Processed email: ${emailData.subject} -> [${category}]`);
    } catch (err) {
      console.error(`Error processing email ${emailData.gmailId}:`, err);
    }
  }
  
  return { success: true, processedCount: emails.length };
}, { connection: redisConnection });

emailWorker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} has failed with ${err.message}`);
});
