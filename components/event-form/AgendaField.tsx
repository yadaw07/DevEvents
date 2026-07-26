type Props = {
  agenda: string[];
  onUpdateItem: (index: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
};

const AgendaField = ({
  agenda,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: Props) => (
  <div className='field'>
    <label>Agenda</label>
    {agenda.map((item, index) => (
      <div className='agenda-item' key={index}>
        <input
          type='text'
          value={item}
          placeholder='e.g. 09:00 AM - Registration'
          onChange={(e) => onUpdateItem(index, e.target.value)}
        />
        {agenda.length > 1 && (
          <button type='button' onClick={() => onRemoveItem(index)}>
            ✕
          </button>
        )}
      </div>
    ))}
    <button type='button' className='add-agenda-btn' onClick={onAddItem}>
      + Add agenda item
    </button>
  </div>
);

export default AgendaField;
