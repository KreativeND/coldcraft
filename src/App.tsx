import React, { useState, useMemo } from 'react';
import { Copy, ChevronDown, Search, X } from 'lucide-react';
import templateData from './data/templates.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState<{ id: string; type: 'subject' | 'body' } | null>(null);

  const copyToClipboard = (text: string, templateId: string, type: 'subject' | 'body') => {
    navigator.clipboard.writeText(text);
    setCopied({ id: templateId, type });
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredTemplates = useMemo(() => {
    const allTemplates = templateData.categories.flatMap(category => 
      category.templates.map(template => ({
        ...template,
        category: category.title,
        categoryId: category.id
      }))
    );

    return allTemplates.filter(template => {
      const matchesSearch = searchQuery.toLowerCase() === '' || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.subject && template.subject.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(template.categoryId);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-12 sm:py-16 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">ColdCraft</h1>
          <p className="mt-4 text-lg text-white/60">Professional templates for every situation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Search and Filter Bar */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-0 sm:flex sm:gap-4 items-start">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 group-hover:text-white pointer-events-none" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-black hover:bg-black focus:bg-black placeholder:text-black/50 hover:placeholder:text-white/50 focus:placeholder:text-white/50 [&:hover]:text-white [&:focus]:text-white focus:outline-none"
            />
          </div>
          
          <div className="relative w-full sm:w-64 shrink-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-6 py-4 border-2 border-black hover:bg-black [&:hover]:text-white flex items-center justify-between"
            >
              <span className="font-medium">
                {selectedCategories.length === 0 
                  ? 'All Categories' 
                  : `${selectedCategories.length} Selected`}
              </span>
              <ChevronDown size={16} className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black animate-fade-in">
                {templateData.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      );
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-black [&:hover]:text-white flex items-center justify-between border-b border-black/10 last:border-b-0"
                  >
                    <span>{category.title}</span>
                    {selectedCategories.includes(category.id) && (
                      <X size={14} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Categories */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
            {selectedCategories.map((categoryId) => {
              const category = templateData.categories.find(c => c.id === categoryId);
              return (
                <button
                  key={categoryId}
                  onClick={() => setSelectedCategories(prev => prev.filter(id => id !== categoryId))}
                  className="px-4 py-2 bg-black text-white hover:bg-white [&:hover]:text-black border-2 border-black flex items-center gap-2"
                >
                  {category?.title}
                  <X size={14} />
                </button>
              );
            })}
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className="template-card border-2 border-black bg-white p-6 sm:p-8"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="mb-6 pb-4 border-b-2 border-black/10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-1">{template.title}</h3>
                <span className="text-black/60">{template.category}</span>
              </div>
              
              {template.subject && (
                <div className="mb-6 pb-6 border-b-2 border-black/10 group">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-black/60">Subject</label>
                    <button
                      onClick={() => copyToClipboard(template.subject, template.id, 'subject')}
                      className="invisible group-hover:visible bg-black text-white p-2 hover:bg-white hover:text-black border-2 border-black"
                      title="Copy subject"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-sm py-2">{template.subject}</p>
                </div>
              )}

              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-black/60">Message</label>
                  <button
                    onClick={() => copyToClipboard(template.body, template.id, 'body')}
                    className="invisible group-hover:visible bg-black text-white p-2 hover:bg-white hover:text-black border-2 border-black"
                    title="Copy message"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <pre className="text-sm whitespace-pre-wrap font-sans">{template.body}</pre>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 border-2 border-black animate-fade-in">
            <p className="text-black/60">No templates found matching your search criteria</p>
          </div>
        )}

        {/* Copy Notification */}
        {copied && (
          <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 border-2 border-black animate-fade-in">
            Copied to clipboard
          </div>
        )}
      </main>
    </div>
  );
}

export default App;