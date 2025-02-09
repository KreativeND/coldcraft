import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Copy, ChevronDown, Search, X, ArrowUp } from 'lucide-react';
import templateData from './data/templates.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState<{
    id: string;
    type: 'subject' | 'body';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (
    text: string,
    templateId: string,
    type: 'subject' | 'body'
  ) => {
    navigator.clipboard.writeText(text);
    setCopied({ id: templateId, type });
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredTemplates = useMemo(() => {
    const allTemplates = templateData.categories.flatMap((category) =>
      category.templates.map((template) => ({
        ...template,
        category: category.title,
        categoryId: category.id,
      }))
    );

    return allTemplates.filter((template) => {
      const matchesSearch =
        searchQuery.toLowerCase() === '' ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.subject &&
          template.subject.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(template.categoryId);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const SkeletonTemplate = () => (
    <div className="template-card border-2 border-black bg-white p-6 sm:p-8 animate-pulse">
      <div className="mb-6 pb-4 border-b-2 border-black/10">
        <div className="h-8 bg-black/10 rounded mb-1 w-3/4"></div>
        <div className="h-4 bg-black/10 rounded w-1/4"></div>
      </div>
      <div className="mb-6 pb-6 border-b-2 border-black/10">
        <div className="h-4 bg-black/10 rounded w-1/6 mb-4"></div>
        <div className="h-4 bg-black/10 rounded w-2/3"></div>
      </div>
      <div>
        <div className="h-4 bg-black/10 rounded w-1/6 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded w-full"></div>
          <div className="h-4 bg-black/10 rounded w-5/6"></div>
          <div className="h-4 bg-black/10 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-12 sm:py-16 xl:pl-12 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col items-start">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              ColdCraft
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl">
              Professional templates for every situation
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Search and Filter Bar */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-0 sm:flex sm:gap-4 items-start">
          <div className="relative flex-grow group">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 group-hover:text-white pointer-events-none"
              size={20}
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-black hover:bg-black focus:bg-black placeholder:text-black/50 hover:placeholder:text-white/50 focus:placeholder:text-white/50 [&:hover]:text-white [&:focus]:text-white focus:outline-none"
            />
          </div>

          <div className="relative w-full sm:w-64 shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-6 py-4 border-2 border-black hover:bg-black [&:hover]:text-white flex items-center justify-between"
            >
              <span className="font-medium">
                {selectedCategories.length === 0
                  ? 'All Categories'
                  : `${selectedCategories.length} Selected`}
              </span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-black animate-fade-in">
                {templateData.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(category.id)
                          ? prev.filter((id) => id !== category.id)
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
              const category = templateData.categories.find(
                (c) => c.id === categoryId
              );
              return (
                <button
                  key={categoryId}
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((id) => id !== categoryId)
                    )
                  }
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
          {isLoading ? (
            <>
              <SkeletonTemplate />
              <SkeletonTemplate />
              <SkeletonTemplate />
              <SkeletonTemplate />
            </>
          ) : (
            filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className="template-card border-2 border-black bg-white p-6 sm:p-8"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="mb-6 pb-4 border-b-2 border-black/10">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1">
                    {template.title}
                  </h3>
                  <span className="text-black/60">{template.category}</span>
                </div>

                {template.subject && (
                  <div className="mb-6 pb-6 border-b-2 border-black/10 group">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-black/60">
                        Subject
                      </label>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            template.subject,
                            template.id,
                            'subject'
                          )
                        }
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
                    <label className="text-sm font-medium text-black/60">
                      Message
                    </label>
                    <button
                      onClick={() =>
                        copyToClipboard(template.body, template.id, 'body')
                      }
                      className="invisible group-hover:visible bg-black text-white p-2 hover:bg-white hover:text-black border-2 border-black"
                      title="Copy message"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {template.body}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && filteredTemplates.length === 0 && (
          <div className="text-center py-16 border-2 border-black animate-fade-in">
            <p className="text-black/60">
              No templates found matching your search criteria
            </p>
          </div>
        )}

        {/* Copy Notification */}
        {copied && (
          <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 border-2 border-black animate-fade-in">
            Copied to clipboard
          </div>
        )}

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-10 p-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-300 transform ${
            showScrollTop
              ? 'translate-y-0 opacity-100'
              : 'translate-y-16 opacity-0'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </main>
    </div>
  );
}

export default App;
