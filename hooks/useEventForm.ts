'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useEventForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [agenda, setAgenda] = useState<string[]>(['']);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const value = tagInput.trim();
      if (!tags.includes(value)) setTags((prev) => [...prev, value]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const updateAgendaItem = (index: number, value: string) => {
    setAgenda((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addAgendaItem = () => setAgenda((prev) => [...prev, '']);

  const removeAgendaItem = (index: number) =>
    setAgenda((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError('Please upload an event image');
      return;
    }

    const cleanedAgenda = agenda.map((item) => item.trim()).filter(Boolean);
    if (cleanedAgenda.length === 0) {
      setError('Add at least one agenda item');
      return;
    }

    if (tags.length === 0) {
      setError('Add at least one tag');
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set('image', imageFile);
    formData.set('agenda', JSON.stringify(cleanedAgenda));
    formData.set('tags', JSON.stringify(tags));

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      // takes the user to a new page without a full browser reload
      router.push(`/events/${data.events.slug}`);
    } catch {
      setError('Network error — please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
