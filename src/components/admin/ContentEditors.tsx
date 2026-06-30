'use client';

import type { SiteLink } from '@/data/homeContent';
import { FieldGroup, TextInput } from '@/components/admin/AdminFormHelpers';

export function ColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        value={value || '#f77420'}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0"
      />
      <TextInput value={value || ''} onChange={onChange} placeholder="#f77420" />
    </div>
  );
}

export function RemoveButton({ onClick, label = 'Remove' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl">
      {label}
    </button>
  );
}

export function CheckboxRow({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function LinkListEditor({
  title,
  items,
  onChange,
  withIcon = false,
  withColor = false,
  allowChildren = false,
}: {
  title: string;
  items: SiteLink[];
  onChange: (items: SiteLink[]) => void;
  withIcon?: boolean;
  withColor?: boolean;
  allowChildren?: boolean;
}) {
  const update = (index: number, item: SiteLink) => onChange(items.map((current, i) => (i === index ? item : current)));
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, { label: '', href: '', ...(withIcon ? { icon: '' } : {}), ...(withColor ? { color: '#f77420' } : {}) }]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-gray-900">{title}</h3>
        <button type="button" onClick={add} className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: '#f77420', color: '#f77420' }}>
          + Add Link
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between gap-3">
            <div className="font-bold text-sm text-gray-700">Link {index + 1}</div>
            <RemoveButton onClick={() => remove(index)} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <FieldGroup label="Label">
              <TextInput value={item.label || ''} onChange={(value) => update(index, { ...item, label: value })} />
            </FieldGroup>
            <FieldGroup label="URL">
              <TextInput value={item.href || ''} onChange={(value) => update(index, { ...item, href: value })} placeholder="/courses" />
            </FieldGroup>
            {withIcon && (
              <FieldGroup label="Icon">
                <TextInput value={item.icon || ''} onChange={(value) => update(index, { ...item, icon: value })} placeholder="home / 📚" />
              </FieldGroup>
            )}
            {withColor && (
              <FieldGroup label="Color">
                <ColorInput value={item.color || '#f77420'} onChange={(value) => update(index, { ...item, color: value })} />
              </FieldGroup>
            )}
          </div>
          {allowChildren && (
            <LinkListEditor
              title={`${item.label || `Link ${index + 1}`} Dropdown Links`}
              items={item.children || []}
              onChange={(children) => update(index, { ...item, children })}
            />
          )}
        </div>
      ))}
    </div>
  );
}
