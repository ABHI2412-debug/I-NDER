import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const fetchRecentEmails = async (accessToken: string, refreshToken: string, maxResults = 20) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: maxResults,
      q: 'is:unread' // Only fetch unread emails
    });

    const messages = response.data.messages || [];
    const emailDetails = [];

    for (const msg of messages) {
      if (msg.id) {
        const fullMsg = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full'
        });
        
        const payload = fullMsg.data.payload;
        const headers = payload?.headers;
        
        const subject = headers?.find(h => h.name === 'Subject')?.value || 'No Subject';
        const sender = headers?.find(h => h.name === 'From')?.value || 'Unknown Sender';
        const snippet = fullMsg.data.snippet || '';
        
        // Basic body decoding
        let body = '';
        if (payload?.parts) {
          const textPart = payload.parts.find(part => part.mimeType === 'text/plain');
          if (textPart && textPart.body?.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
          }
        } else if (payload?.body?.data) {
          body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
        }

        emailDetails.push({
          gmailId: msg.id,
          subject,
          sender,
          snippet,
          content: body,
          dateReceived: new Date(Number(fullMsg.data.internalDate))
        });
      }
    }

    return emailDetails;

  } catch (error) {
    console.error('Error fetching emails from Gmail:', error);
    throw error;
  }
};
