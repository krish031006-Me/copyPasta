import { X, Sparkles, Plus } from "lucide-react";
import { useState } from "react";
import  api from "../api"
import { ACCESS_TOKEN } from "../constants";

const PLACEHOLDER_TAGS = []; // We need to change these with the tags from API calls

const QuickAddSnippetModal = ({ open, onClose, setIsOpen}) => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(PLACEHOLDER_TAGS);
  const [isAutoTagging, setIsAutoTagging] = useState(false); 

  const addTag = (newTag) => {
    const trimmed = String(newTag ?? "").trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) { // add only non-empty, unique tags
        setTags((prevTags) => {
            return [...prevTags, trimmed]
        })
        setTagInput("")
    }
  };

  const removeTag = (tag) => {
    if (tags.includes(tag)){
        setTags((prevTags) => {
            return prevTags.filter((prev) => prev !== tag); // Only including the ones that are not tag itself
        })
    }
  };

  const handleAutoTag = () => {
    // TODO: Implement logic to fetch or simulate AI-generated tags and append them
  };

  const handleKeyDown = (e) => {
    if(e.key == "Enter"){
        e.preventDefault();
        addTag(tagInput);
    }
  };

  const handleSaveSnippet = async () => {

    // Creating the snippet
    const badges = []
    tags.forEach((tag) => {
      const obj = {badge: tag}

      badges.push(obj)
    })
    const Snippet = {
        title: heading,
        code: content,
        additional: notes,
        badges: badges
    }

    // Sending the request
    try{
      const res = await api.post("api/snippets/", Snippet)
      if(res.status == 200 || res.status==201){
        alert("Snippet Created.")
        setIsOpen(false) // updating the state to close the modal 
      }
    }catch(err) {
        console.log(err); 
    } 
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/50 backdrop-blur-sm"
      onClick={onClose}
    > 
      <div
        className="relative w-full max-w-2xl mx-4 bg-card rounded-xl shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Add your Code
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Paste code or text and organize it instantly.
            </p>
          </div>
          <button
            onClick={onClose} 
            className="p-1.5 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value)
              }}
              placeholder="Title"
              maxLength={80}
              className="w-full px-3 py-2 text-sm bg-card text-foreground border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
              placeholder={`Add your content`} 
              rows={8}
              className="w-full px-4 py-3 text-sm font-mono bg-code-bg text-foreground border border-input rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Additional Notes{""} 
              <span className="text-muted-foreground font-normal"> (Optional)</span> 
            </label>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
              }}
              placeholder="Any context or reminders about this snippet..."
              rows={2}
              className="w-full px-3 py-2 text-sm bg-card text-foreground border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tags
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value)
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag..."
                  className="w-full px-3 py-2 text-sm bg-card text-foreground border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all pr-9"
                /> 
                <button
                  onClick={() => addTag(tagInput)}
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                > 
                  <Plus size={16} /> 
                </button>
              </div>
              <button
                onClick={handleAutoTag}
                disabled={isAutoTagging}
                className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all disabled:opacity-60 shadow-sm whitespace-nowrap"
              >
                <Sparkles size={14} className={isAutoTagging ? "animate-spin" : ""} />
                {isAutoTagging ? "Tagging..." : "Auto-Tag with AI"}
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-tag-bg text-tag-foreground rounded-md"
                  > 
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-foreground cursor-pointer transition-colors ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-5 mt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm cursor-pointer font-medium text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveSnippet}
            className="px-5 py-2 text-sm font-medium cursor-pointer bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            Save Snippet
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddSnippetModal;