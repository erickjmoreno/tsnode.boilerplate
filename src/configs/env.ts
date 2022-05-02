import dotenv from 'dotenv';

dotenv.config();

export const token = process.env.DISCORD_TOKEN;
export const prefix = process.env.PREFIX;
export const channelId = process.env.CHANNEL_ID;
export const clientID = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const auctionChannelId = process.env.AUCTION_CHANNEL_ID;
export const serverId = process.env.SERVER_ID;
export const accountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
export const accountPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
export const spreadsheetID = process.env.GOOGLE_SPREADSHEET;
