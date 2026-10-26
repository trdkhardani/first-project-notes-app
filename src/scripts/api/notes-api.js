// class NotesApi {
//   constructor() {

//   }
// }

import $ from 'jquery';
import toastr from 'toastr';

const apiBaseUrl = "https://notes-api.dicoding.dev/v2";

export async function getActiveNotes() {
  const response = await fetch(`${apiBaseUrl}/notes`);

  if (!response.ok) {
    throw new Error("Error fetching active notes.");
  }

  return await response.json();
}

export async function createNewNote(title, body) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    // if (!response.ok) {
    //   throw new Error("Error creating note.");
    // }

    return await response.json();
  } catch (err) {
    throw new Error(err);
  } finally {
    toastr.clear();
  }
}

export async function deleteNote(noteId) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    throw new Error(err);
  } finally {
    toastr.clear();
  }
}
