const apiBaseUrl = "https://notes-api.dicoding.dev/v2";
// const apiBaseUrl = "http://localhost:5000";

export async function getActiveNotes() {
  const response = await fetch(`${apiBaseUrl}/notes`);

  if (!response.ok) {
    throw new Error("Error fetching archived notes.");
  }

  return await response.json();
}

export async function getArchivedNotes() {
  const response = await fetch(`${apiBaseUrl}/notes/archived`);

  if (!response.ok) {
    throw new Error("Error fetching active notes.");
  }

  return await response.json();
}

export async function archiveNote(noteId) {
  const response = await fetch(`${apiBaseUrl}/notes/${noteId}/archive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error archiving note.";
  }

  return await response.json();
}

export async function unarchiveNote(noteId) {
  const response = await fetch(`${apiBaseUrl}/notes/${noteId}/unarchive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error archiving note.";
  }

  return await response.json();
}

export async function createNewNote(title, body) {
  const response = await fetch(`${apiBaseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  });

  if (!response.ok) {
    throw "Error saving note.";
  }

  return await response.json();
}

export async function deleteNote(noteId) {
  const response = await fetch(`${apiBaseUrl}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error deleting note.";
  }

  return await response.json();
}
