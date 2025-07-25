import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

function buildCacheKey(filters: Record<string, any>): string {
  const parts = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `wanted:${parts || 'all'}`;
}
export { buildCacheKey };

export const generateUserId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};
export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
