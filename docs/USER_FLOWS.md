# Nya AI — User Flows

---

## 1. Authentication Flow

### Login

```
User visits /
    ↓
Landing page loads (not authenticated)
    ↓
Clicks "Sign In" or "Get Started"
    ↓
Navigates to /login
    ↓
Split-screen login page appears
    ├── Left: Nya branding (dark gradient, watermark, tagline)
    └── Right: Auth form
              ├── "Welcome back" / "Create your account"
              ├── Google OAuth (coming soon modal on click)
              ├── GitHub OAuth (coming soon modal on click)
              ├── "or" divider
              ├── Sign In / Sign Up tab toggle
              ├── Email input
              ├── Password input (with eye toggle)
              └── Submit button
    ↓
User fills credentials
    ↓
POST /auth/login or POST /auth/register
    ↓
On success:
  ├── JWT token stored in localStorage
  ├── Email stored in localStorage
  └── Redirect to / (Dashboard)
    ↓
On error:
  └── Error message displayed above form
```

### Registration

```
Same flow as Login but with "Sign Up" tab active
    ↓
Additional "Name" field shown
    ↓
POST /auth/register
    ↓
Password must be ≥ 6 characters
    ↓
On success: same as login (JWT returned, redirect to /)
```

### Logout

```
User clicks logout button in Sidebar
    ↓
Current conversation synced to localStorage
    ↓
Auth token cleared from memory + localStorage
    ↓
Email cleared from localStorage
    ↓
Messages reset
    ↓
New conversation ID generated
    ↓
Redirect to / (Landing page)
```

---

## 2. Chat Flow

### Starting a Conversation

```
User lands on Dashboard (/) after login
    ↓
Chat interface loads
    ├── Sidebar (left): conversation history, new chat button
    └── Chat area: empty state with suggestion chips
          ├── "Talk with Nya"
          ├── "Upload Documents"
          └── "How it works"
    ↓
User clicks suggestion chip or types in input
    ↓
Message sent to POST /chat
    ↓
Backend retrieves document chunks → RAG → response
    ↓
Assistant response appears in chat
    ↓
Conversation auto-saves to localStorage
```

### Editing a Message

```
User hovers over their message
    ↓
Edit icon appears
    ↓
Click edit → message becomes editable textarea
    ↓
User modifies text → confirms
    ↓
Original message and all subsequent messages replaced
    ↓
New request sent to POST /chat with edited text
    ↓
New assistant response appears
```

### Regenerating a Response

```
User hovers over assistant message
    ↓
Regenerate icon appears
    ↓
Click → last assistant message removed
    ↓
Last user message re-sent to POST /chat
    ↓
New assistant response generated
```

### Uploading a File

```
User clicks attach button in input area
    ↓
File picker opens (accepts txt, md, csv, json, pdf, doc, docx)
    ↓
File selected (< 10MB)
    ↓
Status steps shown in chat:
  1. "Uploading..."
  2. "Extracting text..."
  3. "Creating chunks..."
  4. "Generating embeddings..."
    ↓
POST /upload completes
    ↓
Success: "file.ext indexed successfully (N chunks)"
    ↓
Failure: error message shown
```

---

## 3. Knowledge Management Flow

### Viewing Documents

```
User clicks "Buckets" in sidebar
    ↓
Document list loads from GET /documents
    ↓
Each document shows:
  ├── Filename
  ├── File size
  ├── Upload date
  ├── Status badge (ready/failed)
  └── Action buttons (reindex, delete)
```

### Deleting a Document

```
User clicks delete icon on a document
    ↓
DELETE /documents/{id}
    ↓
Document removed from list
    ↓
Chat RAG will no longer retrieve from this document
```

### Re-indexing a Document

```
User clicks reindex icon on a document
    ↓
POST /documents/{id}/reindex
    ↓
Document re-chunked and re-stored
    ↓
Status badge updates to "ready"
```

---

## 4. Settings Flow

```
User clicks gear icon in Sidebar
    ↓
Settings modal opens (overlay)
    ↓
Three sections:
  ├── Theme (Dark / Light / System)
  │   └── Icon-based toggle with active purple state
  ├── Send messages with Enter
  │   └── Toggle switch (Shift+Enter for new line)
  └── Show suggestions on new chat
      └── Toggle switch
    ↓
Changes persist immediately to localStorage
    ↓
Press Escape or click overlay to close
```

---

## 5. Demo Flow (Unauthenticated)

```
User visits / (not logged in)
    ↓
Landing page loads
    ├── Thin nav with Sign In / Get Started links
    ├── Hero: "What can I help with?" + textarea + send button
    └── Suggestion chips (Talk with Nya, Upload Documents, How it works)
    ↓
User types or clicks a chip
    ↓
Dashboard-like view appears (demo mode)
    ├── Back button, Nya AI Demo header, Get Started CTA
    └── Chat area with messages
    ↓
After 3 user messages:
    └── Limit reached modal:
        ├── "Sign up free" → /login
        └── "Already have an account? Sign in" → /login
    ↓
Input replaced with "Sign up to continue" button
```

---

## 6. Conversation History Flow

```
User clicks a conversation in Sidebar
    ↓
Current conversation synced to localStorage
    ↓
Selected conversation messages loaded from localStorage
    ↓
Messages displayed in Chat
    ↓
User can continue the conversation
    ↓
Changes saved on next sync
```

---

## 7. Public Pages Flow

```
User clicks Privacy / Terms / Contact links
    ↓
Navigates to /privacy, /terms, or /contact
    ↓
Full page with header, content sections, footer
    ↓
"Back to home" link returns to /
```
