const sessions = {};

export function saveSession(sessionId, data) {
  sessions[sessionId] = data;
}

export function getSession(sessionId) {
  return sessions[sessionId];
}