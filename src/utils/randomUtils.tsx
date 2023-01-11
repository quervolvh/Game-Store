export const quickRandomNumber = () => (Math.random() + 1).toString(36).substring(7) + String(new Date().getTime());
