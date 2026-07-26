type Props = {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
};

const TagsField = ({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: Props) => (
  <div className='field'>
    <label>Tags</label>
    <div className='tag-input'>
      {tags.map((tag) => (
        <span className='pill flex items-center' key={tag}>
          {tag}
          <span className='tag-remove' onClick={() => onRemoveTag(tag)}>
            ✕
          </span>
        </span>
      ))}
      <input
        type='text'
        value={tagInput}
        placeholder='Type a tag and press Enter'
        onChange={(e) => onTagInputChange(e.target.value)}
        onKeyDown={onAddTag}
      />
    </div>
  </div>
);

export default TagsField;
