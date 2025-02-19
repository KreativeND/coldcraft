// Templates data
const templates = [
  {
    "id": "job-referral-1",
    "title": "Referral Request for [Job Title] at [Company Name]",
    "subject": "Referral Request: [Job Title] Role at [Company Name]",
    "body": "Hi [Name],\n\nI hope you're doing well! I'm reaching out because I noticed the [Job Title] position at [Company Name] and it seems like a perfect match for my background in [mention specific skills/experience]. I'm very interested in this role and would appreciate any guidance or referral you could provide.\n\nThank you for your time!\n\nBest regards,\n[Your Name]"
  },
  // ... Add all other templates from your data/templates.json here
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const templatesContainer = document.getElementById('templates-container');

// State
let searchQuery = '';

// Functions
function filterTemplates(query) {
  return templates.filter(template => 
    template.title.toLowerCase().includes(query.toLowerCase()) ||
    template.subject.toLowerCase().includes(query.toLowerCase()) ||
    template.body.toLowerCase().includes(query.toLowerCase())
  );
}

function showCopyNotification() {
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.textContent = 'Copied to clipboard';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopyNotification();
  });
}

function renderTemplates(filteredTemplates) {
  templatesContainer.innerHTML = '';

  if (filteredTemplates.length === 0) {
    templatesContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: rgba(0,0,0,0.6);">
        No templates found matching your search
      </div>
    `;
    return;
  }

  filteredTemplates.forEach(template => {
    const templateCard = document.createElement('div');
    templateCard.className = 'template-card';
    templateCard.innerHTML = `
      <div class="template-title">${template.title}</div>
      <div class="template-subject">
        ${template.subject}
        <button class="copy-button" onclick="copyToClipboard('${template.subject.replace(/'/g, "\\'")}')">
          Copy Subject
        </button>
      </div>
      <div class="template-body">
        ${template.body}
        <button class="copy-button" onclick="copyToClipboard('${template.body.replace(/'/g, "\\'")}')">
          Copy Message
        </button>
      </div>
    `;
    templatesContainer.appendChild(templateCard);
  });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderTemplates(filterTemplates(searchQuery));
});

// Initial render
renderTemplates(templates);