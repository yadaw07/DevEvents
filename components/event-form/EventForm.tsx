'use client';

import { useEventForm } from '@/hooks/useEventForm';
import ImageUploadField from './ImageUploadField';
import TagsField from './TagsField';
import AgendaField from './AgendaField';

const EventForm = () => {
  const {
    imagePreview,
    fileInputRef,
    handleImageChange,
    removeImage,
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    agenda,
    updateAgendaItem,
    addAgendaItem,
    removeAgendaItem,
    isSubmitting,
    error,
    handleSubmit,
  } = useEventForm();

  return (
    <div id='create-event'>
      <div>
        <h1 className='text-4xl'>Create Event</h1>
        <p className='subheading text-left mt-3'>
          Fill in the details below to publish your event
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <ImageUploadField
          imagePreview={imagePreview}
          fileInputRef={fileInputRef}
          onChange={handleImageChange}
          onRemove={removeImage}
        />

        <div className='field'>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' type='text' required />
        </div>

        <div className='field'>
          <label htmlFor='description'>Description</label>
          <textarea id='description' name='description' rows={3} required />
        </div>

        <div className='field'>
          <label htmlFor='overview'>Overview</label>
          <textarea id='overview' name='overview' rows={4} required />
        </div>

        <div className='grid-2'>
          <div className='field'>
            <label htmlFor='venue'>Venue</label>
            <input id='venue' name='venue' type='text' required />
          </div>
          <div className='field'>
            <label htmlFor='location'>Location</label>
            <input id='location' name='location' type='text' required />
          </div>
        </div>

        <div className='grid-2'>
          <div className='field'>
            <label htmlFor='date'>Date</label>
            <input id='date' name='date' type='date' required />
          </div>
          <div className='field'>
            <label htmlFor='time'>Time</label>
            <input id='time' name='time' type='time' required />
          </div>
        </div>

        <div className='grid-2'>
          <div className='field'>
            <label htmlFor='mode'>Mode</label>
            <select id='mode' name='mode' required defaultValue=''>
              <option value='' disabled>
                Select mode
              </option>
              <option value='online'>Online</option>
              <option value='offline'>Offline</option>
              <option value='hybrid'>Hybrid</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='audience'>Audience</label>
            <input id='audience' name='audience' type='text' required />
          </div>
        </div>

        <div className='field'>
          <label htmlFor='organizer'>Organizer</label>
          <textarea id='organizer' name='organizer' rows={2} required />
        </div>

        <AgendaField
          agenda={agenda}
          onUpdateItem={updateAgendaItem}
          onAddItem={addAgendaItem}
          onRemoveItem={removeAgendaItem}
        />

        <TagsField
          tags={tags}
          tagInput={tagInput}
          onTagInputChange={setTagInput}
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />

        {error && <p className='error-text'>{error}</p>}

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
