let sessions = {}


export const addMessage = (sessionId, role, content) => {
    if(!sessions[sessionId]) sessions[sessionId] = [];

    sessions[sessionId].push({role, content})
}

export const getMessages = (sessionId) => {
    return sessions[sessionId] || []
}

